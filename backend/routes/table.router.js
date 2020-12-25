const {Router} = require('express');
const config = require('config');
const User = require('../models').User;

const router = Router();

router.get('/', async (req, res) => {
    const userList = await User.findAll()
	res.send(userList);
})

router.post('/check', async (req, res) => {
    try {
        const {userId} = req.body;
        let tempuser = await User.findOne({where: {id: userId}})
        res.json({"ID": tempuser.id, "STATUS": tempuser.status})      
    } catch (e) {
        res.status(500)
    }
})

router.post('/ban', async (req, res) => {
    try {
        const {idArray, userId} = req.body;
        await User.update({status: true}, {where: {id: idArray}})
        res.status(201)
    } catch (e) {
        res.status(500)
    }
})

router.post('/unban', async (req, res) => {
    try {
        const {idArray} = req.body;
        await User.update({status: false}, {where: {id: idArray}})
        res.status(201)
    } catch (e) {
        res.status(500)
    }
})
router.post('/delete', async (req, res) => {
    try {
        const {idArray} = req.body;
        await User.destroy({where: {id: idArray}})
        res.status(201)
    } catch (e) {
        res.status(500)
    }
})

module.exports = router
