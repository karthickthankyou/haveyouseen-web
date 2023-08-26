import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const deleteAll = async () => {
  await prisma.location.deleteMany()
  await prisma.approvedReport.deleteMany()
  await prisma.report.deleteMany()
  await prisma.case.deleteMany()
  await prisma.missingPerson.deleteMany()

  //   Users

  await prisma.officer.deleteMany()
  await prisma.witness.deleteMany()
}

const reset = async () => {
  await deleteAll()
}

const main = async () => {
  await reset()
}

main()
