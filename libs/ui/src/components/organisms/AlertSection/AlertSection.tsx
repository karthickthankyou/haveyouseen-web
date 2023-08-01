import { ReactNode } from 'react'

export interface IAlertSectionProps {
  title?: ReactNode
  children: ReactNode
}

export const AlertSection = ({ title, children }: IAlertSectionProps) => {
  return (
    <div>
      {title ? <div className="mb-1 text-lg font-semibold">{title}</div> : null}
      <div className="h-64 bg-gray-50">
        <div className="flex flex-col items-center justify-center h-full gap-4 font-light">
          {children}
        </div>
      </div>
    </div>
  )
}
