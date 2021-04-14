const express = require("express");
const router = express.Router();
const {User} = require('../../models');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


router.get("/",async (req, res) =>{
    const users = await User.findAll();
});





module.exports = router;