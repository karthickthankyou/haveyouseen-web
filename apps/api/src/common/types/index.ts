export type Role = 'admin' | 'officer'

export type GetUserType = {
  uid: string
  displayName: string
  email: string
  emailVerified: boolean
  phoneNumber: string
  roles: Role[]
}

export type TotalPrice = {
  parkingCharge: number
  valetChargeDropoff: number
  valetChargePickup: number
  servicesCharge: number
}
