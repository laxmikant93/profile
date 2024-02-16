const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')
// @route   POST api/users
// @desc    Test route
// @access  Public

router.post('/', [
    check('name', 'Name is Required')
    .not()
    .isEmpty(),
    check('email','Please include valid mail').isEmail(),
    check('password','please enter with 6 or more characters').isLength({ min: 6})],
    async (req,res) => {
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
// email exist or not
const { name,email,password } = req.body;

try{

    let user = await User.findOne({ email });

    if (user) {
        res.status(400).json({ errors: [ { msg: 'User already exists'}] });
    }
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'

    })

    user = new User({
        name,
        email,
        avatar,
        password
    });

    //bcrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);

    await user.save();
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
