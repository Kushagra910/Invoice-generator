import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



// Define a custom interface to extend Request
interface CustomRequest extends Request {
  user?: any; // Define the user property
}

// Auth middleware
export const auth = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract token
    const token: string  = req.cookies.token || 
                                      req.header("Authorization")?.replace("Bearer ","") || '';
    // If token is missing 
    if (!token) {
       res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    const secret: string  = process.env.JWT_SECRET || '';
    // Verify the token 
    try {
      const decoded: any = jwt.verify(token, secret);
      console.log(decoded);
      // Adding user property to request
      req.user = decoded;
      next();
    } catch(err) {
      // Verification issues
       res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch(err) {
     res.status(400).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

