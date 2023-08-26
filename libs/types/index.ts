import { ReactNode } from 'react'
export type Role = 'admin' | 'officer' | 'witness'

export type MenuItem = { label: string; href: string; loggedIn: boolean }
export type GetUserType = {
  uid: string
  displayName: string
  email: string
  emailVerified: boolean
  phoneNumber: string
  roles: Role[]
}

export type NotificationType = {
  id: string
  message: ReactNode
  type?: 'success' | 'error' | 'info' | 'warning'
  position?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
  duration?: number
}

export type LatLng = {
  lat: number
  lng: number
}

export type SimpleBound = {
  nw_lat: number
  nw_lng: number
  se_lat: number
  se_lng: number
}

export type MapPanelTypes = {
  children?: ReactNode
  className?: string
  position?:
    | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'center-bottom'
    | 'right-bottom'
    | 'right-center'
    | 'right-top'
    | 'center-top'
    | 'center-center'
}

export type Viewport = {
  latitude: number
  longitude: number
  zoom: number
}

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType[number]

export type TotalPrice = {
  parkingCharge: number
  valetChargeDropoff: number
  valetChargePickup: number
  servicesCharge: number
}
