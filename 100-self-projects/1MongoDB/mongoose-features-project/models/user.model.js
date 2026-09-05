const mongoose=require('mongoose') ;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trim: true,
        minlength:[2, 'Name must be atleast 2 characters'] ,
        maxlength:[50, 'Name cannot be exceed 50 characters']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    age:{
        type:Number,
        min:[0,'Age cannot be negative'],
        max:[150, 'Age cannot exceed 150'] 
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minlength:[6, 'Password must be at least 6 characters'],
        select:false //won't be returned in queries by default

    },
    role:{
        type:String,
        enum:['user','admin','moderator'],
        defaule:'user'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    profile:{
        bio:{type:String,maxlength:500},
        avatar:{type:String},
        socialLinks:{twitter:String, github:String, linkedin:String}
    },
    address:{
        street:String,
        city:String,
        state:String,
        zipCode:String,
        country:{type:String, default:'USA'}
    },
    interests:[String],
    scores:[Number],
    metadata:{type:Map, of:String},
    lastLogin:{type:Date, default:Date.now},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
},{
    timestamps:true,
    toJSON: {virtuals: true},
    toObject:{virtuals: true }
}) ;

userSchema.virtual('fullName').get(function() {
    return this.name ;
}) ;


userSchema.virtual('ageInDays').get(function() {
    if(!this.createdAt) return null ;
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)) ;
}) ;

// Indexes
userSchema.index({email:1}) ;
userSchema.index({role:1, isActive:1}) ;

// Middleware: Pre-save hook
userSchema.pre('save', function(next){
    this.updatedAt = new Date() ;
    // Hash password would go here in real life
    next() ;
}) ;

// Middleware: Post-save hook
userSchema.post('save', function(doc) {
    console.log(`User ${doc.name} saved successfully`) ;
}) ;

// Instance method
userSchema.methods.getProfileSummary = function(){
    return{
        name: this.name,
        email:this.email,
        role:this.role,
        isActive:this.isActive,
        age:this.age
    } ;
} ;

// Static methos
userSchema.statics.findByRole = function(role){
    return this.find({role}).select('-password') ;
}

// Query helper
userSchema.query.active = function() {
    return this.where({isActive: true }) ;
} ;

const User = mongoose.model('User', userSchema) ;
module.exports = User ;