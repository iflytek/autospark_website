# 零基础掌握AI能力的上线

## 我们采用huggingface中的[语义识别模型](https://huggingface.co/ClueAI/PromptCLUE-base-v1-5)来举个例子

- [ ] 起一个容器`（从镜像iflyopensource/aiges-gpu:11.2-1.17-3.9.13-ubun`
  `tu1804-v3.4.4）`，通过huggingface上的clone规则去clone模型到该容器，命令如下

  ```bash
  apt install git-lfs
  git lfs install
  git clone https://huggingface.co/ClueAI/PromptCLUE-base-v1-5
  ```

  

- [ ] 创建测试文件，官网给了实例，可以通过touch test.txt放入test_data文件夹中，推理要用

- [ ] 编写wrapper.py接口文件，解释如下

  ```python
  import json
  import os.path
  from PIL import Image
  import torch
  import requests
  from aiges.core.types import *
  
  try:
      from aiges_embed import ResponseData, Response, DataListNode, DataListCls,SessionCreateResponse # c++
  except:
      from aiges.dto import Response, ResponseData, DataListNode, DataListCls,SessionCreateResponse
  
  from aiges.sdk import WrapperBase, \
      ImageBodyField, \
      StringBodyField,StringParamField
  from aiges.utils.log import log, getFileLogger
  
  # 导入inference.py中的依赖包
  import io
  
  import torch
  import torch.nn as nn
  import torch.nn.functional as F
  from PIL import Image
  from torchvision import transforms
  from transformers import T5Tokenizer, T5ForConditionalGeneration
  import random
  
  # 定义模型的超参数和输入参数
  class UserRequest(object):
      input1 = ImageBodyField(key="demo_txt", path="test_data/test.txt")
      # ctrl = StringParamField(key="ctrl", value="helloworld")
  
  
  # 定义模型的输出参数
  class UserResponse(object):
      accept1 = StringBodyField(key="result")
  
  # 定义服务推理逻辑
  class Wrapper(WrapperBase):
      serviceId = "audio_recon"
      version = "v1"
      call_type = 1
      requestCls = UserRequest()
      responseCls = UserResponse()
      model = None
      
      def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.transform = None
          self.device = None
          self.filelogger = None
          self.sample = False
  
      def wrapperInit(self, config: {}) -> int:
          log.info("Initializing ...")
          self.device = torch.device("cpu")
          self.filelogger = getFileLogger()
          self.top_p = 0.8
          self.tokenizer = T5Tokenizer.from_pretrained("PromptCLUE-base-v1-5")
          self.model = T5ForConditionalGeneration.from_pretrained("PromptCLUE-base-v1-5")
          return 0
  
      def wrapperOnceExec(self, params: {}, reqData: DataListCls, usrTag: str = "") -> Response:
          # 读取测试数据并进行模型推理
          self.filelogger.info("got reqdata , %s" % reqData.list)
          text = reqData.get("demo_txt").data
          text = text.decode('utf-8')
          text = text.replace("\n", "_")
          encoding = self.tokenizer(text=[text], truncation=True, padding=True, max_length=768, return_tensors="pt").to(self.device) 
  
          out = self.model.generate(**encoding, return_dict_in_generate=True, output_scores=False, max_length=64, do_sample=True, top_p=self.top_p)
          out_text = self.tokenizer.batch_decode(out["sequences"], skip_special_tokens=True)
          result = out_text[0].replace("_", "\n")
          log.info("##result ###:%s" % str(result))
          retC = {
              "result": str(result),
              "msg": "result is: %s" % str(result)
          }
          # 使用Response封装result
          res = Response()
          resd = ResponseData()
          resd.key = "result"
          resd.setDataType(DataText)
          resd.status = Once
          resd.setData(json.dumps(retC).encode("utf-8"))
          res.list = [resd]
          return res
  
      def wrapperFini(cls) -> int:
          return 0
  
      def wrapperError(cls, ret: int) -> str:
          if ret == 100:
              return "user error defined here"
          return ""
      def wrapperCreate(cls, params: {}, sid: str) -> SessionCreateResponse:
          print(params)
          i = random.randint(1,30000)
          print(sid)
          return f"hd-test-{i}"
      '''
          此函数保留测试用，不可删除
      '''
  
      def wrapperTestFunc(cls, data: [], respData: []):
          pass
  
  
  if __name__ == '__main__':
      m = Wrapper(legacy=False)
      m.run()
      # print(m.schema())
  ```

  

- [ ] 安装环境依赖，该模型有如下依赖

  ```bash
  torch
  torchvision
  torchaudio
  aiges
  transformers
  SentencePiece
  ```

- [ ] 自此，所有依赖都已安装，运行`python wrapper.py`出现理想的推理结果，下图是文件存放方式，确保黄色方框的的文件顺序，然后我们需要去**通过tar命令进入wrapper文件夹压缩所有文件**，得到wrapper.tar.gz，这个文件也就是在ASE上需要上传到S3上的压缩包。

  ![image-20230804160747683](C:\Users\zqwu21\AppData\Roaming\Typora\typora-user-images\image-20230804160747683.png)

- [ ] 进入ASE平台，创建能力

  1. 创建AI能力

     - 填写基本信息
     - 接口定义：
       - 选择自定义协议，接口类型按需选择，这里选择非流式
       - 功能参数按需选择，这里没有设置
       - 请求数据这块，数据类型是文本（切记修改format格式为plain），根据自己需求设置
       - 响应数据这块，数据类型是文本（切记修改format格式为plain），按需设置
     - 创建成功，跳到版本管理

  2. 版本管理（新建版本）

     - 创建版本提示（全选）
     - 基本信息填写
       - 能力版本必须是x.x.x格式
       - 版本创建方式：平台创建，其他的按需设置

     - 接口定义：主要是检查一下AI能力设置的接口信息是否正确，需设置服务别名（**必须是英文**）

     - 测试用例：

       - 自定义测试用例，点击添加自定义用例按钮，按需设置名称等，最重要的是请求数据的设置是wrapper文件中的test.txt，将其上传上去。

     - 资源上传如图所示设置

       - 首先需要下载s3cmd，然后配置key和密钥等，**[这在上传说明都有写](https://in.iflyaicloud.com/aipaas-doc/docs/02-%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/09-%E8%A7%A3%E7%A0%81%E5%99%A8&%E6%A8%A1%E5%9E%8B%E4%B8%8A%E4%BC%A0.html)**。下面是配置的修改

         ```bash
         [default]
         access_key =    在服务器资源，密钥管理可以查看 
         secret_key = 	在服务器资源，密钥管理可以查看
         host_base = oss.xfyun.cn
         host_bucket = %(bucket)oss.xfyun.cn
         use_https = False
         ```

       - 列举所有的Buckets

         ```bash
          s3cmd ls --signature-v2
         ```

       - 上传引擎资源和模型到某个 bucket，命令格式如下

         ```bash
         s3cmd put wrapper.tar.gz s3://my-bucket-name/wrapper.tar.gz --signature-v2
         ```

       - MD5校验

         ```bash
         md5sum wrapper.tar.gz 
         ```

       - 至此，wrapper.tar.gz已经上传到s3云存储上了，能力部署已经完成2/3。

     - 资源上传（如图填写即可）

       ![资源上传](C:\Users\zqwu21\Pictures\ase\资源上传.png)

     - 部署规格，按需设置，参考如图

       ![部署规格](C:\Users\zqwu21\Pictures\ase\部署规格.png)

     - 相关配置，按需设置，如果需要输出日志，设置下配置参数，如图所示

       ![相关配置](C:\Users\zqwu21\Pictures\ase\相关配置.png)

     - 完成，提交验证即可。到这真个AI能力算是部署成功了在ASE上。