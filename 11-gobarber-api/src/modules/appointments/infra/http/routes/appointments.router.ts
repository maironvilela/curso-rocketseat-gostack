import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controller/AppointmentsController';
import ProviderAppointmentsController from '../controller/ProviderAppointmentsController';
import { celebrate, Joi, Segments } from 'celebrate';


const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();;
const providerAppointmentsController = new ProviderAppointmentsController

appointmentRouter.use(ensureAuthenticated);


appointmentRouter.get('/', appointmentsController.get)
appointmentRouter.get('/me', providerAppointmentsController.index)


appointmentRouter.post('/', celebrate({
  [Segments.BODY]: {
    date: Joi.date().required(),
    provider_id: Joi.string().uuid().required(),
  }

}), appointmentsController.create)


export default appointmentRouter;
