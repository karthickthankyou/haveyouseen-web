import { Dialog as HeadlessUIDialog, Transition } from '@headlessui/react'
import { IconX } from '@tabler/icons-react'
import { Dispatch, Fragment, ReactNode, SetStateAction, useState } from 'react'

interface IMyDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  title: string
  className?: string
  widthClassName?: string
}

export const Dialog = ({
  open,
  setOpen,
  children,
  title,
  className,
  widthClassName = 'max-w-md',
}: IMyDialogProps) => {
  function closeModal() {
    setOpen(false)
  }

  function openModal() {
    setOpen(true)
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessUIDialog
        as="div"
        className="relative z-10 rounded"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessUIDialog.Panel
                className={`w-full  p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl ${widthClassName}`}
              >
                <button
                  type="button"
                  className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 hover:bg-black/10"
                  onClick={() => setOpen(false)}
                >
                  <IconX className="text-gray-600" />
                </button>
                <HeadlessUIDialog.Title
                  as="h3"
                  className="mb-4 text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </HeadlessUIDialog.Title>
                {children}
              </HeadlessUIDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessUIDialog>
    </Transition>
  )
}
