import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.oRG.create({
  data: {
    address: 'Rua Gabriel Ferreira',
    phone: '86999654617',
  },
})
