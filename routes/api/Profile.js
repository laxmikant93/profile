const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../models/User')
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
// @route   GET api/profile/me
// @desc    get current user profile
// @access  Private

router.get('/me',auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({ user: req.res.id}).populate(['user','name','avatar']);

        if(!profile) {
            return res.status(400).json('msg: "thereis no such profile"');
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// @route POST api/profile
// @desc Create user profile
// @access Private

router.post('/', [ auth, [
    check('status','status is rquired')
    .not()
    .isEmpty(),
    check('skills','skills reqd')
    .not()
    .isEmpty() 
]],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        company,
        website,
        
    }
})
module.exports = router;
