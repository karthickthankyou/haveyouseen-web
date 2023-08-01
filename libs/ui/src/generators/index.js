#!/usr/bin/env ts-node

import chalk from 'chalk'
import fs from 'fs'
import { component, story, barrel } from './templates.js'

// grab component componentName from terminal argument
const [componentPath] = process.argv.slice(2, 3)

// Terminate if the component path is missing
if (!componentPath) {
  console.clear()
  console.log(chalk.red(`You must include a component name!`))
  console.log()
  console.log(
    chalk.hex('#aaa')(`Example: `),
    chalk.white(`npx rsb-gen src/components/atoms/Card01`),
  )

  console.log(chalk.hex('#777')(`Mention the path from the project root.`))
  console.log()
  process.exit(0)
}

const parentDir = componentPath.split('/').slice(0, -1).join('/') || '/'
const componentName = componentPath.split('/').slice(-1)

// Terminate if the parent directory does not exist.
if (!fs.existsSync(parentDir)) {
  console.log(
    chalk.red(`
  Parent directory ${parentDir} does not exist.
  `),
  )
  process.exit(0)
}

// Terminate if the component already exists.
if (fs.existsSync(componentPath)) {
  console.log(
    chalk.red(`
  Component directory ${componentPath} already exists.
  `),
  )
  process.exit(0)
}

// 1. create the folder
fs.mkdirSync(componentPath)

function writeFileErrorHandler(err) {
  if (err) throw err
}

// component.tsx
fs.writeFile(
  `${componentPath}/${componentName}.tsx`,
  component(componentName),
  writeFileErrorHandler,
)
// storybook.tsx
fs.writeFile(
  `${componentPath}/${componentName}.stories.tsx`,
  story(componentName, componentPath),
  writeFileErrorHandler,
)
// index.ts
fs.writeFile(
  `${componentPath}/index.tsx`,
  barrel(componentName),
  writeFileErrorHandler,
)

console.log(
  chalk.green(`
  Success! The component ${chalk.white(componentName)} is created.
  Path: ${componentPath}
  `),
)
