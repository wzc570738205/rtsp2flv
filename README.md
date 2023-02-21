## RTSP转FLV流服务

本项目提供了一个`rtsp`转`flv`流的服务，可以将`rtsp`流转换为`flv`流。如果不需要定制开发，可以直接使用`dist`文件夹下的可执行文件。使用见`部署章节`
注意：rtsp流地址需要进行base64编码，
访问url格式：`ws://localhost:8888/rtsp/<id>/?url=btoa(<rtsp 地址>)`
- id: 用于区分不同的rtsp流，可以是任意字符串，如没有可以默认写死为`1`
- rtsp 地址: rtsp流地址。格式为`rtsp://username:password@ip:port/xxx`。
### 安装依赖
```
npm install
```

### 运行
```
npm run dev
```
### 使用
前端使用通过`ws`协议连接后端，后端通过`ffmpeg`将`rtsp`流转换为`flv`流，前端通过`flv.js`播放`flv`流。

node端启动后，会监听`8888`端口，

前端访问的地址为：：
```js
//比如rtsp流的地址为:`rtsp://admin:19x.xxx`

ws://localhost:8888/rtsp/1/?url=btoa('rtsp://admin:19x.xxx')
```
具体DEMO见`front`文件夹

### 打包
```
npm run build
```
打包后会生成`index-win.exe`、`index-macos`、`index-linux`三个平台的可执行文件，部署的时候需要将这3个文件同`bin`文件夹一同带过去。最终的目录为：
```
│-------------
│   ├── bin
│   ├── index-linux
│   ├── index-macos
│   └── index-win.exe
```
### 部署

### linux
推荐使用`nohup`命令，这样即使关闭了ssh连接，程序也不会停止。
```
nohup ./index-linux &
```
### windows
使用[nssm](https://nssm.cc/usage)将程序注册为windows服务，这样即使关闭了ssh连接，程序也不会停止。
```bash
# 注册服务
nssm.exe install  FfmpegServer  "D:\ffmpeg-server\index-win.exe"

# 启动服务
nssm.exe start FfmpegServer
```

#### QQ交流群

![WX20210922-091703.png](https://cdn.wangzc.wang/uPic/WX20210922-09170315%20.png)

