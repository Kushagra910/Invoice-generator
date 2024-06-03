import express from 'express'

const router = express.Router();


const {signUp , login}  = require('../controllers/Auth');


// ********************************************************************************************
//                           Authentication routes
// ********************************************************************************************


// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)


module.exports = router