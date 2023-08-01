import {
  OfficerMeQuery,
  useOfficerMeQuery,
} from '@haveyouseen-org/network/src/generated'
import { LoaderPanel } from '../../molecules/Loader'
import { CreateOfficer } from '../../templates/Officer/Officer'
import { ReactNode } from 'react'

export interface IIsOfficerProps {
  children: ReactNode
}
type RenderPropChild = (cook: OfficerMeQuery['officerMe']) => ReactNode

export const IsOfficer = ({ children }: IIsOfficerProps) => {
  const { data, loading } = useOfficerMeQuery()
  if (loading) {
    return <LoaderPanel />
  }

  if (!data?.officerMe) {
    return <CreateOfficer />
  }
  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.officerMe)
        : children}
    </>
  )
}
