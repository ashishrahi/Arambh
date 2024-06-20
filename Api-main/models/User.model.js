const {mongoose} = require('mongoose');

 const UserSchema = new mongoose.Schema({
  
    username:{
        type:String,
    },

    avatar:{
     type:String,
    },

    email:{
        type:String,
    },

    password:{
      type:String,
    },

    phone:{
    type:String,
    },

    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:Date,

    tokenExpiresAt:{
        type:Date,
    },

     Refercode:{
     type:String,
     unique:true,
     },
    token:{
    type:String,
    },
    wallet:{
    type:String,
    },
    Referby:{
        type:String,
    },
    Subscription:{
        type:mongoose.Schema.ObjectId,
    },
    purchaseDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    },
    allcategory:[{
      Category: { 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category',
                },
        Subcategory:{
            type:mongoose.Schema,Types.ObjectId,
             ref:'Subcategory', 
      },
      purchaseDate:{
        type:Date,
      },
      endDate:{
       type:Date,
      },
    }]

},
    {timestamps:true})





const User = mongoose.model('User', UserSchema);
 module.exports = User;
