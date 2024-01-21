const express = require('express');
const router = express.Router();


const Address = require('../Models/Address');



// adding address of a particular user
router.post('/addAddress', async (req, res) => {
    try {
        const address = new Address(req.body);

        await address.save();

        res.status(200).json({message: 'Address added successfully'});
    }
    catch(err) {
        res.status(500).json({err_msg: 'API Error occured while adding address'});
    }
})


// get address of a particular user 
router.get('/getAddress/:userId', async (req, res) => {
    try {
        const address = await Address.find({userId: req.params.userId});

        if (!address) {
            res.status(404).json({err_msg: "Address not found"});
        }
        else {
            res.status(200).json({message: 'Address fetched successfully', addressDetails: address});
        }
    }
    catch(err) {
        res.status(500).json({err_msg: 'API Error occured while fetching address'});
    }
})


module.exports = router;