import { AnimatePresence, motion } from 'framer-motion'

import { useAppSelector } from '@haveyouseen-org/store'
import { NotificationType } from '@haveyouseen-org/types'

export const Notifications = () => {
  const notifications = useAppSelector((state) => state.utils.notifications)

  const getTextColor = (type: NotificationType['type']) => {
    switch (type) {
      case 'success':
        return ' text-green-800 bg-green-100/30'
      case 'error':
        return ' text-red-800 bg-red-100/30'
      case 'warning':
        return ' text-yellow-800 bg-yellow-100/30'
      case 'info':
        return ' text-primary-800 bg-primary-100/30'
      default:
        return ' text-black bg-white/30 '
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed bottom-0 z-10 flex flex-col items-center w-full p-2 space-y-3">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, transform: 'translateY(50%)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(50%)' }}
            className={`flex items-center backdrop-blur justify-center shadow-xl border-2 border-white w-full max-w-sm p-2 ${getTextColor(
              notification.type,
            )}`}
          >
            {notification.message}
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}
