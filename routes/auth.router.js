const {Router} = require('express');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const User = require('../backend/models/User');


const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password} = req.body;
        const temp_user = await User.findOne({ username });
        if (temp_user) {
            return res.status(400).json({message: "This username already exists"});
        }
        const user = await User.create({ username, email, password: pass });
        const pass = crypto.createHash('md5').update(password).digest("hex");
        res.status(201).json({message: "User created"});
    } catch (e) {
        res.status(500).json({message: 'Oops!'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password} = req.body;
        const temp_user = await User.findOne({ username });
        if (!temp_user) {
            return res.status(400).json({message: "User not found"});
        }
        const pass = crypto.createHash('md5').update(password).digest("hex");
        const isMatch = (pass === temp_user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jsonwebtoken.sign({userId: user.id}, config.get('global.secret'), {expiresIn: '1h'});
        res.json({token, userId: user.id});
    } catch (e) {
        res.status(500).json({message: 'Oops!'});
    }
});

module.exports = router
