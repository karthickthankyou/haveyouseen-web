import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const CreateOfficerFormSchema = z.object({
  name: z.string(),
})

export type FormTypeCreateOfficer = z.infer<typeof CreateOfficerFormSchema>

export const useFormCreateOfficer = () =>
  useForm<FormTypeCreateOfficer>({
    resolver: zodResolver(CreateOfficerFormSchema),
  })
