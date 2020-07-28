 * bin 参数，专门放置用户的自定义命令，指定可执行文件的位置，bin 里的命令是可执行命令，模块安装的时候如果是全局安装，则 npm 会为 bin 中配置的文件创建一个全局软连接，在命令行工具里可以直接执行。

# 命令
## init

### 步骤
 1. init：
 进行获取脚手架版本信息等相关操作

 2. prompting：
 与用户进行交互 获取项目配置信息

 3. writing：
 生成基础模板

4. customizing：
 根据用户的配置，修改和新增对应模板文件
 * webpack config
    * 是否可配置

 * 组件库选择
    * 远程拉取组件库

 * 通用服务的选择
    * Friday
    * fe-monitor
    * 配置中心
    
 4. npmInstalling：
 进行依赖的安装

 ## dev

 ## build

