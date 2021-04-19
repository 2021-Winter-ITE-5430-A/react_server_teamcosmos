const mongoose = require ('mongoose');

///schema
const AboutSchema = new mongoose.Schema ({ 

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
  
    title: { 
        type: String,
         required: true, 

    },
    history: { 
       type: String,
        required: true, 

    }, 
 
    services:{
      type: String, 

    }, 

   date: {
      type: Date,
       default: Date.now
     },
});
  
  module.exports = mongoose.model('About', AboutSchema);









 