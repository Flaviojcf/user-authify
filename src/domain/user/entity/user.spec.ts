import { ErrorConstants } from '../../utils/error-constants/erro.constants'
import User from './user'

describe('User unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const user = new User('', 'Flavio', 'Flavio@gmail.com', 'password')
    }).toThrow(ErrorConstants.user.id)
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const user = new User('123', '', 'Flavio@gmail.com', 'password')
    }).toThrow(ErrorConstants.user.name)
  })

  it('should throw error when email is empty', () => {
    expect(() => {
      const user = new User('123', 'Flavio', '', 'password')
    }).toThrow(ErrorConstants.user.email)
  })

  it('should throw error when password is empty', () => {
    expect(() => {
      const user = new User('123', 'Flavio', 'Flavio@gmail.com', '')
    }).toThrow(ErrorConstants.user.password)
  })
})
