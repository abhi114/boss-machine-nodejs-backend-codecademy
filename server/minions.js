const minionsRouter = require('express').Router();
module.exports = minionsRouter;

const {getAllFromDatabase,addToDatabase,getFromDatabaseById,updateInstanceInDatabase,deleteFromDatabasebyId} = require('./db')

minionsRouter.param('minionId',(req,res,next,id)=>{
    const minion = getFromDatabaseById('minions', id);
    if(minion){
        req.minion = minion;
        next();
    }else{
        res.status(404).send();
    }
})

minionsRouter.get('/',(req,res,next)=>{
    res.send(getAllFromDatabase('minions'));
})
minionsRouter.post('/',(req,res,next)=>{
    const minn = addToDatabase('minions',req.body);
    res.status(201).send(minn);
})
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
  });
minionsRouter.put('/:minionId',(req,res,next)=>{
    const instance = updateInstanceInDatabase('minions',req.body);
    res.send(instance);
})
minionsRouter.delete('/:minionId',(req,res,next)=>{
    const del = deleteFromDatabasebyId('minions',req.params.minionId);
    if(del){
        res.status(204);
    }else{
        res.status(500);
    }
    res.send()
})
minionsRouter.get('/:minionId/work',(req,res,next)=>{
    const work = getAllFromDatabase('work').filter((abc)=>{
        return abc.minionId === req.params.minionId
    });
    res.send(work);
})
minionsRouter.post('/:minionId/work',(req,res,next)=>{
    const add = req.body;
    const wor = addToDatabase('work',add);
    if(wor){
        res.status(201).send(wor);
    }
})
minionsRouter.param('workId',(req,res,next,id)=>{
    const newWork = getFromDatabaseById('work',id);
    if(newWork ){
        req.work = newWork;
        next();
    }else{
        res.status(404).send();
    }
})

minionsRouter.put('/:minionId/work/:workId',(req,res,next)=>{
    if(req.params.minionId !== req.body.minionId){
        res.status(400).send()
    }else{
        const update = updateInstanceInDatabase('work',req.body);
        res.send(update);

    }
    
})

minionsRouter.delete('/:minionId/work/:workId',(req,res,next)=>{
    const deleted = deleteFromDatabasebyId('work',req.params.workId);
    if(deleted){
        res.status(204);
    }else{
        res.status(500);
    }
    res.send()
})
