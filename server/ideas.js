const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {getAllFromDatabase,addToDatabase,getFromDatabaseById,updateInstanceInDatabase,deleteFromDatabasebyId} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('id',(req,res,next,id)=>{
    const idea = getFromDatabaseById('ideas',id);
    if(idea){
        req.idea = idea;
        next();
    }else{
        res.status(404).send();
    }
});

ideasRouter.get('/',(req,res,next)=>{
    res.send(getAllFromDatabase('ideas'));
})

ideasRouter.post('/',checkMillionDollarIdea,(req,res,next)=>{
    const idea = addToDatabase('ideas',req.body);
    res.status(201).send(idea);
})
ideasRouter.get('/:id',(req,res,next)=>{
    res.send(req.idea);
})
ideasRouter.put('/:id',checkMillionDollarIdea,(req,res,next)=>{
    const insatance = updateInstanceInDatabase('ideas',req.body);
    res.send(insatance);
})
ideasRouter.delete('/:id',(req,res,next)=>{
    const deleted = deleteFromDatabasebyId('ideas',req.params.id)
    if(deleted){
        res.status(204);
    }else{
        res.status(500);

    }
    res.send();
})
