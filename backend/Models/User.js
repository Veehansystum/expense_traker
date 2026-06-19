const { required } = require('joi');
const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    expenses:[
        {
            text:{
                type:String,
                required:true

            },
            amount:{
                type:Number,

            },
            createdAt:{
                 type:Date,
                 default:Date.now
            }
        }
    ]
});

const UserModel =mongooes.model('users', UserSchema);
module.exports = UserModel;