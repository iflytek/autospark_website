1. 打开 **autoSpark GitHub** 代码库
2.  **https://github.com/iflytek/autospark_website**，然后单击 "代码" > "代码空间" > "创建新代码空间"。
3. 导航至该目录，创建 **config_template.yaml** 的副本，并将其命名为 config.yaml。
4. 打开代码空间底部的终端，运行以下命令：**docker compose up --build**，等待构建完成。
5. 转到 "端口 "选项卡，复制 8001 和 3000 公共地址。用 8001 公共地址替换 **docker-compose.yaml** 文件中的 **localhost** 链接，并将 3000 公共地址以字符串形式粘贴到 **main.py** 文件中。
6. 确保在这两个地方都去掉 URL 末尾的正斜杠。
7. 再次运行 **docker compose up --build** 命令。
8. 构建完成后，将两个端口的可见性都改为 public，并在新标签页中打开 3000 public URL。