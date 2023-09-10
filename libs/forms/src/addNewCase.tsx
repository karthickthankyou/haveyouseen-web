import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Gender,
  ReportType,
  Status,
} from '@haveyouseen-org/network/src/generated'

export const newReportFormSchema = z.object({
  localId: z.string(),
  time: z.string(),
  description: z.string().min(1, 'Description is required.'),
  lat: z.number(),
  lng: z.number(),
  address: z.string().optional(),
  type: z.nativeEnum(ReportType),
  audio: z.string().nullable(),
  images: z.any().optional(),
  showPublic: z.boolean().optional(),
  officerDescription: z.string().optional(),
})

export const contactSchema = z.object({
  number: z.string(),
})

export const addNewCaseFormSchema = z.object({
  status: z.nativeEnum(Status),
  displayName: z.string(),
  images: z.any().optional(),
  description: z.string(),
  dob: z.string(),
  gender: z.nativeEnum(Gender),
  height: z.number(),
  weight: z.number(),
  reports: z.array(newReportFormSchema).min(1),
  contact: z.array(contactSchema).min(1),
})

export type FormTypeAddNewCase = z.infer<typeof addNewCaseFormSchema>

export const useFormAddNewCase = () =>
  useForm<FormTypeAddNewCase>({
    resolver: zodResolver(addNewCaseFormSchema),
  })

export const FormProviderAddNewCase = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormAddNewCase()

  return <FormProvider {...methods}>{children}</FormProvider>
}
