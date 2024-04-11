import UserFactory from '../../../domain/user/factory/user.factory'
import type UserRepositoryInterface from '../../../infrastructure/database/postgres/prisma/user/repository/user.repository.interface'
import { type InputCreateUserDTO, type OutputCreateUserDTO } from './dto/create.user.dto'
import nodemailer from 'nodemailer'
export default class CreateUserUseCase {
  private readonly _userRepository: UserRepositoryInterface

  constructor (userRepository: UserRepositoryInterface) {
    this._userRepository = userRepository
  }

  async execute (input: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    const user = UserFactory.create(input.name, input.email, input.password)

    await this._userRepository.create(user)

    const transpoder = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Confirme seu email clicando no link abaixo',
      text: `Para confirmar seu e-mail, clique no link: http://localhost:3000/user/confirm-email/${user.id}?token=${user.validationId}`
    }

    transpoder.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(info)
      }
    })

    const outputUser: OutputCreateUserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      isRegistered: user.isRegistered(),
      validationId: user.validationId
    }

    return outputUser
  }
}
