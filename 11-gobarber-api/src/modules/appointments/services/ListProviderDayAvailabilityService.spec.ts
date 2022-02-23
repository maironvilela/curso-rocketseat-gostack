import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderDayAvalilabilityService from "./ListProviderDayAvailabilityService";
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";


let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailabilityService: ListProviderDayAvalilabilityService;

describe("ProviderDayAvailability", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvalilabilityService(fakeAppointmentRepository);
  })

  it('should be able to list available days', async () => {

    const day = 22;
    const month = 2;
    const year = 2021;

    //sobrescreve a função "now" do objeto Date
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(year, month, day, 12).getTime();
    });

    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 22, 15, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: '123',
      user_id: 'user_id',
      date: new Date(2021, 2, 22, 16, 0, 0)
    })



    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: '123',
      day,
      month,
      year
    })


    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: true },
        { hour: 14, available: true },
        { hour: 15, available: false },
        { hour: 16, available: false },
        { hour: 17, available: true }

      ])
    )
  })
})

