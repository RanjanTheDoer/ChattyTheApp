const User = require("../model/userModel");

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log("Received login request:", { username, password });

        const user = await User.findOne({ username });

        if (!user) {
            console.log("User not found");
            return res.status(401).json({ msg: "Incorrect Username or Password", status: false });
        }

        // Compare the entered plain text password with the password in the database
        if (password !== user.password) {
            console.log("Invalid password");
            return res.status(401).json({ msg: "Incorrect Username or Password", status: false });
        }

        console.log("Login successful");
        return res.json({ status: true, user });
    } catch (ex) {
        console.error("Error during login:", ex);
        next(ex);
    }
};



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

