export interface IBrandProps {
  shortForm?: boolean
  className?: string
}

export const Brand = ({ shortForm = false, className }: IBrandProps) => {
  return (
    <div className={`grid place-items-center ${className}`}>
      <div className="text-xl text-transparent bg-clip-text bg-gradient-to-tr from-gray-300 to-black">
        {shortForm ? '?' : 'Have you seen?'}
      </div>
    </div>
  )
}
