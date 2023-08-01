// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluralize = require('pluralize')
import * as changeCase from 'change-case'

export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1)

export type Names = {
  capital: string
  capitalPlural: string
  kebab: string
  kebabPlural: string
  camel: string
  camelPlural: string
}

export const createComponentNames = (name: string) => {
  const capital = changeCase.capitalCase(name).split(' ').join('')
  const camel = changeCase.camelCase(name)
  const kebab = changeCase.paramCase(name)

  const names: Names = {
    capital,
    capitalPlural: pluralize(capital),
    kebab,
    kebabPlural: pluralize(kebab),
    camel,
    camelPlural: pluralize(camel),
  }

  return names
}
