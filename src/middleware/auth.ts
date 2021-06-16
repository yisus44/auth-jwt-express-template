//TODO: test this and make sure other user cannot change other users profiles

import jwt from 'jsonwebtoken';
import { keys } from '../config/keys';
import { Request, Response } from 'express';

//now the jwt get an user obj, not an string
async function auth(req: Request, res: Response, next: Function) {
  try {
    const token: string = String(req.headers['authorization']).split(' ')[1];
    if (!token) {
      return res.status(401).send({ error: 'You are not authorized' });
    }
    const decoded = jwt.verify(token, keys.JWT_SECRET);
    req.body.payload = decoded;
    next();
  } catch (err) {
    console.log(err);
    return -1;
  }
}

export { auth };
