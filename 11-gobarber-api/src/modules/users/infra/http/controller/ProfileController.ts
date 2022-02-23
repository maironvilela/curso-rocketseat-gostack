import { Response, Request } from "express";
import { container, inject, injectable } from "tsyringe";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import ShowProfileService from "@modules/users/services/ShowProfileService";
import { classToClass } from "class-transformer";

class ProfileController {

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ id: userId })

    return response.status(200).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    console.log(request.user.id)
    const userId = request.user.id;

    const { name, email, password, old_password, password_confirmation } = request.body


    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute(
      {
        id: userId,
        name,
        email,
        password,
        old_password,
        password_confirmation
      })


    return response.status(200).json(classToClass(user));
  }
}


export default ProfileController
