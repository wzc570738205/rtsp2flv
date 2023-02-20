const express = require('express')
const fs = require('fs')
const path = require('path');
console.log('path: ', path);
console.log('fs: ', fs)
const expressWebSocket = require('express-ws')
const ffmpeg = require('fluent-ffmpeg')
///判断当前系统
const os = require('os')
const platform = os.platform()
console.log('platform: ', platform)
console.log('process.cwd()', process.cwd())
const pp =  path.normalize(process.cwd() + '/bin/' + platform + '/ffmpeg')
console.log('pp: ', pp);
fs.chmod(pp, '777', function () {})
ffmpeg.setFfmpegPath(pp)

const webSocketStream = require('websocket-stream/stream')
function localServer() {
  let app = express()
  app.use(express.static(__dirname))
  expressWebSocket(app, null, {
    perMessageDeflate: true,
  })
  app.ws('/rtsp/:id/', rtspRequestHandle)
  app.listen(8888)
  console.log('express listened')
}
function rtspRequestHandle(ws, req) {
  console.log('rtsp request handle')

  let url = req.query.url
  console.log(Buffer.from(url, 'base64').toString())
  const stream = webSocketStream(
    ws,
    {
      binary: true,
      browserBufferTimeout: 1000000,
    },
    {
      browserBufferTimeout: 1000000,
    }
  )

  try {
    ffmpeg(Buffer.from(url, 'base64').toString())
      .addInputOption('-rtsp_transport', 'tcp', '-buffer_size', '102400') // 这里可以添加一些 RTSP 优化的参数
      .on('start', function () {
        console.log(Buffer.from(url, 'base64').toString(), 'Stream started.')
      })
      .on('codecData', function () {
        console.log(Buffer.from(url, 'base64').toString(), 'Stream codecData.')
        // 摄像机在线处理
      })
      .on('error', function (err) {
        console.log(Buffer.from(url, 'base64').toString(), 'An error occured: ', err)
      })
      .on('end', function () {
        console.log(Buffer.from(url, 'base64').toString(), 'Stream end!')
        // 摄像机断线的处理
      })
      .outputFormat('flv')
      .videoCodec('copy')
      .noAudio()
      .pipe(stream, { end: true })
  } catch (error) {
    console.log(error)
  }
}
localServer()
