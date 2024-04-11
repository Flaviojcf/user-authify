import express, { type Request, type Response } from 'express'
import CreateUserUseCase from '../../../../usecase/user/create/create.user.usecase'
import UserRepository from '../../../../infrastructure/database/postgres/prisma/user/repository/user.repository'
import FindUserUseCase from '../../../../usecase/user/find/find.user.usecase'
import UpdateUserUseCase from '../../../../usecase/user/update/update.user.usecase'

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

userRoute.put('/confirm-email/:id', async (request: Request, response: Response) => {
  const findUserUseCase = new FindUserUseCase(new UserRepository())
  const updateUserUseCase = new UpdateUserUseCase(new UserRepository())

  try {
    const userId = request.params.id
    const token = request.query.token

    if (!token || typeof token !== 'string') {
      return response.status(400).send('Invalid Token')
    }

    const user = await findUserUseCase.execute(userId)

    if (user == null) {
      return response.status(404).send('User not found')
    }

    const outputUpdateUserDTO = await updateUserUseCase.execute({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isRegistered: new Date(),
      validationId: user.validationId
    })

    response.json(outputUpdateUserDTO)
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
})
