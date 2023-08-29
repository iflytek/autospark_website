## 使用 SuperAGI 设置 Pinecone

1. 登录您在松果上的账户。如果您还没有账户，可以在这里创建一个账户。

2. 如果您是 Pinecone 的新用户，可按以下步骤创建索引。如果您已有一个索引，可跳至步骤 5。

   ![alt_text](https://superagi.com/docs/assets/images/pinecone1-ee9384aa4afc3a38271806e0d1fca61f.png)

3. 输入索引名称并添加 1536 个维度。对于知识嵌入，我们使用 OpenAI 的文本嵌入-ada-002 模型，该模型可创建 1536 个维度的嵌入。

   ![alt_text](https://superagi.com/docs/assets/images/pinecone2-58e3366e686b60b012464bef99fbacd3.png)

4. 创建索引后，点击右上角的设置图标，进入 SuperAGI 的矢量设置。

5. 在矢量数据库设置中，选择Pinecone。

   ![alt_text](https://superagi.com/docs/assets/images/pinecone3-53e2406f96f3a20698775e3732269c6e.png)

6. 要连接 Pinecone，请添加 API 密钥、环境和索引名称。

   ![alt_text](https://superagi.com/docs/assets/images/pinecone5-06257ac2c55328edd3a0dece6bcb48e9.png)

7. 进入 Pinecone 面板并单击索引以获取索引名称。

   ![alt_text](https://superagi.com/docs/assets/images/pinecone6-0d8e77b6dfbb1e6b36d26975b1cff6dd.png)

8. 进入 Pinecone 面板，点击 API keys 获取 API key 和环境。

   ![alt_text](https://superagi.com/docs/assets/images/pinecone7-37f8e920e1cb8a213f524df6a61dc7bc.png)

9. 在矢量数据库设置中添加这些内容，然后点击连接。这将连接你的 Pinecone 索引。

   ![alt_text](https://superagi.com/docs/assets/images/pinecone8-a9be62dc3244e4226daaafdd61427955.png)

   