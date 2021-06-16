import { Router } from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
  updateUserInfo,
  getUserProfile,
  deleteUserProfile,
} from '../controllers/user-controller';

import { auth } from '../middleware/auth';

const userRouter = Router();

userRouter.post('/signup', createUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout', logoutUser);

userRouter.post('/user/update', auth, updateUserInfo);

userRouter.get('/user/me', auth, getUserProfile);

userRouter.delete('user/delete', auth, deleteUserProfile);

userRouter.get('/', function (req, res) {
  res.send('hola amlo');
});
export { userRouter };
