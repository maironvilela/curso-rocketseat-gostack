import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from 'class-transformer';


export default class UserAvatarController {

  public async update(request: Request, response: Response): Promise<Response> {
    const avatarFileName = request.file.filename;
    const user_id = request.user.id;

    const updateServerAvaterService = container.resolve(UpdateUserAvatarService);
    const user = await updateServerAvaterService.execute({
      avatarFileName,
      user_id,
    });

    return response.json(classToClass(user));
  }
}


