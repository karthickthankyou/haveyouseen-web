import { IconTrash } from '@tabler/icons-react'
import { PlainButton } from '../../atoms/PlainButton'
import { ReactNode } from 'react'
import Image from 'next/image'

export interface IImageUploadProps {
  src?: Blob | MediaSource
  clearImage: () => void
  children: ReactNode
}

export const ImageUploadPreview = ({
  src,
  clearImage,
  children,
}: IImageUploadProps) => {
  if (src) {
    return (
      <div className="relative flex items-center justify-center w-full max-w-sm bg-transparent shadow-lg aspect-square">
        <PlainButton
          className="z-10 flex items-center gap-1 p-2 text-white underline underline-offset-4 bg-black/30"
          onClick={clearImage}
        >
          <IconTrash /> Clear
        </PlainButton>
        <Image
          width={300}
          height={300}
          className="absolute object-cover aspect-square"
          alt=""
          src={URL.createObjectURL(src)}
          onError={(e) => {
            console.error('Image failed to load', e)
          }}
        />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-full max-w-sm bg-gray-100 aspect-square">
      {children}
    </div>
  )
}
