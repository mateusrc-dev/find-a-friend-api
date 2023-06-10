import { orgCreateUseCase } from '@/services/orgCreate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const orgDetailsSchema = z.object({
    address: z.string(),
    whatsApp: z.string(),
    CEP: z.string(),
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  })

  const { CEP, address, email, name, password, whatsApp } =
    orgDetailsSchema.parse(request.body)

  try {
    await orgCreateUseCase({ CEP, address, email, name, password, whatsApp })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
