const router  = require('express').Router();
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const {users} = require('../models/users.model');

router.post('/signUp',async (req,res)=>{
    const {name,email,password} = req.body;
    const emailExist = await users.findOne({email});
    const hasPassword = bcrypt.hashSync(password,10);

    if(emailExist)return res.status(400).json({msg:'Email is already exist'});

    const user = new users({
        name,
        email,
        password:hasPassword
    })

    await user.save();
    res.status(200).json(userDto(user));
})

router.post('/signIn',async(req,res)=>{
    const {email,password} = req.body;

    const user = await users.findOne({email});
    if(!user)return res.status(400).json({msg:'email or password is incorrect'});

    const passwordCorrect = bcrypt.compareSync(password , user.password) 
    if(!passwordCorrect)return res.status(400).json({msg:'email or password is incorrect'});

    const userData = userDto(user);
    const token = jwt.sign(userData, "sdfdfks;df")
    res.status(200).json({msg:"welcome "+ user.name,token})
})


function userDto({_id,name,email,createdAt}){
    return{
        id:_id,
        name,
        email,
        createdAt
    }
}
module.exports = router