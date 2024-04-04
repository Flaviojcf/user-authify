import UserFactory from '../../../domain/user/factory/user.factory'
import type UserRepositoryInterface from '../../../domain/user/interfaces/repository/user.repository.interface'
import { type InputCreateUserDTO, type OutputCreateUserDTO } from './create.user.dto'

export default class CreateUserUseCase {
  private readonly _userRepository: UserRepositoryInterface

  constructor (userRepository: UserRepositoryInterface) {
    this._userRepository = userRepository
  }

  async execute (input: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    const user = UserFactory.create(input.name, input.email, input.password)

    await this._userRepository.create(user)

    const outputUser: OutputCreateUserDTO = {
      name: user.name,
      email: user.email,
      isRegistered: user.isRegistered()
    }

    return outputUser
  }
}
