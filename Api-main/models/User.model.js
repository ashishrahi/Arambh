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
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subscription',
    },

subscriptionId:{
    type:String,
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
                categoryId:{
                    type:String,
                },
        Subcategory:{
            type:mongoose.Schema.Types.ObjectId,
             ref:'Subcategory', 
      },
      subcategoryId:{
        type:String,
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
