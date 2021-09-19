const jwt = require('jsonwebtoken');

const authMiddle = async (req , res , next )=>{
    const auth = req.headers.authorization;
    if(!auth) return res.status(400).json({"msg":"not authorized"})
    try{
        const token = auth.split(' ')[1];
        const user = await jwt.verify(token  , 'sdfdfks;df');
        req.user = user;
        next();
    }
        catch(err){
            console.log(err);
            res.status(400).json({msg:"invalid token"})
        }
}

module.exports = {authMiddle}