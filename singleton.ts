import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from './client'
import { Prisma, PrismaClient } from './generated/prisma'

type n = Prisma.CRTCreateInput
jest.mock('./client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>