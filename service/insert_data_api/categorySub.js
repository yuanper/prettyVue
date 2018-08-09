const Router = require('koa-router')
const router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllCategorySub',async(ctx) => {
    fs.readFile('./data_json/category_sub.json','utf8',(err,data) => {
        data = JSON.parse(data);
        if(err) return console.log(err);
        let saveCount = 0;
        const categorySub = mongoose.model('CategorySub');
        data.RECORDS.map((value,index) => {
            let newCategorySub = new categorySub(value);
            newCategorySub.save().then(() => {
                saveCount ++;
                console.log('成功插入' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })
    })
    ctx.body = "开始导入数据"
})
module.exports = router