import User from '../entity/user'
import { v4 as uuid } from 'uuid'

export default class UserFactory {
  public static create (name: string, email: string, password: string, isRegistered?: Date, validationId?: string): User {
    return new User(uuid(), name, email, password, isRegistered ?? null, validationId ?? uuid())
  }
}
