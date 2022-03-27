const Joi = require('joi')
.extend(require('@joi/date'));;
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi)



const Reservation_Schema = new mongoose.Schema(
    {
        user : {
        
                type : mongoose.Schema.Types.ObjectId,
                ref: 'User'
            
        } ,
        certification : {
            
                type : mongoose.Schema.Types.ObjectId,
                ref: 'Certification'
            
        } , 
        date : Date ,
        
    }
) ;

const Reservation_validator = Joi.object(
    {
        user : Joi.objectId(),
        certification : Joi.objectId(), 
        date_dispo : Joi.date().format('YYYY-M-D HH:mm'),
        

    }
)




const Reservation = mongoose.model('Reservation',Reservation_Schema) ;

module.exports.Reservation = Reservation ;
module.exports.Reservation_validator = Reservation_validator ;

