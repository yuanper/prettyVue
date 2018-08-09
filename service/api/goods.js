const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.post('/getDetailGoodsInfo',async(ctx) => {
    let goodsId  = ctx.request.query.goodsId;
    const Goods = mongoose.model('Goods');
    await Goods.findOne({ID:goodsId}).exec()
    .then(async(result) => {
        ctx.body = {
            code:200,
            data: result
        }
    })
    .catch((err) => {
        console.log(err);
        ctx.body = {
            code: 500,
            data: err
        }
    })
})
//大类别商品
router.get('/getCategoryList',async(ctx) => {
    try {
            const Category = mongoose.model('Category');
            let result = await Category.find().exec()
            ctx.body = {
                code: 200,
                data: result
            }
    } catch (error) {
        ctx.body = {
            code: 500,
            data: error
        }
    }
})
//小类别商品获取
router.post('/getCategorySubList',async( ctx) => {
    try {
        let categoryId =  ctx.request.query.categoryId;
        const CategorySub = mongoose.model('CategorySub');
        let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId}).exec();
        ctx.body = {
            code: 200,
            data: result
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            data: error
        }
    }
})
//根据商品的类别获取商品列表
router.post('/getGoodsListByCategorySubId',async(ctx) => {
    try {
        let categorySubId = ctx.request.query.categorySubId;
        let page = ctx.request.query.page;
        let num = 10;//每页的数量
        let start = (page -1) * num
        const Goods = mongoose.model('Goods');
        let result = await Goods.find({ SUB_ID:categorySubId}).skip(start).limit(num).exec();
        ctx.body = {
            code: 200,
            data: result
        }
    } catch (error) {
        ctx.body = {
            code:500,
            data: error
        }
    }
})
//获取推荐商品列表
router.get('/getRecGoodsList',async(ctx ) => {
    try {
        let num = 4;
        let start = Math.random() * 20;
        const Goods = mongoose.model('Goods');
        let result = await Goods.find({}).skip(start).limit(num).exec();
        ctx.body = {
            code: 200,
            data: result
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            data: error
        }
    }
})
module.exports = router