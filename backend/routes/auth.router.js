const {Router} = require('express');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const User = require('../models').User;
const Sequelize = require('sequelize');

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password} = req.body;
        const temp_user = await User.findOne({where: {username: username}});
        if (temp_user) {
            return res.status(400).json({message: "This username already exists"});
        }
        const pass = crypto.createHash('md5').update(password).digest("hex");
        const user = await User.create({ username, email, password: pass });
        res.status(201).json({ error: 'message' });
    } catch (err) {
        res.status(500).json({message: 'Oops! auth.router.js'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password} = req.body;
        const temp_user = await User.findOne({where: {username: username}});
        if (!temp_user) {
            return res.status(400).json({message: "User not found"});
        }
        const pass = crypto.createHash('md5').update(password).digest("hex");
        const isMatch = (pass === temp_user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jsonwebtoken.sign({userId: temp_user.id}, config.get('global.secret'), {expiresIn: '1h'});
        temp_user.last_login = Sequelize.NOW
        await emp_user.save()
        res.json({ token, userId: temp_user.id })
    } catch (err) {
        res.status(500).json({message: 'Oops!'});
    }
});

module.exports = router
