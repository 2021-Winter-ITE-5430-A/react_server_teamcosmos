const mongoose = require ('mongoose');

///schema
const TemplateSchema = new mongoose.Schema ({ 

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      
    resumeUrl: { 
       type: String,
        required: true, 

    }, 
    coverLetterUrl:{
      type: String, 

    }, 
     cvType:{
        type: String,

    },

   date: {
      type: Date,
       default: Date.now
     },
});
  
  module.exports = mongoose.model('Template', TemplateSchema);
