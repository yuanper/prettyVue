/**
 * 文件读写操作
 * 对于goods.json里面的数据进行过滤操作
 * 之后写入newGoods.json文件中
 */
const fs = require('fs')

fs.readFile('./data_json/goods.json',function (error,data) {
    if(error){
        return console.log(error);
    }
    let dataParse = JSON.parse(data);
    let i = 0;
    let dataObj = [];
    dataParse.RECORDS.map(function(value,index){
        if (value.IMAGE1 != null){
            i++;
            dataObj.push(value)
        }
    })
    fs.writeFile('./data_json/newGoods.json',JSON.stringify(dataObj),function (error) {
        if(error) console.log('写文件操作失败！')
        else console.log('写文件操作成功!')
    })
})

