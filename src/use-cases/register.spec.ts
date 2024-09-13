import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

describe('Register Use Case', () => {
    it('should be able to register', async() =>  {
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Mario',
            email: 'mario@exemplo.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user passwword upon registration', async() =>  {
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Mario',
            email: 'mario@exemplo.com',
            password: '123456'
        })

        const isPasswordCorrectyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async() =>  {
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'mario@exemplo.com'

        await registerUseCase.execute({
            name: 'Mario',
            email,
            password: '123456'
        })

        await expect(() =>
            registerUseCase.execute({
                name: 'Mario',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
      
    })
})