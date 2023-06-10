import { prisma } from '@/lib/prisma'
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

  await prisma.oRG.create({
    data: {
      address,
      whatsApp,
      CEP,
      email,
      name,
      password,
    },
  })

  return reply.status(201).send()
}
