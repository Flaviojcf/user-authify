import User from '../entity/user'
import { v4 as uuid } from 'uuid'

export default class UserFactory {
  public static create (name: string, email: string, password: string): User {
    return new User(uuid(), name, email, password)
  }
}
