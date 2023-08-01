#!/usr/bin/env ts-node

import { join } from 'path'
import {
  createEntityFile,
  createInputDtoFile,
  createModuleFile,
  createResolverFile,
  createServiceFile,
  findInputDtoFile,
  orderByInputDtoFile,
  updateInputDtoFile,
  whereInputDtoFile,
} from './templates'
import { createComponentNames } from './util'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const [componentName] = process.argv.slice(2, 3)
console.log('Generating files...', componentName)

if (!componentName) {
  console.error(`

    Please provide a component name


    `)
  process.exit(1)
}

const names = createComponentNames(componentName)

// process.exit(0);

const { kebabPlural, kebab } = names
const targetDir = join(process.cwd(), 'src/models', kebabPlural)

fs.mkdirSync(`${process.cwd()}/src/models/${kebabPlural}`)
fs.mkdirSync(`${process.cwd()}/src/models/${kebabPlural}/dto`)
fs.mkdirSync(`${process.cwd()}/src/models/${kebabPlural}/entities`)

fs.writeFileSync(
  `${targetDir}/${kebabPlural}.module.ts`,
  createModuleFile(names),
)
fs.writeFileSync(
  `${targetDir}/${kebabPlural}.resolver.ts`,
  createResolverFile(names),
)
fs.writeFileSync(
  `${targetDir}/${kebabPlural}.service.ts`,
  createServiceFile(names),
)
fs.writeFileSync(
  `${targetDir}/dto/create-${kebab}.input.ts`,
  createInputDtoFile(names),
)
fs.writeFileSync(
  `${targetDir}/dto/update-${kebab}.input.ts`,
  updateInputDtoFile(names),
)
fs.writeFileSync(`${targetDir}/dto/find.args.ts`, findInputDtoFile(names))
fs.writeFileSync(`${targetDir}/dto/orderBy.args.ts`, orderByInputDtoFile(names))
fs.writeFileSync(`${targetDir}/dto/where.args.ts`, whereInputDtoFile(names))
fs.writeFileSync(
  `${targetDir}/entities/${kebab}.entity.ts`,
  createEntityFile(names),
)
console.log(`

Success.

Your files are ready.
${targetDir}

`)
