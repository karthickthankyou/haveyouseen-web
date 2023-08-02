import type { Meta, StoryObj } from '@storybook/react'
import { ShowData } from './ShowData'
import { useTakeSkip } from '@haveyouseen-org/util'

const meta: Meta<typeof ShowData> = {
  component: ShowData,
}
export default meta

type Story = StoryObj<typeof ShowData>

const arr = Array.from(Array(100 + 1).keys()).slice(1)

export const Primary: Story = {
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip()
    const result = arr.slice(skip, take + skip)

    return (
      <ShowData
        loading={false}
        pagination={{
          setSkip,
          setTake,
          skip,
          take,
          resultCount: result.length,
          totalCount: arr.length,
        }}
      >
        {result.map((num) => (
          <div>{num}</div>
        ))}
      </ShowData>
    )
  },
}

export const Loading: Story = {
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip()
    const result = arr.slice(skip, take + skip)

    return (
      <ShowData
        loading={true}
        pagination={{
          setSkip,
          setTake,
          skip,
          take,
          resultCount: result.length,
          totalCount: arr.length,
        }}
      >
        {result.map((num) => (
          <div>{num}</div>
        ))}
      </ShowData>
    )
  },
}

export const Error: Story = {
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip()
    const result = arr.slice(skip, take + skip)

    return (
      <ShowData
        loading={false}
        error="this and that went wrong."
        pagination={{
          setSkip,
          setTake,
          skip,
          take,
          resultCount: result.length,
          totalCount: arr.length,
        }}
      >
        {result.map((num) => (
          <div>{num}</div>
        ))}
      </ShowData>
    )
  },
}

export const CustomArrangement: Story = {
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip()
    const result = arr.slice(skip, take + skip)

    return (
      <ShowData
        className="grid grid-cols-6 gap-5"
        loading={false}
        pagination={{
          setSkip,
          setTake,
          skip,
          take,
          resultCount: result.length,
          totalCount: arr.length,
        }}
      >
        {result.map((num) => (
          <div>{num}</div>
        ))}
      </ShowData>
    )
  },
}
