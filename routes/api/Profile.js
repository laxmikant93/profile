const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../models/User')
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const request = require('request');
const config = require('config');
// @route   GET api/profile/me
// @desc    get current user profile
// @access  Private

router.get('/me',auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({ user: req.res.id}).populate(['user','name','avatar']);

        if(!profile) {
            return res.status(400).json('msg: "there is no such profile"');
        }
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// @route POST api/profile
// @desc Create user profile
// @access Private

router.post('/', [ auth, [
    check('status','status is required')
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
    // pull the fields out
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
        } = req.body;

        //build profile obj
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        } 
        console.log(profileFields.skills);
        //res.send('Hello');

        // social fields obj
        profileFields.social = {}
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;

        try {

            let profile = await Profile.findOne({ user: req.user.id });
            if(profile) {
                //update
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, 
                    {$set: profileFields},{ new: true});
        return res.json(profile);
                }
        //create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
                }
         
        catch(err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    });
    // @route get api/profile
// @desc get all profile
// @access Public

router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name','avatar']);
        res.send(profiles);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
 // @route get api/profile/user/user_id
// @desc get all profile by userid
// @access Public
router.get('/user/user_id', async (req,res) => {
    try {
        const profile = await Profile.findOne().populate('user', ['name','avatar']);
        if(!profile) return res.status(400).json({ msg: "no profile"});
        res.json(profile);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

 // @route get api/profile/user/user_id
// @desc get all profile by userid
// @access Public
router.delete('/', auth,async (req,res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.id});
        await User.findOneAndDelete({ _id: req.user.id});

        res.json({ msg: 'user deleted'});
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

 // @route put api/profile/experience
// @desc Add profile experience 
// @access Private
router.put('/experience', [
    auth,
     [
    check ('title','title is required')
    .not()
    .isEmpty(),
    check ('company','company is required')
    .not()
    .isEmpty(),
    check ('from','from date is required')
    .not()
    .isEmpty(),
    check ('title','title is required')
    .not()
    .isEmpty()
]
],
async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    
    try {
       const profile = await Profile.findOne( { user: req.user.id });

       profile.experience.unshift(newExp);
       await profile.save();
        res.json(profile);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
router.delete('/experience/:exp_id', auth,async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id});
        // get remove index

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
}
    catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
    
});
 // @route put api/profile/education
// @desc Add profile education 
// @access Private
router.put('/Education', [
    auth,
     [
    check ('school','school is required')
    .not()
    .isEmpty(),
    check ('degree','degree is required')
    .not()
    .isEmpty(),
    check ('fieldofstudy','field of study is required')
    .not()
    .isEmpty(),
    check ('from','from date is required')
    .not()
    .isEmpty()
]
],
async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    
    try {
       const profile = await Profile.findOne( { user: req.user.id });

       profile.Education.unshift(newEdu);
       await profile.save();
        res.json(profile);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
router.delete('/Education/:edu_id', auth,async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id});
        // get remove index

        const removeIndex = profile.Education.map(item => item.id).indexOf(req.params.edu_id);
        
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
}
    catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
    
});

 // @route put api/profile/github/:username
// @desc Add profile github username
// @access Public
router.get('/github/:username', (req,res) => { 
    try {
        const options = {
            uri: `https://api.github.com/users/$
            {
                req.params.username
            }
            /repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecrets')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}};
            request(options, (error,response,body) => {
                if (error) console.error(error);
                if (response.statusCode !== 200) {
                 res.status(404).json({ msg:'no github profile found'});
                }
                return res.json(JSON.parse(body));
            });
        }
    catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }    
});

module.exports = router;
