import { Request, Response } from "express";

import { parseISO } from 'date-fns';
import { container, inject, injectable } from 'tsyringe';


import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentRepository from "../../typeorm/repositories/AppointmentRepository";

export default class AppointmentsController {



  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;
    const createAppointmentService = container.resolve(CreateAppointmentService);
    //const parseDate = parseISO(date);

    const dateTeste = new Date(date);
    //console.log(` Appointment Controller: ${dateTeste}`)
    dateTeste.setHours(dateTeste.getHours() + 3)

    console.log(` Appointment Controller: ${dateTeste}`)




    const appointment = await createAppointmentService.execute({
      provider_id,
      user_id,
      date,
    });
    return response.json(appointment);

  }

  public async get(request: Request, response: Response): Promise<Response> {
    const appointmentRepository = new AppointmentRepository();
    const appoitments = await appointmentRepository.find();
    return response.json(appoitments);

  }

}
