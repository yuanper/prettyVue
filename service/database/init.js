const mongoose = require('mongoose')
const db = "mongodb://localhost/prettyVue"

const glob = require('glob')
const path = require('path')

mongoose.Promise = global.Promise

exports.connect = () =>{
    //连接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0

    return new Promise((resolve,reject) => {
        //增加数据库链接的数据监听
        mongoose.connection.on('disconnected', () => {
            console.log('**************数据库断开***************')
            if(maxConnectTimes < 3){
                maxConnectTimes ++;
                mongoose.connect(db)
            }else{
                reject();
                throw new Error('数据库出现问题，需要人为处理！')
            }
        })

        mongoose.connection.on('error', (err) => {
            console.log('***************数据库错误**************')
            if(maxConnectTimes < 3){
                maxConnectTimes ++;
                mongoose.connect(db)
            }else{
                reject(err);
                throw new Error('数据库出现问题，需要人为处理！')
            }
        })

        mongoose.connection.once('open', () => {
            console.log('Mongodb connected successfully!')
            resolve()
        })
    })
}

exports.initSchema = () => {
    glob.sync(path.resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}