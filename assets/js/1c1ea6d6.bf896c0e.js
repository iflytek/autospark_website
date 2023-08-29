"use strict";(self.webpackChunkautospark_website=self.webpackChunkautospark_website||[]).push([[7739],{5456:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/0-1AI_power","metadata":{"permalink":"/autospark_website/blog/0-1AI_power","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/0-1AI_power.md","source":"@site/blog/0-1AI_power.md","title":"\u96f6\u57fa\u7840\u638c\u63e1AI\u80fd\u529b\u7684\u4e0a\u7ebf","description":"\u6211\u4eec\u91c7\u7528huggingface\u4e2d\u7684\u8bed\u4e49\u8bc6\u522b\u6a21\u578b\u6765\u4e3e\u4e2a\u4f8b\u5b50","date":"2023-08-29T02:55:53.000Z","formattedDate":"2023\u5e748\u670829\u65e5","tags":[],"readingTime":5.675,"hasTruncateMarker":false,"authors":[],"frontMatter":{},"nextItem":{"title":"Welcome","permalink":"/autospark_website/blog/welcome"}},"content":"## \u6211\u4eec\u91c7\u7528huggingface\u4e2d\u7684[\u8bed\u4e49\u8bc6\u522b\u6a21\u578b](https://huggingface.co/ClueAI/PromptCLUE-base-v1-5)\u6765\u4e3e\u4e2a\u4f8b\u5b50\\n\\n- [ ] \u8d77\u4e00\u4e2a\u5bb9\u5668`\uff08\u4ece\u955c\u50cfiflyopensource/aiges-gpu:11.2-1.17-3.9.13-ubun`\\n  `tu1804-v3.4.4\uff09`\uff0c\u901a\u8fc7huggingface\u4e0a\u7684clone\u89c4\u5219\u53bbclone\u6a21\u578b\u5230\u8be5\u5bb9\u5668\uff0c\u547d\u4ee4\u5982\u4e0b\\n\\n  ```bash\\n  apt install git-lfs\\n  git lfs install\\n  git clone https://huggingface.co/ClueAI/PromptCLUE-base-v1-5\\n  ```\\n\\n  \\n\\n- [ ] \u521b\u5efa\u6d4b\u8bd5\u6587\u4ef6\uff0c\u5b98\u7f51\u7ed9\u4e86\u5b9e\u4f8b\uff0c\u53ef\u4ee5\u901a\u8fc7touch test.txt\u653e\u5165test_data\u6587\u4ef6\u5939\u4e2d\uff0c\u63a8\u7406\u8981\u7528\\n\\n- [ ] \u7f16\u5199wrapper.py\u63a5\u53e3\u6587\u4ef6\uff0c\u89e3\u91ca\u5982\u4e0b\\n\\n  ```python\\n  import json\\n  import os.path\\n  from PIL import Image\\n  import torch\\n  import requests\\n  from aiges.core.types import *\\n  \\n  try:\\n      from aiges_embed import ResponseData, Response, DataListNode, DataListCls,SessionCreateResponse # c++\\n  except:\\n      from aiges.dto import Response, ResponseData, DataListNode, DataListCls,SessionCreateResponse\\n  \\n  from aiges.sdk import WrapperBase, \\\\\\n      ImageBodyField, \\\\\\n      StringBodyField,StringParamField\\n  from aiges.utils.log import log, getFileLogger\\n  \\n  # \u5bfc\u5165inference.py\u4e2d\u7684\u4f9d\u8d56\u5305\\n  import io\\n  \\n  import torch\\n  import torch.nn as nn\\n  import torch.nn.functional as F\\n  from PIL import Image\\n  from torchvision import transforms\\n  from transformers import T5Tokenizer, T5ForConditionalGeneration\\n  import random\\n  \\n  # \u5b9a\u4e49\u6a21\u578b\u7684\u8d85\u53c2\u6570\u548c\u8f93\u5165\u53c2\u6570\\n  class UserRequest(object):\\n      input1 = ImageBodyField(key=\\"demo_txt\\", path=\\"test_data/test.txt\\")\\n      # ctrl = StringParamField(key=\\"ctrl\\", value=\\"helloworld\\")\\n  \\n  \\n  # \u5b9a\u4e49\u6a21\u578b\u7684\u8f93\u51fa\u53c2\u6570\\n  class UserResponse(object):\\n      accept1 = StringBodyField(key=\\"result\\")\\n  \\n  # \u5b9a\u4e49\u670d\u52a1\u63a8\u7406\u903b\u8f91\\n  class Wrapper(WrapperBase):\\n      serviceId = \\"audio_recon\\"\\n      version = \\"v1\\"\\n      call_type = 1\\n      requestCls = UserRequest()\\n      responseCls = UserResponse()\\n      model = None\\n      \\n      def __init__(self, *args, **kwargs):\\n          super().__init__(*args, **kwargs)\\n          self.transform = None\\n          self.device = None\\n          self.filelogger = None\\n          self.sample = False\\n  \\n      def wrapperInit(self, config: {}) -> int:\\n          log.info(\\"Initializing ...\\")\\n          self.device = torch.device(\\"cpu\\")\\n          self.filelogger = getFileLogger()\\n          self.top_p = 0.8\\n          self.tokenizer = T5Tokenizer.from_pretrained(\\"PromptCLUE-base-v1-5\\")\\n          self.model = T5ForConditionalGeneration.from_pretrained(\\"PromptCLUE-base-v1-5\\")\\n          return 0\\n  \\n      def wrapperOnceExec(self, params: {}, reqData: DataListCls, usrTag: str = \\"\\") -> Response:\\n          # \u8bfb\u53d6\u6d4b\u8bd5\u6570\u636e\u5e76\u8fdb\u884c\u6a21\u578b\u63a8\u7406\\n          self.filelogger.info(\\"got reqdata , %s\\" % reqData.list)\\n          text = reqData.get(\\"demo_txt\\").data\\n          text = text.decode(\'utf-8\')\\n          text = text.replace(\\"\\\\n\\", \\"_\\")\\n          encoding = self.tokenizer(text=[text], truncation=True, padding=True, max_length=768, return_tensors=\\"pt\\").to(self.device) \\n  \\n          out = self.model.generate(**encoding, return_dict_in_generate=True, output_scores=False, max_length=64, do_sample=True, top_p=self.top_p)\\n          out_text = self.tokenizer.batch_decode(out[\\"sequences\\"], skip_special_tokens=True)\\n          result = out_text[0].replace(\\"_\\", \\"\\\\n\\")\\n          log.info(\\"##result ###:%s\\" % str(result))\\n          retC = {\\n              \\"result\\": str(result),\\n              \\"msg\\": \\"result is: %s\\" % str(result)\\n          }\\n          # \u4f7f\u7528Response\u5c01\u88c5result\\n          res = Response()\\n          resd = ResponseData()\\n          resd.key = \\"result\\"\\n          resd.setDataType(DataText)\\n          resd.status = Once\\n          resd.setData(json.dumps(retC).encode(\\"utf-8\\"))\\n          res.list = [resd]\\n          return res\\n  \\n      def wrapperFini(cls) -> int:\\n          return 0\\n  \\n      def wrapperError(cls, ret: int) -> str:\\n          if ret == 100:\\n              return \\"user error defined here\\"\\n          return \\"\\"\\n      def wrapperCreate(cls, params: {}, sid: str) -> SessionCreateResponse:\\n          print(params)\\n          i = random.randint(1,30000)\\n          print(sid)\\n          return f\\"hd-test-{i}\\"\\n      \'\'\'\\n          \u6b64\u51fd\u6570\u4fdd\u7559\u6d4b\u8bd5\u7528\uff0c\u4e0d\u53ef\u5220\u9664\\n      \'\'\'\\n  \\n      def wrapperTestFunc(cls, data: [], respData: []):\\n          pass\\n  \\n  \\n  if __name__ == \'__main__\':\\n      m = Wrapper(legacy=False)\\n      m.run()\\n      # print(m.schema())\\n  ```\\n\\n  \\n\\n- [ ] \u5b89\u88c5\u73af\u5883\u4f9d\u8d56\uff0c\u8be5\u6a21\u578b\u6709\u5982\u4e0b\u4f9d\u8d56\\n\\n  ```bash\\n  torch\\n  torchvision\\n  torchaudio\\n  aiges\\n  transformers\\n  SentencePiece\\n  ```\\n\\n- [ ] \u81ea\u6b64\uff0c\u6240\u6709\u4f9d\u8d56\u90fd\u5df2\u5b89\u88c5\uff0c\u8fd0\u884c`python wrapper.py`\u51fa\u73b0\u7406\u60f3\u7684\u63a8\u7406\u7ed3\u679c\uff0c\u4e0b\u56fe\u662f\u6587\u4ef6\u5b58\u653e\u65b9\u5f0f\uff0c\u786e\u4fdd\u9ec4\u8272\u65b9\u6846\u7684\u7684\u6587\u4ef6\u987a\u5e8f\uff0c\u7136\u540e\u6211\u4eec\u9700\u8981\u53bb**\u901a\u8fc7tar\u547d\u4ee4\u8fdb\u5165wrapper\u6587\u4ef6\u5939\u538b\u7f29\u6240\u6709\u6587\u4ef6**\uff0c\u5f97\u5230wrapper.tar.gz\uff0c\u8fd9\u4e2a\u6587\u4ef6\u4e5f\u5c31\u662f\u5728ASE\u4e0a\u9700\u8981\u4e0a\u4f20\u5230S3\u4e0a\u7684\u538b\u7f29\u5305\u3002\\n\\n  ![image-20230804160747683](C:\\\\Users\\\\zqwu21\\\\AppData\\\\Roaming\\\\Typora\\\\typora-user-images\\\\image-20230804160747683.png)\\n\\n- [ ] \u8fdb\u5165ASE\u5e73\u53f0\uff0c\u521b\u5efa\u80fd\u529b\\n\\n  1. \u521b\u5efaAI\u80fd\u529b\\n\\n     - \u586b\u5199\u57fa\u672c\u4fe1\u606f\\n     - \u63a5\u53e3\u5b9a\u4e49\uff1a\\n       - \u9009\u62e9\u81ea\u5b9a\u4e49\u534f\u8bae\uff0c\u63a5\u53e3\u7c7b\u578b\u6309\u9700\u9009\u62e9\uff0c\u8fd9\u91cc\u9009\u62e9\u975e\u6d41\u5f0f\\n       - \u529f\u80fd\u53c2\u6570\u6309\u9700\u9009\u62e9\uff0c\u8fd9\u91cc\u6ca1\u6709\u8bbe\u7f6e\\n       - \u8bf7\u6c42\u6570\u636e\u8fd9\u5757\uff0c\u6570\u636e\u7c7b\u578b\u662f\u6587\u672c\uff08\u5207\u8bb0\u4fee\u6539format\u683c\u5f0f\u4e3aplain\uff09\uff0c\u6839\u636e\u81ea\u5df1\u9700\u6c42\u8bbe\u7f6e\\n       - \u54cd\u5e94\u6570\u636e\u8fd9\u5757\uff0c\u6570\u636e\u7c7b\u578b\u662f\u6587\u672c\uff08\u5207\u8bb0\u4fee\u6539format\u683c\u5f0f\u4e3aplain\uff09\uff0c\u6309\u9700\u8bbe\u7f6e\\n     - \u521b\u5efa\u6210\u529f\uff0c\u8df3\u5230\u7248\u672c\u7ba1\u7406\\n\\n  2. \u7248\u672c\u7ba1\u7406\uff08\u65b0\u5efa\u7248\u672c\uff09\\n\\n     - \u521b\u5efa\u7248\u672c\u63d0\u793a\uff08\u5168\u9009\uff09\\n     - \u57fa\u672c\u4fe1\u606f\u586b\u5199\\n       - \u80fd\u529b\u7248\u672c\u5fc5\u987b\u662fx.x.x\u683c\u5f0f\\n       - \u7248\u672c\u521b\u5efa\u65b9\u5f0f\uff1a\u5e73\u53f0\u521b\u5efa\uff0c\u5176\u4ed6\u7684\u6309\u9700\u8bbe\u7f6e\\n\\n     - \u63a5\u53e3\u5b9a\u4e49\uff1a\u4e3b\u8981\u662f\u68c0\u67e5\u4e00\u4e0bAI\u80fd\u529b\u8bbe\u7f6e\u7684\u63a5\u53e3\u4fe1\u606f\u662f\u5426\u6b63\u786e\uff0c\u9700\u8bbe\u7f6e\u670d\u52a1\u522b\u540d\uff08**\u5fc5\u987b\u662f\u82f1\u6587**\uff09\\n\\n     - \u6d4b\u8bd5\u7528\u4f8b\uff1a\\n\\n       - \u81ea\u5b9a\u4e49\u6d4b\u8bd5\u7528\u4f8b\uff0c\u70b9\u51fb\u6dfb\u52a0\u81ea\u5b9a\u4e49\u7528\u4f8b\u6309\u94ae\uff0c\u6309\u9700\u8bbe\u7f6e\u540d\u79f0\u7b49\uff0c\u6700\u91cd\u8981\u7684\u662f\u8bf7\u6c42\u6570\u636e\u7684\u8bbe\u7f6e\u662fwrapper\u6587\u4ef6\u4e2d\u7684test.txt\uff0c\u5c06\u5176\u4e0a\u4f20\u4e0a\u53bb\u3002\\n\\n     - \u8d44\u6e90\u4e0a\u4f20\u5982\u56fe\u6240\u793a\u8bbe\u7f6e\\n\\n       - \u9996\u5148\u9700\u8981\u4e0b\u8f7ds3cmd\uff0c\u7136\u540e\u914d\u7f6ekey\u548c\u5bc6\u94a5\u7b49\uff0c**[\u8fd9\u5728\u4e0a\u4f20\u8bf4\u660e\u90fd\u6709\u5199](https://in.iflyaicloud.com/aipaas-doc/docs/02-%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/09-%E8%A7%A3%E7%A0%81%E5%99%A8&%E6%A8%A1%E5%9E%8B%E4%B8%8A%E4%BC%A0.html)**\u3002\u4e0b\u9762\u662f\u914d\u7f6e\u7684\u4fee\u6539\\n\\n         ```bash\\n         [default]\\n         access_key =    \u5728\u670d\u52a1\u5668\u8d44\u6e90\uff0c\u5bc6\u94a5\u7ba1\u7406\u53ef\u4ee5\u67e5\u770b \\n         secret_key = \\t\u5728\u670d\u52a1\u5668\u8d44\u6e90\uff0c\u5bc6\u94a5\u7ba1\u7406\u53ef\u4ee5\u67e5\u770b\\n         host_base = oss.xfyun.cn\\n         host_bucket = %(bucket)oss.xfyun.cn\\n         use_https = False\\n         ```\\n\\n       - \u5217\u4e3e\u6240\u6709\u7684Buckets\\n\\n         ```bash\\n          s3cmd ls --signature-v2\\n         ```\\n\\n       - \u4e0a\u4f20\u5f15\u64ce\u8d44\u6e90\u548c\u6a21\u578b\u5230\u67d0\u4e2a bucket\uff0c\u547d\u4ee4\u683c\u5f0f\u5982\u4e0b\\n\\n         ```bash\\n         s3cmd put wrapper.tar.gz s3://my-bucket-name/wrapper.tar.gz --signature-v2\\n         ```\\n\\n       - MD5\u6821\u9a8c\\n\\n         ```bash\\n         md5sum wrapper.tar.gz \\n         ```\\n\\n       - \u81f3\u6b64\uff0cwrapper.tar.gz\u5df2\u7ecf\u4e0a\u4f20\u5230s3\u4e91\u5b58\u50a8\u4e0a\u4e86\uff0c\u80fd\u529b\u90e8\u7f72\u5df2\u7ecf\u5b8c\u62102/3\u3002\\n\\n     - \u8d44\u6e90\u4e0a\u4f20\uff08\u5982\u56fe\u586b\u5199\u5373\u53ef\uff09\\n\\n       ![\u8d44\u6e90\u4e0a\u4f20](C:\\\\Users\\\\zqwu21\\\\Pictures\\\\ase\\\\\u8d44\u6e90\u4e0a\u4f20.png)\\n\\n     - \u90e8\u7f72\u89c4\u683c\uff0c\u6309\u9700\u8bbe\u7f6e\uff0c\u53c2\u8003\u5982\u56fe\\n\\n       ![\u90e8\u7f72\u89c4\u683c](C:\\\\Users\\\\zqwu21\\\\Pictures\\\\ase\\\\\u90e8\u7f72\u89c4\u683c.png)\\n\\n     - \u76f8\u5173\u914d\u7f6e\uff0c\u6309\u9700\u8bbe\u7f6e\uff0c\u5982\u679c\u9700\u8981\u8f93\u51fa\u65e5\u5fd7\uff0c\u8bbe\u7f6e\u4e0b\u914d\u7f6e\u53c2\u6570\uff0c\u5982\u56fe\u6240\u793a\\n\\n       ![\u76f8\u5173\u914d\u7f6e](C:\\\\Users\\\\zqwu21\\\\Pictures\\\\ase\\\\\u76f8\u5173\u914d\u7f6e.png)\\n\\n     - \u5b8c\u6210\uff0c\u63d0\u4ea4\u9a8c\u8bc1\u5373\u53ef\u3002\u5230\u8fd9\u771f\u4e2aAI\u80fd\u529b\u7b97\u662f\u90e8\u7f72\u6210\u529f\u4e86\u5728ASE\u4e0a\u3002"},{"id":"welcome","metadata":{"permalink":"/autospark_website/blog/welcome","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-08-26-welcome/index.md","source":"@site/blog/2021-08-26-welcome/index.md","title":"Welcome","description":"Docusaurus blogging features are powered by the blog plugin.","date":"2021-08-26T00:00:00.000Z","formattedDate":"2021\u5e748\u670826\u65e5","tags":[{"label":"facebook","permalink":"/autospark_website/blog/tags/facebook"},{"label":"hello","permalink":"/autospark_website/blog/tags/hello"},{"label":"docusaurus","permalink":"/autospark_website/blog/tags/docusaurus"}],"readingTime":0.405,"hasTruncateMarker":false,"authors":[{"name":"S\xe9bastien Lorber","title":"Docusaurus maintainer","url":"https://sebastienlorber.com","imageURL":"https://github.com/slorber.png","key":"slorber"},{"name":"Yangshun Tay","title":"Front End Engineer @ Facebook","url":"https://github.com/yangshun","imageURL":"https://github.com/yangshun.png","key":"yangshun"}],"frontMatter":{"slug":"welcome","title":"Welcome","authors":["slorber","yangshun"],"tags":["facebook","hello","docusaurus"]},"prevItem":{"title":"\u96f6\u57fa\u7840\u638c\u63e1AI\u80fd\u529b\u7684\u4e0a\u7ebf","permalink":"/autospark_website/blog/0-1AI_power"},"nextItem":{"title":"MDX Blog Post","permalink":"/autospark_website/blog/mdx-blog-post"}},"content":"[Docusaurus blogging features](https://docusaurus.io/docs/blog) are powered by the [blog plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog).\\n\\nSimply add Markdown files (or folders) to the `blog` directory.\\n\\nRegular blog authors can be added to `authors.yml`.\\n\\nThe blog post date can be extracted from filenames, such as:\\n\\n- `2019-05-30-welcome.md`\\n- `2019-05-30-welcome/index.md`\\n\\nA blog post folder can be convenient to co-locate blog post images:\\n\\n![Docusaurus Plushie](./docusaurus-plushie-banner.jpeg)\\n\\nThe blog supports tags as well!\\n\\n**And if you don\'t want a blog**: just delete this directory, and use `blog: false` in your Docusaurus config."},{"id":"mdx-blog-post","metadata":{"permalink":"/autospark_website/blog/mdx-blog-post","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-08-01-mdx-blog-post.mdx","source":"@site/blog/2021-08-01-mdx-blog-post.mdx","title":"MDX Blog Post","description":"Blog posts support Docusaurus Markdown features, such as MDX.","date":"2021-08-01T00:00:00.000Z","formattedDate":"2021\u5e748\u67081\u65e5","tags":[{"label":"docusaurus","permalink":"/autospark_website/blog/tags/docusaurus"}],"readingTime":0.175,"hasTruncateMarker":false,"authors":[{"name":"S\xe9bastien Lorber","title":"Docusaurus maintainer","url":"https://sebastienlorber.com","imageURL":"https://github.com/slorber.png","key":"slorber"}],"frontMatter":{"slug":"mdx-blog-post","title":"MDX Blog Post","authors":["slorber"],"tags":["docusaurus"]},"prevItem":{"title":"Welcome","permalink":"/autospark_website/blog/welcome"},"nextItem":{"title":"Long Blog Post","permalink":"/autospark_website/blog/long-blog-post"}},"content":"Blog posts support [Docusaurus Markdown features](https://docusaurus.io/docs/markdown-features), such as [MDX](https://mdxjs.com/).\\n\\n:::tip\\n\\nUse the power of React to create interactive blog posts.\\n\\n```js\\n<button onClick={() => alert(\'button clicked!\')}>Click me!</button>\\n```\\n\\n<button onClick={() => alert(\'button clicked!\')}>Click me!</button>\\n\\n:::"},{"id":"long-blog-post","metadata":{"permalink":"/autospark_website/blog/long-blog-post","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2019-05-29-long-blog-post.md","source":"@site/blog/2019-05-29-long-blog-post.md","title":"Long Blog Post","description":"This is the summary of a very long blog post,","date":"2019-05-29T00:00:00.000Z","formattedDate":"2019\u5e745\u670829\u65e5","tags":[{"label":"hello","permalink":"/autospark_website/blog/tags/hello"},{"label":"docusaurus","permalink":"/autospark_website/blog/tags/docusaurus"}],"readingTime":2.05,"hasTruncateMarker":true,"authors":[{"name":"Endilie Yacop Sucipto","title":"Maintainer of Docusaurus","url":"https://github.com/endiliey","imageURL":"https://github.com/endiliey.png","key":"endi"}],"frontMatter":{"slug":"long-blog-post","title":"Long Blog Post","authors":"endi","tags":["hello","docusaurus"]},"prevItem":{"title":"MDX Blog Post","permalink":"/autospark_website/blog/mdx-blog-post"},"nextItem":{"title":"First Blog Post","permalink":"/autospark_website/blog/first-blog-post"}},"content":"This is the summary of a very long blog post,\\n\\nUse a `\x3c!--` `truncate` `--\x3e` comment to limit blog post size in the list view.\\n\\n\x3c!--truncate--\x3e\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet\\n\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"},{"id":"first-blog-post","metadata":{"permalink":"/autospark_website/blog/first-blog-post","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2019-05-28-first-blog-post.md","source":"@site/blog/2019-05-28-first-blog-post.md","title":"First Blog Post","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet","date":"2019-05-28T00:00:00.000Z","formattedDate":"2019\u5e745\u670828\u65e5","tags":[{"label":"hola","permalink":"/autospark_website/blog/tags/hola"},{"label":"docusaurus","permalink":"/autospark_website/blog/tags/docusaurus"}],"readingTime":0.12,"hasTruncateMarker":false,"authors":[{"name":"Gao Wei","title":"Docusaurus Core Team","url":"https://github.com/wgao19","image_url":"https://github.com/wgao19.png","imageURL":"https://github.com/wgao19.png"}],"frontMatter":{"slug":"first-blog-post","title":"First Blog Post","authors":{"name":"Gao Wei","title":"Docusaurus Core Team","url":"https://github.com/wgao19","image_url":"https://github.com/wgao19.png","imageURL":"https://github.com/wgao19.png"},"tags":["hola","docusaurus"]},"prevItem":{"title":"Long Blog Post","permalink":"/autospark_website/blog/long-blog-post"}},"content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet"}]}')}}]);