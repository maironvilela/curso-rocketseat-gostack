import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repository/NotificationsRepository';



container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
)



container.registerSingleton<IUsersTokenRepository>(
  'UsersTokenRepository',
  UsersTokenRepository
)




