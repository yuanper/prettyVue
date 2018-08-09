const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    name: {type: String},
    tel: {type: Number},
    province: {type: String},
    city: {type: String},
    county: {type: String},
    address_detail: {type: String},
    area_code: {type: String},
    postal_code: {type: String},
    is_default: {type: Boolean}
})

mongoose.model('Address',AddressSchema)