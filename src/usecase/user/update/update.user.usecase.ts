import User from '../../../domain/user/entity/user'
import UserFactory from '../../../domain/user/factory/user.factory'
import type UserRepositoryInterface from '../../../infrastructure/database/postgres/prisma/user/repository/user.repository.interface'
import { type InputUpdateUserDTO, type OutputUpdateUserDTO } from './dto/update.user.dto'

export default class UpdateUserUseCase {
  private readonly _userRepository: UserRepositoryInterface

  constructor (userRepository: UserRepositoryInterface) {
    this._userRepository = userRepository
  }

  async execute (input: InputUpdateUserDTO): Promise<OutputUpdateUserDTO> {
    const user = new User(input.id, input.name, input.email, input.password, input.isRegistered, input.validationId)
    await this._userRepository.update(user)

    const outputUser: OutputUpdateUserDTO = {
      id: user.id,
      password: user.password,
      name: user.name,
      email: user.email,
      isRegistered: user.register,
      validationId: user.validationId
    }
    return outputUser
  }
}
