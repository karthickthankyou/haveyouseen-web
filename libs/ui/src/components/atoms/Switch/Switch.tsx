import { Switch as HUISwitch } from '@headlessui/react'
import { ReactNode } from 'react'

export interface Switch2Props {
  label: ReactNode
  children?: ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export const Switch = ({
  label,
  children,
  checked,
  onChange,
  className,
}: Switch2Props) => {
  return (
    <HUISwitch.Group>
      <div className={`flex items-center ${className}`}>
        <HUISwitch.Label className="mr-2 font-medium">{label}</HUISwitch.Label>
        <HUISwitch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? 'bg-black' : 'bg-gray-200'
          } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
          >
            {children}
          </span>
        </HUISwitch>
      </div>
    </HUISwitch.Group>
  )
}
