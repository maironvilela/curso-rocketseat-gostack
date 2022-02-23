import "reflect-metadata"
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '../services/ListProviderMonthAvailabilityService'

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe("ProviderMonthAvailability", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentRepository);
  })

  it('should be able to list provider', async () => {

    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 8, 0, 0)
    })


    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 9, 0, 0)
    })


    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 10, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 11, 0, 0)
    })


    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 12, 0, 0)
    })


    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 13, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 14, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 15, 0, 0)
    })


    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 16, 0, 0)
    })


    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 21, 17, 0, 0)
    })


    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 22, 8, 0, 0)
    })

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: '123',
      month: 3,
      year: 2021
    })



    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: true },
        { day: 2, available: true },
        { day: 3, available: true },
        { day: 4, available: true },
        { day: 5, available: true },
        { day: 6, available: true },
        { day: 7, available: true },
        { day: 8, available: true },
        { day: 9, available: true },
        { day: 10, available: true },
        { day: 11, available: true },
        { day: 12, available: true },
        { day: 13, available: true },
        { day: 14, available: true },
        { day: 15, available: true },
        { day: 16, available: true },
        { day: 17, available: true },
        { day: 18, available: true },
        { day: 19, available: true },
        { day: 20, available: true },
        { day: 21, available: false },
        { day: 22, available: true },
        { day: 23, available: true },
        { day: 24, available: true },
        { day: 25, available: true },
        { day: 26, available: true },
        { day: 27, available: true },
        { day: 28, available: true },
        { day: 29, available: true },
        { day: 30, available: true },
        { day: 31, available: true }

      ])
    )

  })





});
