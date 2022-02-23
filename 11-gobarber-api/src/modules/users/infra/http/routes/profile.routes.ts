import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { Subject } from 'typeorm/persistence/Subject';

import ProfileController from '../controller/ProfileController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
profileRouter.use(ensureAuthenticated)


const profileController = new ProfileController();


profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.when('password', {
      is: Joi.equal("Confirmação de senha nao confere"),
      then: Joi.string(),
    }),

  }

}), profileController.update);


profileRouter.get('/', profileController.show);



export default profileRouter;

