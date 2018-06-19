const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/',async(ctx) => {
    ctx.body = '这是用户操作首页'
})
/*注册*/
router.post('/register',async(ctx) => {
    //取得model
    const User = mongoose.model('User');
    //把前端传过来的data封装成一个新的user对象
    console.log(ctx)
    let newUser = new User(ctx.request.query);
    //用save方法存储
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch((err) => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
})
/**登录 */
router.post('/login',async(ctx) => {
    //前端传过来的数据
    let loginObj = ctx.request.query;
    let userName = loginObj.userName;
    let password = loginObj.password;
    const User = mongoose.model('User');
    await User.findOne({userName: userName}).exec().then(async(result) => {
        console.log(result);
        if(result){
            /**当用户名存在时，进行密码比对 */
            let newUser = new User();
            await newUser.comparePassword(password,result.password)
                .then((isMatch) => {
                    ctx.body = {
                        code: 200,
                        message: isMatch
                    }
                }).catch(err => {
                    ctx.body = {
                        code: 500,
                        message: err
                    }
                })
        }else{
            ctx.body = {
                code: 200,
                message: '用户名不存在'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 200,
            message: err
        }
    })

})
module.exports = router;
