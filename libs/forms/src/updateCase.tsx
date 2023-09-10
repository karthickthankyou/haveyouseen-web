import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Status } from '@haveyouseen-org/network/src/generated'

export const updateCaseFormSchema = z.object({
  status: z.nativeEnum(Status),
})

export type FormTypeUpdateCase = z.infer<typeof updateCaseFormSchema>

export const useFormUpdateCase = () =>
  useForm<FormTypeUpdateCase>({
    resolver: zodResolver(updateCaseFormSchema),
  })
