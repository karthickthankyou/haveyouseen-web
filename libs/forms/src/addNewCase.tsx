import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
})

export const contactSchema = z.object({
  number: z.string(),
})

export const addNewCaseFormSchema = z.object({
  status: z.nativeEnum(Status),
  displayName: z.string(),
  images: z.string().array(),
  description: z.string(),
  dob: z.string(),
  gender: z.nativeEnum(Gender),
  height: z.number(),
  weight: z.number(),
  reports: z.array(newReportFormSchema),
  contact: z.array(contactSchema).min(1),
})

export type FormTypeAddNewCase = z.infer<typeof addNewCaseFormSchema>

export const useFormAddNewCase = () =>
  useForm<FormTypeAddNewCase>({
    resolver: zodResolver(addNewCaseFormSchema),
  })
