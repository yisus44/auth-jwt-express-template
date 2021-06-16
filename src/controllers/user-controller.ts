//TODO Refactor in more functions and add better error handling
import { User } from '../models/User';
import { keys } from '../config/keys';

import { Request, Response } from 'express';
import { generateAccessToken } from '../utils/user-utils';
import bcrypt from 'bcrypt';

async function createUser(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, keys.SALT_ROUND);
    const newUser = await new User({
      username,
      hashedPassword,
    });
    await newUser.save();
    const token = generateAccessToken(newUser);
    res.header('auth-token', token).status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong while creating your profile');
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    if (!user) throw new Error('User not found!!');

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (match) {
      const token = generateAccessToken(user);
      res
        .header('auth-token', token)
        .status(201)
        .send({
          user,
          token,
        })
        .redirect('/');
    } else {
      res.send('Bad credentials').status(400);
    }
  } catch (error) {
    console.log(error);
    res.send('Something went wrong while login').status(500);
  }
}

async function logoutUser(req: Request, res: Response) {
  //on this part the jwt should be deleted from the client session storage
  res.send('You have been logout').redirect('/');
}

async function updateUserInfo(req: Request, res: Response) {
  const { username, newUsername } = req.body;
  console.log(req.body);
  try {
    const newUser = await User.findOneAndUpdate(
      { username },
      { username: newUsername }
    );
    res.send(newUser);
  } catch (error) {
    res.status(500).send('Something went wrong with your request');
  }
}

async function getUserProfile(req: Request, res: Response) {}

async function deleteUserProfile(req: Request, res: Response) {}

export {
  createUser,
  loginUser,
  logoutUser,
  updateUserInfo,
  getUserProfile,
  deleteUserProfile,
};
