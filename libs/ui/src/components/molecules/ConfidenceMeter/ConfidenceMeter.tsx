export interface IConfidenceMeterProps {
  confidence: number
}

export const ConfidenceMeter = ({ confidence = 0 }: IConfidenceMeterProps) => {
  return (
    <div className="flex gap-1">
      {Array.from(Array(10).keys()).map((i) => (
        <div
          key={i}
          className={`w-3 h-1 ${
            i < confidence ? 'bg-blue-500' : 'bg-gray-100'
          }`}
        />
      ))}
    </div>
  )
}
