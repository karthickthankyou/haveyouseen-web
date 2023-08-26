import {
  useInitialiseUser,
  useUserListener,
} from '@haveyouseen-org/hooks/src/user'
import { useNotification } from '@haveyouseen-org/hooks/src/notifications'
import { Role } from '@haveyouseen-org/types'

export interface IAppLevelListenersProps {
  role?: Role
}

export const AppLevelListeners = ({ role }: IAppLevelListenersProps) => {
  useUserListener()
  useInitialiseUser({ role })
  useNotification()

  return null
}
