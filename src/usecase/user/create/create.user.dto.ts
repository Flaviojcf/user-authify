export interface InputCreateUserDTO {
  name: string
  email: string
  password: string
}

export interface OutputCreateUserDTO {
  name: string
  email: string
  isRegistered: Date
}
