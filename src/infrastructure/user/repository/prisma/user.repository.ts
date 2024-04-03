import type User from '../../../../domain/user/entity/user'
import UserFactory from '../../../../domain/user/factory/user.factory'
import type UserRepositoryInterface from '../../../../domain/user/interfaces/repository/user.repository.interface'
import { prisma } from '../../../database/prisma'

export default class UserRepository implements UserRepositoryInterface {
  async create (entity: User): Promise<void> {
    await prisma.user.create({
      data: {
        email: entity.email,
        is_registered: entity.register,
        name: entity.name,
        id: entity.id,
        password: entity.password
      }
    })
  }

  async find (id: string): Promise<User> {
    try {
      const findedUser = await prisma.user.findFirst({
        where: {
          id
        }
      })
      if (findedUser != null) {
        const user = UserFactory.create(id, findedUser.name, findedUser.email)
        return user
      }
    } catch (error) {
      throw new Error('User not found')
    }
  }

  async update (entity: User): Promise<void> {
    try {
      const findedUser = this.find(entity.id)
      if (findedUser != null) {
        await prisma.user.update({
          data: {
            email: entity.email,
            is_registered: entity.register,
            name: entity.name,
            id: entity.id,
            password: entity.password
          },
          where: {
            id: entity.id
          }
        })
      }
    } catch (error) {
      throw new Error('User not found')
    }
  }

  async findAll (): Promise<User[]> {
    const findedUserL = await prisma.user.findMany()

    const userL: User[] = findedUserL.map((userModel) => {
      return UserFactory.create(userModel.id, userModel.name, userModel.email)
    })

    return userL
  }
}
