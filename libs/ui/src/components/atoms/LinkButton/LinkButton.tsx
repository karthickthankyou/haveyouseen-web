import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

export const LinkButton = (
  props: LinkProps & { children: ReactNode; className?: string },
) => <Link className="px-4 py-2 text-white bg-black" {...props} />
