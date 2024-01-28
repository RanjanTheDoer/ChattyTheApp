const User = require("../model/userModel");
const brcypt = require("bcrypt");

module.exports.register = async (req,res,next) => {
    try{
    const {username,email,password} = req.body;
    const usernameCheck = await User.findOne({ username });
    if(usernameCheck)
        return res.json({ msg: "Username already used", status: false});
    const emailCheck = await User.findOne({ email});
    if(emailCheck)
        return res.json({msg: "Email already used",  status: false});
    const user = await User.create({
        email,
        username,
        password,
    });
    return res.json({status: true, user});
    } catch(ex){
        next(ex);
    }
};

module.exports.login = async (req,res,next) => {
    try{
    const {username,password} = req.body;
    const user = await User.findOne({ username });
    if(!user)
        return res.json({ msg: "Incorrect username or password", staus: false});
    const isPasswordValid = await brcypt.compare(password, user.password);
    if(!isPasswordValid)
        return res.json({ msg: "Incorrect username or password", staus: false});
    
    return res.json({status: true, user});
    } catch(ex){
        next(ex);
    }
};