const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const {connect,initSchema}  = require('./database/init.js')
let user = require('./api/user.js')

let router = new Router()
//加载子路由
router.use('/user',user.routes())

;(async () => {
    await connect()
    initSchema()
})()
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())

app.listen(3000,() => {
    console.log('server is starting listening at port 3000')
})