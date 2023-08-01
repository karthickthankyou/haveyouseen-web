import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const CreateWitnessFormSchema = z.object({
  name: z.string(),
})

export type FormTypeCreateWitness = z.infer<typeof CreateWitnessFormSchema>

export const useFormCreateWitness = () =>
  useForm<FormTypeCreateWitness>({
    resolver: zodResolver(CreateWitnessFormSchema),
  })
