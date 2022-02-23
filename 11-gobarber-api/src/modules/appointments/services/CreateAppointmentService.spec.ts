import "reflect-metadata"
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from "@shared/errors/AppError";
import FakeNotificationRepository from "@modules/notifications/repositories/fakes/FakeNotificationRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import RedisCacheProvider from "@shared/container/providers/CacheProvider/Implementations/RedisCacheProvider";

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let createAppointment: CreateAppointmentService;
let cacheProvider: ICacheProvider;
describe("Create Appointment", () => {
  beforeEach(() => {
    fakeNotificationRepository = new FakeNotificationRepository();
    fakeAppointmentRepository = new FakeAppointmentRepository();
    cacheProvider = new RedisCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationRepository,
      cacheProvider
    );
  })

  it('should be able to create a new appointment', async () => {

    const date = new Date();
    date.setDate(date.getDate() + 1)

    const appointment = await createAppointment.execute({
      date: date,
      user_id: "user_id",
      provider_id: "123",
    })

    expect(appointment).toHaveProperty('id')

  })


  it('should be able to return an error in case of two appointments with the same date', async () => {

    let dateAppointment = new Date();
    dateAppointment.setHours(dateAppointment.getHours() + 1)

    await createAppointment.execute({
      date: dateAppointment,
      provider_id: "123",
      user_id: 'user_id'
    });

    await expect(createAppointment.execute({
      date: dateAppointment,
      provider_id: "1234",
      user_id: 'user_id'
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to two appointments with the same user and provider user', async () => {

    const date = new Date();
    date.setHours(date.getHours() + 1)

    await expect(createAppointment.execute({
      date,
      provider_id: "user_id",
      user_id: 'user_id'

    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments before 8am', async () => {

    const date = new Date();
    date.setHours(4);

    console.log(date)

    await expect(createAppointment.execute({
      date,
      provider_id: "provider_id",
      user_id: 'user_id'

    }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create an appointments after 17pm', async () => {
    const date = new Date();
    date.setHours(21);

    console.log('should not be able to create an appointments after 17pm')

    await expect(createAppointment.execute({
      date,
      provider_id: "provider_id",
      user_id: 'user_id'

    }),
    ).rejects.toBeInstanceOf(AppError);
  })
});
