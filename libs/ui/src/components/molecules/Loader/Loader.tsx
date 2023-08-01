import { IconLoader } from '@tabler/icons-react'

export const Loader = () => <IconLoader className="animate-spin" />
export const LoaderPanel = () => (
  <td className="flex items-center justify-center h-40">
    <IconLoader className="animate-spin" />
  </td>
)
