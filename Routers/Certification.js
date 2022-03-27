const router = require('express').Router();
const _ = require('lodash');
const express = require('express');
const {Certification_validator , Certification, date_validator} = require('../Models/Certifications');
const auth = require('../middlewares/auth');
const autoris = require('../middlewares/autoris');
router.use(express.json());


// Get date disponible pour une  certification by id
router.get('/disponible/:id',async (req,res)=>{
    let certification = await Certification.findById(req.params.id);
    if(!certification)
        res.status(400).send('this id dont belong to any certification')
    res.send(certification.date_dispo);
});
// add certification to DB only Admin
router.post('',[auth,autoris],async (req,res)=>{
    try {
        let results= Certification_validator.validate(req.body);
        if(results.error)
            return res.status(400).send(results.error.details[0].message);
        let certification = new Certification(req.body);
        certification = await certification.save();
        res.send(certification);
    } catch (error) {
        res.status(400).send('Error saving certification :'+error.message);
    }
    
});

// add  Certification date disponible only Admin
router.put('/date/:id/:date',[auth,autoris], async (req,res) => {
    let certification = await Certification.findById(req.params.id) ;
    let date = {
        date : Date.parse(req.params.date)
    }

    let results= date_validator.validate(date);
    if(results.error)
        return res.status(400).send(results.error.details[0].message);
  
    certification.date_dispo.push(Date.parse(req.params.date)) ;
    
    res.send(await certification.save());
});

// Get certification by id
router.get('/:id',async (req,res)=>{
    let certification = await Certification.findById(req.params.id);
    if(!certification)
        res.status(400).send('this id dont belong to any certification')
    res.send(certification);
});

// Get all Certifications
router.get('' ,auth, async (req,res) => {
    let certifications = await Certification.find() ;
    if(!certifications)
        res.status(400).send(`there is no certification`);
    res.send(certifications);
});

// update  Certification titre
router.put('/:id/:titre' , async (req,res) => {
    let certification = await Certification.findById(req.params.id) ;
    if(!certification)
        res.status(400).send(`there is no certification with this id`);
    certification.titre = req.params.titre ;
    res.send(await certification.save());
});



module.exports=router;