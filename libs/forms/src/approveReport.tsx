import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const formSchemaApproveReport = z.object({
  description: z.string().optional(),
})

export type FormTypeApproveReport = z.infer<typeof formSchemaApproveReport>

export const useFormApproveReport = () =>
  useForm<FormTypeApproveReport>({
    resolver: zodResolver(formSchemaApproveReport),
  })
