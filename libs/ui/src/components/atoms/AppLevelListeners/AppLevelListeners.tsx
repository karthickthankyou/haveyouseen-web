import { useUserListener } from '@haveyouseen-org/hooks/src/user'
import { useNotification } from '@haveyouseen-org/hooks/src/notifications'

export interface IAppLevelListenersProps {}

export const AppLevelListeners = () => {
  useUserListener()
  useNotification()

  return null
}
