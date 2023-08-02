import type { Meta, StoryObj } from '@storybook/react'
import { ImageUploadPreview } from './ImageUploadPreview'
import { Controller } from 'react-hook-form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useState } from 'react'

const meta: Meta<typeof ImageUploadPreview> = {
  component: ImageUploadPreview,
}
export default meta

type Story = StoryObj<typeof ImageUploadPreview>

export const Primary: Story = {
  render: (args) => {
    const [image, setImage] = useState<Blob | MediaSource | undefined>()
    return (
      <ImageUploadPreview src={image} clearImage={() => setImage(undefined)}>
        <HtmlInput
          type="file"
          accept="image/*"
          multiple={false}
          onChange={(e) => setImage(e?.target?.files?.[0])}
        />
      </ImageUploadPreview>
    )
  },
}
