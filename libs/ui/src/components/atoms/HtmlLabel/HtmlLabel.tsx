import React, { HTMLProps } from 'react'
import { FormError } from '../FormError'

export type HtmlLabelProps = HTMLProps<HTMLLabelElement> & {
  error?: string | undefined
  optional?: boolean
  units?: string
}

// Link: https://www.youtube.com/watch?v=z4MQROCqIZc

export const HtmlLabel = React.forwardRef<HTMLLabelElement, HtmlLabelProps>(
  ({ children, title, optional, units, error, className }, ref) => (
    <label ref={ref} className={` text-sm select-none ${className}`}>
      <div className="flex items-baseline justify-between">
        <div className="mb-1 font-semibold capitalize">
          {title}{' '}
          <span className="text-xs font-normal text-gray-600 ">
            {units ? `(${units})` : null}
          </span>
        </div>

        <div className="flex gap-2 text-xs text-gray-600">
          <div>{optional ? '(optional)' : null}</div>
        </div>
      </div>
      {children}
      <FormError error={error} />
    </label>
  ),
)

HtmlLabel.displayName = 'HtmlLabel'
