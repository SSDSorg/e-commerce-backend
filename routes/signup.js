const express = require('express');
const router = express.Router();


const User = require('../Models/User');


// post user 
router.post('/', async (req, res) => {
    console.log("signup API")
    console.log(req.body);
    try {
        const userFromDb = await User.findOne({email: req.body.email});

        if (!userFromDb) {
            const user = new User(req.body);
    
            await user.save();
    
            res.status(500).json({
                message: 'User created successfully!!!',
            });
        }
        else {
            res.status(404).json({err_msg: "User already exists"});
        }
    }
    catch(err) {
        console.log("signup API error")
        console.log(err)
        res.status(404).json({err_msg: "API Error occured while creating user"});
    }
})


module.exports = router;