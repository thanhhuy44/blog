import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      authen?: JwtPayload;
    }
  }
}

const verifyJwtToken = (token: string, secretKey: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (token) {
    try {
      const decoded = (await verifyJwtToken(
        token,
        process.env.PRIVATE_KEY || ""
      )) as JwtPayload;
      req.authen = decoded;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        errCode: 1,
        message: "unauthorized access!",
        data: null,
      });
    }
  } else {
    return res.status(403).send({
      errCode: 1,
      message: "No token provided.",
      data: null,
    });
  }
};
