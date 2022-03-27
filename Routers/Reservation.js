const res = require('express/lib/response');
const { Reservation } = require('../Models/Reservation');

const router = require('express').Router();
const {User, validation_user,validation_user_login} = require('../models/user')

const {Certification,date_validator} = require('../Models/Certifications');

 const _ = require('lodash');

 const auth = require('../middlewares/auth');
 const autoris = require('../middlewares/autoris');

// Resevation White Test avec body => date + l'utilisateur connecter + url => certification id 

router.post('/:certificationid',auth,async (req,res) => {
try{
const user = await User.findById(req.user.id);
if(!user)
    res.status(400).send('user id Error');
const certification = await Certification.findById(req.params.certificationid);
if(!certification)
    res.status(400).send('certification id Error');

let results= date_validator.validate(req.body);
if(results.error)
        return res.status(400).send(results.error.details[0].message);

let check = _.find(certification.date_dispo,(date)=>{return JSON.stringify(date).slice(1,-1) === req.body.date});
   
if(!check)
    return res.status(400).send("date not disponile");
certification.date_reserver.push(req.body.date) ;
certification.date_dispo = certification.date_dispo.filter(date => {
    return JSON.stringify(date).slice(1,-1) !== req.body.date;
    
});
    

let reservation = new Reservation();
reservation.certification = certification._id ;
reservation.user = user._id ;
reservation.date = req.body.date ;
reservation = await reservation.save();

certification.reservations = _.concat( certification.reservations,[reservation._id]) ;

certification.save();

user.reservations = _.concat(user.reservations , [reservation._id]) ; 
user.save();   

res.send(reservation);
} catch (error) {
    res.status(400).send('Problem saving Reservation : '+error.message)
}

});
 
module.exports = router ;