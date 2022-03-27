require('./db/connect');
const express = require('express') ;
const _ = require('lodash');
const user_router= require('./routers/users');
const auth = require('./middlewares/auth')
const router_certif = require('./Routers/Certification');
const router_reservation = require('./Routers/Reservation');
const dbDebug = require('debug')('app:db');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/api/certification',router_certif);
app.use('/api/reservation',router_reservation);
app.use('/api/users',user_router);
app.get('' , (req,res) => {
    res.send("Hello First Test");
});


app.listen(3000 , ()=>dbDebug(`Server on ${port}`));