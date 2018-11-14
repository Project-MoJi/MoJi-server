var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tripSchema = new Schema({
    user_idx     : Number,
    write_time   : {type : Date, default : Date.now},
    total_cnt    : Number,
    places       : Array,
    dates        : Array,
    details      : Array,
    lats         : Array,
    longs        : Array,
    img_urls     : Array,
    hash_tags    : Array,
    img_cnts     : Array,
    hash_tag_cnts: Array,
    share_users  : Array
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('trip', tripSchema);