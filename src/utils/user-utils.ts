import jwt from 'jsonwebtoken';
import { keys } from '../config/keys';
import { IUser } from '../interfaces/user-interface';

function generateAccessToken(user: IUser) {
  return jwt.sign({ user }, keys.JWT_SECRET, { expiresIn: '10h' });
}

export { generateAccessToken };
