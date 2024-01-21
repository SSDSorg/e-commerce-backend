const express = require('express');
const router = express.Router();


const User = require('../Models/User');


// post user 
router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            res.status(404).json({err_msg: "User doesn't exists, please signup before login"});
        }
        else {
            
            if (user.password === req.body.password) {
                res.status(500).json({
                    message: 'User loggedin successfully!!!',
                    userDetails: {
                        name: user.name,
                        email: user.email,
                    },
                    jwtToken: 'bis6t336629weasiygkbejhwh3ers7dfztixusjhwebjsrd8f7xy6tuszewghrjsdgufy7'
                });
            }
            else {
                res.status(404).json({err_msg: "Invalid Password"});
            }
            
        }
    }
    catch(err) {
        res.status(404).json({err_msg: "API Error occured while user try to login"});
    }
})


module.exports = router;