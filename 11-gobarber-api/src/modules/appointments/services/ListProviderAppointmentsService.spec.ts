import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderDayAvalilabilityService from "./ListProviderDayAvailabilityService";
import ListProviderAppointmentsService from "./ListProviderAppointmentsService";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import RedisCacheProvider from "@shared/container/providers/CacheProvider/Implementations/RedisCacheProvider";


let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let cacheProvider: ICacheProvider;

describe("List Provider AppointmentsService", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    cacheProvider = new RedisCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      cacheProvider
    );
  })

  it('should be able to list appointment the an provider on a specific day ', async () => {

    const day = 22;
    const month = 2;
    const year = 2021;



    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2022, 2, 22, 10, 0, 0)
    })

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user_id',
      date: new Date(2022, 2, 22, 12, 0, 0)
    })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      day: 22,
      month: 2,
      year: 2022
    })

    console.log(appointments)

    expect(appointments).toEqual([
      appointment1,
      appointment2
    ])
  })

})


