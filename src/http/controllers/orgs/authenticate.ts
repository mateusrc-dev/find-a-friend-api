import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  try {
    const { org } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({}, { sign: { sub: org.id } })

    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: org.id, expiresIn: '7d' } },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
