const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const {connect,initSchema}  = require('./database/init.js')
let user = require('./api/user.js')
let goods = require('./api/goods.js')
let address = require('./api/address.js')
let category = require('./insert_data_api/category.js')
let categorysub = require('./insert_data_api/categorySub.js')

let router = new Router()
//加载子路由
router.use('/user', user.routes())
router.use('/goods', goods.routes())
router.use('/address', address.routes())
router.use('/category', category.routes())
router.use('/categorysub', categorysub.routes())

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