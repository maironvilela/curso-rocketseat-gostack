import { Router } from 'express';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import SessionsController from '../controller/SessionsController';
import ResetPasswordController from '../controller/ResetPasswordController';
import { celebrate, Joi, Segments } from 'celebrate';


const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();


const passwordController = new SessionsController();
passwordRouter.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
  }
}), forgotPasswordController.create)
passwordRouter.post('/reset', celebrate({
  [Segments.BODY]: {
    token: Joi.string().required(),
    password: Joi.string().min(6).required()
  }

}), resetPasswordController.create)


export default passwordRouter;
