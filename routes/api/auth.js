const express = require('express');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/', auth,async (req,res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('server error')
    }
});

// @route   POST api/auth
// @desc    Test token get
// @access  Public

router.post('/', [
    check('email','Please include valid mail').isEmail(),
    check('password',' password required').exists()],
    async (req,res) => {
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
// email exist or not
const { email,password } = req.body;

try{

    let user = await User.findOne({ email });

    if (!user) {
       return res.status(400).json({ errors: [ { msg: 'invalid creds'}] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'invalid'}]});
    }



    //bcrypt password

    const payload = {
        user: {
            id: user.id
        }

        }
    jwt.sign(payload,
        config.get('jwtSecret'),
        {
            expiresIn: 36000 } , (err, token) =>
        {
            if(err) throw err;
            res.json( { token });
        }
    );
}
catch(err) {
    console.error(err.message);
    res.status(500).send('server error');
}
});
module.exports = router;


// {
//     "_id": "65cf6b730e6bda4796ea3eb8",
//     "name": "laxx",
//     "email": "laxmikantswain93@gmail.com",
//     "avatar": "//www.gravatar.com/avatar/9991358417b3fb9e6786e651edd97031?s=200&r=pg&d=mm",
//     "date": "2024-02-16T14:04:35.496Z",
//     "__v": 0
// }
