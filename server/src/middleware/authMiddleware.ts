import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from './errorHandler';
import { db } from '../db/connection';
// import { users } from '../db/schema/users';
import { eq } from 'drizzle-orm';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ApiError(401, 'Not authorized, no token provided'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
    };

    // Check if user still exists
    // Commented out until users schema is implemented
    // const user = await db.select()
    //   .from(users)
    //   .where(eq(users.id, decoded.id))
    //   .limit(1));
    
    // if (!user || user.length === 0) {
    //   return next(new ApiError(401, 'User no longer exists'));
    // }
    
    // Temporary: Skip user check

    // Add user to request object
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    return next(new ApiError(401, 'Not authorized, invalid token'));
  }
};