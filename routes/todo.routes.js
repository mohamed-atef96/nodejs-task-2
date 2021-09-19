const router = require('express').Router();
const {todos} =require('../models/todos.model');
const jwt = require('jsonwebtoken');



router.get('/', async(req,res)=>{

    const user = req.user;
    const todo = await todos.find({'createdBy.id':user.id});
    if(todo.length == 0) return res.json({msg:"you don't have any todo"})
    res.status(200).json({todo})

})





router.post('/creatTodo',async(req,res)=>{
    const {content} = req.body;
    const user = req.user;

        const todo = new todos({
            content,
            createdBy:{
                id:user.id,
                name:user.name
            }
        })
    
        await todo.save();
        res.status(200).json(todo);

})






router.put('/updateTodo/:id',async(req,res)=>{
    const {id} = req.params;
    const {content} = req.body;
    const user = req.user;

    const todo = await todos.findOneAndUpdate({_id: id, 'createdBy.id':user.id}, {content})

    if(!todo) return res.status(400).json({msg:'Error todo not found'});

    res.status(200).json({"msg":"todo is updated"})

})






router.delete('/deleteTodo/:id',async (req,res)=>{
    const {id} = req.params;
    const user = req.user;
    const todo = await todos.findOneAndDelete({_id:id,'createdBy.id':user.id})
    if(!todo) return res.status(400).json({msg:'Error todo not found'});
    res.status(200).json({"msg":"todo is deleted"})

   
})

module.exports = router