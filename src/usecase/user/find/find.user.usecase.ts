import type UserRepositoryInterface from '../../../infrastructure/database/postgres/prisma/user/repository/user.repository.interface'
import { type OutputFindUserDTO } from './dto/find.user.dto'

export default class FindUserUseCase {
  private readonly _userRepository: UserRepositoryInterface

  constructor (userRepository: UserRepositoryInterface) {
    this._userRepository = userRepository
  }

  async execute (input: string): Promise<OutputFindUserDTO> {
    const user = await this._userRepository.find(input)

    const outputUser: OutputFindUserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isRegistered: user.register,
      validationId: user.validationId
    }

    return outputUser
  }
}
