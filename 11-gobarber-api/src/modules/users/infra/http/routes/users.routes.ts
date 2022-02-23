import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controller/UsersController';
import UserAvatarController from '../controller/UserAvatarController';
import { celebrate, Joi, Segments } from 'celebrate';

interface UserResponse {
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

const userRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();


userRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), usersController.create);


userRouter.get('/', usersController.index)

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), userAvatarController.update)

export default userRouter;
