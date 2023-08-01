// component.tsx
export const component = (
  componentName,
) => `export interface I${componentName}Props {}

export const ${componentName} = ({}: I${componentName}Props) => {
  return <div>Hello, This is ${componentName} component!</div>
}
`

// component.stories.tsx
export const story = (
  componentName,
) => `import type { Meta, StoryObj } from '@storybook/react'
import { ${componentName} } from './${componentName}'

const meta: Meta<typeof ${componentName}> = {
  component: ${componentName},
}
export default meta


type Story = StoryObj<typeof ${componentName}>

export const Primary: Story = {}
`

export const barrel = (componentName) =>
  `export { ${componentName} } from './${componentName}'`
