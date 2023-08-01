export interface IBrandProps {
  className?: string
  type?: 'admin' | 'officer'
}

export const Brand = ({ className, type }: IBrandProps) => {
  return (
    <div className={`grid place-items-center ${className}`}>
      <div className="text-xl text-transparent bg-clip-text bg-gradient-to-tr from-gray-300 to-black">
        Have you seen?
        <span className="text-xs">{type}</span>
      </div>{' '}
      <div className="text-xs text-gray">Karthick Ragavendran</div>
    </div>
  )
}
