import { useAppSelector } from '@haveyouseen-org/store'
import { selectUser } from '@haveyouseen-org/store/user'
import { IconUserCircle } from '@tabler/icons-react'

export interface IShowUserDisplayNameProps {}

export const ShowUserDisplayName = ({}: IShowUserDisplayNameProps) => {
  const user = useAppSelector(selectUser)

  return (
    <div className="flex items-center gap-2">
      <IconUserCircle className="w-6 h-6" />
      <div>
        <div className="text-xl">{user?.displayName}</div>
        <div className="text-sm text-gray">{user?.email}</div>
      </div>
    </div>
  )
}
