import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepositor} from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error'

export async function register (request: FastifyRequest, repley: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const usersRepository = new PrismaUsersRepositor()
        const registerUseCase = new RegisterUseCase(usersRepository)

        await registerUseCase.execute({
            name,
            email, 
            password,
        })

    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return repley.status(489).send({ message: err.message})
        }

        return repley.status(500).send() // TODO: fix me 
    }

    return repley.status(201).send()
}