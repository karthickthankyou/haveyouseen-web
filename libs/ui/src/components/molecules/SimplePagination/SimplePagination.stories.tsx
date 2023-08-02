import type { Meta, StoryObj } from '@storybook/react'
import { SimplePagination } from './SimplePagination'
import { useTakeSkip } from '@haveyouseen-org/util'

const meta: Meta<typeof SimplePagination> = {
  component: SimplePagination,
}
export default meta

type Story = StoryObj<typeof SimplePagination>
const arr = Array.from(Array(100 + 1).keys()).slice(1)

export const FirstPage: Story = {
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip()
    const result = arr.slice(skip, skip + take)

    return (
      <div>
        <div className="grid grid-cols-6">
          {result.map((num) => {
            return <div>{num}</div>
          })}
        </div>
        <SimplePagination
          resultCount={result.length}
          setSkip={setSkip}
          setTake={setTake}
          skip={skip}
          take={take}
        />
      </div>
    )
  },
  args: {},
}

export const MiddlePage: Story = {
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip(50)
    const result = arr.slice(skip, skip + take)

    return (
      <div>
        <div className="grid grid-cols-6">
          {result.map((num) => {
            return <div>{num}</div>
          })}
        </div>
        <SimplePagination
          resultCount={result.length}
          setSkip={setSkip}
          setTake={setTake}
          skip={skip}
          take={take}
        />
      </div>
    )
  },
  args: {},
}

export const FinalPage: Story = {
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip(96)
    const result = arr.slice(skip, skip + take)

    return (
      <div>
        <div className="grid grid-cols-6">
          {result.map((num) => {
            return <div>{num}</div>
          })}
        </div>
        <SimplePagination
          resultCount={result.length}
          setSkip={setSkip}
          setTake={setTake}
          skip={skip}
          take={take}
        />
      </div>
    )
  },
  args: {},
}
