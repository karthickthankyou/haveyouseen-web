import { IconUser } from '@tabler/icons-react'
import { GradientText } from '../../molecules/GradientText'

export interface IBrandProps {
  type?: 'admin' | 'officer'
}

export const Brand = ({ type }: IBrandProps) => {
  return (
    <div className={`flex items-center gap-2 `}>
      <div className="h-full p-1 border border-black shadow-lg">
        <IconUser className="stroke-2" />
      </div>
      <div>
        <div className="flex gap-1">
          <div className="text-xl font-black">Have you seen?</div>
          <span className="text-xs">{type}</span>
        </div>
        <GradientText className="text-xs">Karthick Ragavendran</GradientText>
      </div>
    </div>
  )
}
