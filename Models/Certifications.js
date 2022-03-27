const Joi = require('joi')
.extend(require('@joi/date'));;
const mongoose = require('mongoose');
//const { reservation } = require('./Reservation');

const Certification_Schema = new mongoose.Schema(
    {
        titre : String ,
        description : String ,
        date_dispo : [Date] ,
        date_reserver : [Date],
        reservations : [
            {
                id : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'Reservation'
                }
                
            }
        ] 
    }
) 

const Certification_validator = Joi.object(
    {
        titre : Joi.string().required(),
        description : Joi.string(),
        date_dispo : Joi.array().items(Joi.date().format('YYYY-M-D HH:mm')),
        

    }
)


const date_validator = Joi.object(
    {

        date : Joi.date().format('YYYY-MM-DDTHH:mm:ss.000Z'),
    }
)

const Certification = mongoose.model('Certification',Certification_Schema) ;

module.exports.Certification = Certification ;
module.exports.Certification_validator = Certification_validator ;
module.exports.date_validator = date_validator ;

