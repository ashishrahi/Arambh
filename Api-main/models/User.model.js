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
house:{
    type:String,
},
city:{
    type:String,
},
country:{
    type:String,
},
resetPasswordToken:{
        type:String,
      },
    
resetPasswordExpires:{
    type:Date,
    },

token:{
    type:String,
    },

tokenExpiresAt:{
        type:Date,
    },

refercode:{
     type:String,
     unique:true,
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
            type:mongoose.Schema.Types.ObjectId,
             ref:'Subcategory', 
      },

purchaseDate:{
        type:Date,
      },
      
endDate:{
       type:Date,
      },
    }],
    status:{
        type:Boolean,
        default:'true',
    },

},
    {timestamps:true})





const User = mongoose.model('User', UserSchema);
 module.exports = User;
