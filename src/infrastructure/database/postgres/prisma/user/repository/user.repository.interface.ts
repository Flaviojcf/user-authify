import type RepositoryInterface from '../../interfaces/repository/repository.interface'
import type User from '../../../../../../domain/user/entity/user'

export default interface UserRepositoryInterface extends RepositoryInterface<User> {}
