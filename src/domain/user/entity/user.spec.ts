import User from './user'

describe('User unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const user = new User('', 'John', 'John@gmail.com', 'password')
    }).toThrow('user: Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const user = new User('123', '', 'John@gmail.com', 'password')
    }).toThrow('user: Name is required')
  })

  it('should throw error when email is empty', () => {
    expect(() => {
      const user = new User('123', 'John', '', 'password')
    }).toThrow('user: Email is required')
  })

  it('should throw error when password is empty', () => {
    expect(() => {
      const user = new User('123', 'John', 'John@gmail.com', '')
    }).toThrow('user: Password is required')
  })
})
