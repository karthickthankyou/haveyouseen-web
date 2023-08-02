import React from 'react'
import { PlainButton } from '../../atoms/PlainButton'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { TAKE_COUNT } from '@haveyouseen-org/util'
export interface SimplePaginationProps {
  setSkip: React.Dispatch<React.SetStateAction<number>>
  setTake: React.Dispatch<React.SetStateAction<number>>
  skip: number
  take: number
  resultCount: number
}

export const SimplePagination: React.FC<SimplePaginationProps> = ({
  setSkip,
  setTake,
  skip,
  take,
  resultCount = 0,
}) => {
  const goToNextPage = () => {
    setSkip(skip + take)
  }

  const goToPreviousPage = () => {
    setSkip(Math.max(skip - take, 0))
  }

  const disableLeft = skip === 0
  const disableRight = resultCount < TAKE_COUNT

  return (
    <div className="flex gap-2 mt-4">
      <PlainButton
        onClick={goToPreviousPage}
        className="p-2"
        disabled={disableLeft}
      >
        <IconArrowLeft
          className={disableLeft ? 'text-gray-300' : 'text-black'}
        />
      </PlainButton>
      <PlainButton
        onClick={goToNextPage}
        className="p-2"
        disabled={disableRight}
      >
        <IconArrowRight
          className={disableRight ? 'text-gray-300' : 'text-black'}
        />
      </PlainButton>
    </div>
  )
}
