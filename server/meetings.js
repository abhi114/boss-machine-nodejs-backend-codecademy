const meetingsRouter  = require('express').Router();

module.exports = meetingsRouter;

const {getAllFromDatabase,createMeeting,addToDatabase,deleteAllFromDatabase} = require('./db');

meetingsRouter.get('/',(req,res,next)=>{
    res.send(getAllFromDatabase('meetings'));
})

meetingsRouter.post('/',(req,res,next)=>{
    const add = addToDatabase('meetings',createMeeting())
    res.status(201).send(add);
})
meetingsRouter.delete('/',(req,res,next)=>{
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})