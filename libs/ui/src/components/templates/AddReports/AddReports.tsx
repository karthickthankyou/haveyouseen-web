import { IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { useMap } from 'react-map-gl'

import {
  ReportType,
  namedOperations,
  useCreateReportsMutation,
} from '@haveyouseen-org/network/src/generated'

import { Button } from '../../atoms/Button'
import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import HtmlSelect from '../../atoms/HtmlSelect'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import { AudioRecord } from '../../molecules/AudioRecord'
import { DisplayLocation } from '../AddNewCase/AddNewCase'
import { useAppSelector } from '@haveyouseen-org/store'
import { selectUid } from '@haveyouseen-org/store/user'
import { notification$ } from '@haveyouseen-org/util/subjects'
import { makeId } from '@haveyouseen-org/util'
import { FormTypeAddNewReports } from '@haveyouseen-org/forms/src/addNewReports'

export const AddReports = () => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    handleSubmit,
    reset,
    resetField,
  } = useFormContext<FormTypeAddNewReports>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reports',
  })

  const formReports = useWatch({
    control,
    name: 'reports',
    defaultValue: [],
  })

  const { current: mapNewReport } = useMap()

  const [createReportsMutation, { loading }] = useCreateReportsMutation()
  const uid = useAppSelector(selectUid)
  return (
    <Form
      className="p-2 space-y-6"
      onSubmit={handleSubmit(async (data) => {
        const { data: savedData } = await createReportsMutation({
          variables: {
            caseId: +data.caseId,
            createReportsInput: data.reports.map(
              ({
                audio,
                description,
                lat,
                lng,
                time,
                type,
                address,
                images,
              }) => ({
                witnessId: uid,
                location: {
                  latitude: lat,
                  longitude: lng,
                  address: address || '',
                },
                audio,
                description,
                time,
                type,
                images: images || [],
              }),
            ),
          },
          awaitRefetchQueries: true,
          refetchQueries: [namedOperations.Query.case],
        })
        if (savedData) {
          notification$.next({
            message: 'Reports submitted successfully. It is pending approval.',
            type: 'success',
          })

          resetField('reports')
        }
      })}
    >
      {fields.map((field, index) => (
        <div key={field.id} className="p-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>Report #{index + 1}</div>
            <Button
              variant="text"
              size="none"
              color="error"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
          <HtmlLabel title="Time">
            <HtmlInput
              step="any"
              type="datetime-local"
              {...register(`reports.${index}.time`)}
            />
          </HtmlLabel>
          <HtmlLabel title="Address" optional>
            <HtmlInput {...register(`reports.${index}.address`)} />
          </HtmlLabel>
          <HtmlLabel title="Voice" optional>
            <AudioRecord
              setAudio={(url) => setValue(`reports.${index}.audio`, url)}
            />
          </HtmlLabel>
          <HtmlLabel title="Type">
            <HtmlSelect {...register(`reports.${index}.type`)}>
              <option defaultChecked value={ReportType.Sighting}>
                Sighting
              </option>
              <option defaultChecked value={ReportType.Lead}>
                Lead
              </option>
              <option defaultChecked value={ReportType.GeneralInformation}>
                General Information
              </option>
            </HtmlSelect>
          </HtmlLabel>
          <HtmlLabel
            title="Description"
            error={
              errors.reports && errors?.reports[index]?.description?.message
            }
          >
            <HtmlTextArea {...register(`reports.${index}.description`)} />
          </HtmlLabel>
          <DisplayLocation
            lat={formReports[index]?.lat}
            lng={formReports[index]?.lng}
          />
          <div className="flex justify-between mt-1">
            <Button
              variant="text"
              size="none"
              onClick={() =>
                mapNewReport?.flyTo({
                  center: [formReports[index].lng, formReports[index].lat],
                })
              }
            >
              Go to location
            </Button>
          </div>
        </div>
      ))}
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          const time = new Date().toISOString().split('.')[0]
          append({
            localId: makeId(),
            lat: mapNewReport?.getCenter().lat || 0,
            lng: mapNewReport?.getCenter().lng || 0,
            description: '',
            type: ReportType.Sighting,
            time: time,
            audio: null,
          })
        }}
      >
        Add report <IconPlus className="inline" />
      </Button>
      {formReports.length ? (
        <Button isLoading={loading} fullWidth type="submit">
          Submit
        </Button>
      ) : null}
    </Form>
  )
}
