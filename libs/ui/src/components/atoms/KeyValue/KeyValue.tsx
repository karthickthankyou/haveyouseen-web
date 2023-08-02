import { ReactNode } from 'react'

export const KeyValue = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <div className="text-black">
      <div className="font-semibold">{title}</div>
      <div className="text-sm">{children}</div>
    </div>
  )
}
