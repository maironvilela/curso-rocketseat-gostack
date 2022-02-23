import CreateUserService from "@modules/users/services/CreateUserService";
import { Request, Response } from "express";
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import ListUserService from "@modules/users/services/ListUserService";



export default class UsersController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }


  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute();

    return response.json(classToClass(users));

  }

}
