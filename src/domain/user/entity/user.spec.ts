import { ErrorConstants } from '../../../shared/utils/error-constants/error.constants'
import User from './user'

describe('User unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const user = new User('', 'Flavio', 'Flavio@gmail.com', 'password', null)
    }).toThrow(ErrorConstants.user.id)
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const user = new User('123', '', 'Flavio@gmail.com', 'password', null)
    }).toThrow(ErrorConstants.user.name)
  })

  it('should throw error when email is empty', () => {
    expect(() => {
      const user = new User('123', 'Flavio', '', 'password', null)
    }).toThrow(ErrorConstants.user.email)
  })

  it('should throw error when password is empty', () => {
    expect(() => {
      const user = new User('123', 'Flavio', 'Flavio@gmail.com', '', null)
    }).toThrow(ErrorConstants.user.password)
  })
})
