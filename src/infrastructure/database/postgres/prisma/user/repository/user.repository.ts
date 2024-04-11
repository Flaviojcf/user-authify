import User from '../../../../../../domain/user/entity/user'
import UserFactory from '../../../../../../domain/user/factory/user.factory'
import type UserRepositoryInterface from './user.repository.interface'
import { prisma } from '../../prisma'

export default class UserRepository implements UserRepositoryInterface {
  async create (entity: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
        is_registered: entity.register
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
        const user = new User(findedUser.id, findedUser.name, findedUser.email, findedUser.password, findedUser.is_registered, findedUser.validation_id)
        return user
      }
    } catch (error) {
      throw new Error('User not found')
    }
  }

  async update (entity: User): Promise<void> {
    console.log(entity)
    try {
      await prisma.user.update({
        data: {
          id: entity.id,
          name: entity.name,
          email: entity.email,
          password: entity.password,
          is_registered: entity.register,
          validation_id: entity.validationId
        },
        where: {
          id: entity.id
        }
      })
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

  async delete (id: string): Promise<void> {
    try {
      const findedUser = this.find(id)
      if (findedUser != null) {
        await prisma.user.delete({
          where: {
            id
          }
        })
      }
    } catch (error) {
      throw new Error('User not found')
    }
  }
}
