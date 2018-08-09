const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo',async(ctx) => {
    fs.readFile('./data_json/newGoods.json','utf8',(err,data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        data.map((value,index) => {
            let newGoods = new Goods(value);
            newGoods.save().then(() => {
                saveCount ++;
            }).catch(err => {
                console.log('失败:' + err)
            })
        })
    })
    ctx.body= '开始导入数据'
})
module.exports = router;