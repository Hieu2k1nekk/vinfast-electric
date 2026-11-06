// Tệp khởi động ứng dụng (Application startup file) cho hosting Node.js như cPanel.
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS để chạy được trên mọi hosting Node.js */
// Chạy `npm run build` trước, sau đó hosting gọi `node server.js`.
const { createServer } = require("http")
const next = require("next")

const port = parseInt(process.env.PORT || "3000", 10)
const app = next({ dev: false, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Server listening on port ${port}`)
  })
})
