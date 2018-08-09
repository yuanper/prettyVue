const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.post('/newAddressInfo',async(ctx) => {
    try {
        let data = ctx.request.query;
        const Address = mongoose.model('Address');
        let result = await Address.create(data);
        ctx.body = {
            code: 200,
            data: '插入成功'
        }
    } catch (error) {   
        ctx.body = {
            code: 500,
            data: error
        }
    }
})

router.get('/getAddressList',async(ctx) => {
    try {
        const Address = mongoose.model('Address')
        let result = await Address.find().exec()
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

//通过id获取地址信息
router.post('/getAddressInfo',async (ctx) => {
    try {
        let addressId = ctx.request.query.addressId;
        const Address = mongoose.model('Address');
        let result = await Address.findOne({_id: addressId}).exec();
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

//通过id删除地址信息
router.post('/delAddressInfo',async(ctx) => {
    try {
        let addressId = ctx.request.query._id;
        const Address = mongoose.model('Address')
        let result = await Address.remove({_id: addressId}).exec()
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
//更新地址信息
router.post('/updateAddressInfo',async(ctx) => {
    try {
        let addressId = ctx.request.query._id;
        const Address = mongoose.model('Address')
        let result = await Address.update({_id: addressId},ctx.request.query).exec()
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
//获取默认地址信息
router.get('/getDefaultAddressInfo',async(ctx) => {
    try {
        const Address = mongoose.model('Address');
        let result = await Address.findOne({is_default: true});
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