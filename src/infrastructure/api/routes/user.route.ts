import express, { type Request, type Response } from 'express'
import CreateUserUseCase from '../../../usecase/user/create/create.user.usecase'
import UserRepository from '../../user/repository/prisma/user.repository'

export const userRoute = express.Router()
userRoute.post('/', async (request: Request, response: Response) => {
  const usecase = new CreateUserUseCase(new UserRepository())

  try {
    const { name, email, password } = request.body

    const inputCreateUserDTO = {
      name,
      email,
      password
    }

    const outputCreateUserDTO = await usecase.execute(inputCreateUserDTO)

    response.json(outputCreateUserDTO)
  } catch (err) {
    response.status(500).send(err)
  }
})
