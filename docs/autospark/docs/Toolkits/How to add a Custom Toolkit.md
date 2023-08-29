只需几个简单的步骤，您就可以开始在 SuperAGI 中构建和添加自己的自定义工具包：

第 1 步：设置 GitHub 仓库。

首先，您需要一个存储和管理工具代码的地方。为此，您可以使用 GitHub。创建一个新仓库，并确保其中包含以下文件：

```python
__init__.py: This file is crucial as it helps Python recognize your repository as a package. It’s usually an empty file.
tool1.py: This is where the code for your first tool should go.
tool2.py: If you have a second tool, this is where its code should reside.
toolname_toolkit.py : This file will have the toolkit name, and description, followed by all tools and config details of that toolkit.
requirements.txt: This file lists all the dependencies needed for your tool to run smoothly.
```

您的版本库结构应该是这样的:

```bash
Your-Repository-Name 
├── __init__.py 
├── tool1.py 
├── tool2.py 
├── toolname_toolkit.py
└── requirements.txt
```

您可以在此处找到一个示例软件包，以了解自定义工具的构建： https://github.com/luciferlinx101/GreetingTool

第 2 步：使用以下 pip 命令 (https://pypi.org/project/superagi-tools/) 获取所需的 API 和 BaseTool 相关类，轻松将工具与 SuperAGI 集成。在终端或命令提示符下运行以下命令：

```python
pip install superagi-tools
```

这将安装必要的 SuperAGI 基本工具和工具包类。

第 3 步：使用 "Docker compose up "启动 SuperAGI 将 GitHub 仓库链接到 SuperAGI。接下来，您需要将 GitHub 仓库链接添加到 SuperAGI 的前端。这样，SuperAGI 就能知道在哪里找到您的工具。添加 GitHub 链接后，该链接将存储在数据库中。此外，请确保为您的工具包提供一个名称，用于在 SuperAGI 平台上识别它。GitHub 链接和工具包名称存储在名为 tools.json 的文件中，如下所示：

```bash
{ "toolkit-name": "your-github-link" }
```

第 4 步：添加 GitHub 链接后，SuperAGI 工具管理器将负责安装您的工具及其依赖项。它将被放置在名为 superagi/tools 的目录中。

第 5 步：添加完成后，重启 docker。现在，工具已经安装完毕，是时候构建并运行它了。运行以下命令

```bash
docker compose down
docker compose up --build
```

这条命令会重启你的 docker，再次编译并运行它。

在 Docker 运行期间，将安装工具的依赖项（在 requirements.txt 中指定）。这将由一个名为 install-tool-dependency.sh 的脚本在启动时自动完成。它会自动为工具安装所有必要的依赖项。现在，您就可以在本地图形用户界面上使用工具包了。