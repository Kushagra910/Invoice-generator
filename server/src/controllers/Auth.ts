const User = require("../models/user")
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import {Request,Response} from 'express';
dotenv.config();

// SignUp Handler

exports.signUp = async (req :Request, res : Response) => {
  try {
    // Data fetch from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = req.body;
    // validate karlo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword 
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // 2 password match karlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password donot match retry",
      });
    }
    // check User already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: " User is already registered",
      });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Entry create in DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });
    // return res
    return res.status(200).json({
      success: true,
      message: "User is Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "user cannot be registered please try again",
    });
  }
};

// Login Handler

exports.login = async (req:Request, res : Response) => {
  try {
    const { email, password } = req.body;
    // validate the data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required , please try again",
      });
    }
    // user check exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return user.status(401).json({
        success: false,
        message: "User is not registered,please signup first",
      });
    }
    // generate JWT, after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payLoad = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const secret : string | undefined = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
      }
      const token = jwt.sign(payLoad,secret , {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
      // create cookie and send response
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login Failure , please try again",
    });
  }
};
