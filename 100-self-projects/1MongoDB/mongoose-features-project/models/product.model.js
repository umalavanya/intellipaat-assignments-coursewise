const mongoose = require('mongoose') ;
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true
    },
    description:String,
    price:{
        type:Number,
        required:true,
        min:[0,'Price cannot be negatuve']
    },
    category:{
        type:String,
        enum:['electronics', 'clothing','books','food','other'],
        required:true
    },
    tags:[String],
    inStock:{
        type:Boolean,
        default:true
    },
    quantity:{
        type:Number,
        default:0,
        min:0
    },
    ratings:[{
        user: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
        rating:{type:Number, min:1, max:5},
        comment:String,
        date:{type:Date, default: Date.now}
    }],
    dimensions:{
        length:Number,
        width:Number,
        height:Number,
        unit:{type:String, default:'cm'}

    },
    // discount feature with custom validation
    discount:{
        percentage:{type:Number, min:0, max:100},
        startDate:Date,
        endDate:Date,
        isActive:{type:Boolean, default:false}
    },
    createdAt:{type:Date, default:Date.now}
}) ;

// Compound index
productSchema.index({category:1, price:-1}) ;

// Custom validation for discount dates
productSchema.pre('save', function(next) {
    if(this.discount && this.discount.startDate && this.discount.endDate){
        if(this.discount.startDate >= this.discount.endDate){
            next(new Error('Discount end date must be after the start date'))
        }
    }
    next() ;
}) ;

const Product = mongoose.model('Product', productSchema) ;
module.exports = Product ;