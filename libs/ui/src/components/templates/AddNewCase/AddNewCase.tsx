import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { LngLatBounds, Popup, useMap } from 'react-map-gl'
import {
  FormTypeAddNewCase,
  useFormAddNewCase,
} from '@haveyouseen-org/forms/src/addNewCase'
import {
  Gender,
  ReportType,
  Status,
  useCreateCaseMutation,
} from '@haveyouseen-org/network/src/generated'
import { Button } from '../../atoms/Button'
import { Container } from '../../atoms/Container'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import HtmlSelect from '../../atoms/HtmlSelect'
import { ProgressBar } from '../../atoms/ProgressBar'
import { Map } from '../../organisms/Map'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import { useFieldArray, UseFormSetValue } from 'react-hook-form'
import { Form } from '../../atoms/Form'
import {
  IconBulb,
  IconInfoSquare,
  IconPin,
  IconPinned,
  IconPlus,
  IconTextPlus,
  IconTrash,
} from '@tabler/icons-react'
import { Marker } from '../../organisms/Map/MapMarker'

import { PopupContent } from '../Home/Home'
import { MapLines } from '../../molecules/MapLines'

import { format } from 'date-fns'
import { AudioRecord } from '../../molecules/AudioRecord'

import { useRouter } from 'next/navigation'
import { dividerClasses } from '@mui/material'
import { storage } from '@haveyouseen-org/network/src/config/firebase'
import { notification$ } from '@haveyouseen-org/util/subjects'
import { useAppSelector } from '@haveyouseen-org/store'
import { selectUser } from '@haveyouseen-org/store/user'
import { makeId } from '@haveyouseen-org/util'
import { TitleValue } from '../../atoms/TitleValue'

export interface IAddNewCaseProps {}

export const AddNewCase = ({}: IAddNewCaseProps) => {
  const [bounds, setBounds] = useState<LngLatBounds>()

  const [images, setImages] = useState<string[]>([])
  const [percent, setPercent] = useState(0)

  const {
    register,
    formState: { errors },
    control,
    setValue,
    watch,
    handleSubmit,
  } = useFormAddNewCase()

  const { mymap } = useMap()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reports',
  })
  const {
    fields: fieldsContact,
    append: appendContactField,
    remove: removeContactField,
  } = useFieldArray({
    control,
    name: 'contact',
  })

  const formData = watch()

  useEffect(() => {
    setValue('images', images)
  }, [images, setValue])

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) {
      //   setError('images')
      alert('Please upload an image first!')
      return
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const storageRef = ref(storage, `/files/${file.name}`) // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          ) // update progress
          setPercent(percent)
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImages((state) => [...state, url])
            console.log(url)
          })
        },
      )
    }
  }

  const [createCaseMutation, { loading, data, error }] = useCreateCaseMutation()

  const router = useRouter()
  useEffect(() => {
    if (data) {
      notification$.next({
        message: 'Case created successfully.',
        type: 'success',
      })
      router.push('/')
    }

    if (error)
      notification$.next({
        message: 'Case creation failed. Please try again.',
        type: 'error',
      })
  }, [data, error, router])

  const user = useAppSelector(selectUser)

  return (
    <Container>
      <Form
        onSubmit={handleSubmit((data) => {
          console.log('Data', data)
          const {
            description,
            displayName,
            dob,
            gender,
            height,
            images,
            reports,
            status,
            weight,
            contact,
          } = data
          createCaseMutation({
            variables: {
              createCaseInput: {
                missingPerson: {
                  description,
                  displayName,
                  dob,
                  gender,
                  height,
                  images,
                  weight,
                },
                status,
                contact: contact.map((c) => c.number),
              },
            },
          })
        })}
        className="grid grid-cols-4 gap-2"
      >
        <div className="overflow-y-scroll h-[90vh] space-y-2">
          <HtmlLabel title="Name" error={errors.displayName?.message}>
            <HtmlInput
              placeholder="Enter the name"
              {...register('displayName')}
            />
          </HtmlLabel>
          <HtmlLabel title="Description" error={errors.displayName?.message}>
            <HtmlTextArea
              placeholder="Describe the missing person"
              {...register('description')}
            />
          </HtmlLabel>
          <HtmlLabel title="dob" error={errors.displayName?.message}>
            <HtmlInput type="date" {...register('dob')} />
          </HtmlLabel>
          <HtmlLabel title="Gender" error={errors.gender?.message}>
            <HtmlSelect {...register('gender')}>
              <option defaultChecked value={Gender.Female}>
                Female
              </option>
              <option defaultChecked value={Gender.Male}>
                Male
              </option>
              <option defaultChecked value={Gender.NonBinary}>
                Non Binary
              </option>
              <option defaultChecked value={Gender.PreferNotToSay}>
                Prefer Not To Say
              </option>
            </HtmlSelect>
          </HtmlLabel>
          <HtmlLabel title="Height (cm)" error={errors.height?.message}>
            <HtmlInput
              type="number"
              {...register('height', { valueAsNumber: true })}
            />
          </HtmlLabel>
          <div className="flex justify-between">
            <div>Contacts</div>
            <Button
              onClick={() => {
                appendContactField({ number: '' })
              }}
              variant="text"
            >
              <IconPlus />
            </Button>
          </div>

          <div>
            {fieldsContact.map((item, index) => (
              <HtmlLabel
                key={item.id}
                title="Contact number"
                error={errors.contact && errors.contact[index]?.message}
              >
                <div className="flex">
                  <HtmlInput {...register(`contact.${index}.number`)} />
                  <Button
                    onClick={() => {
                      removeContactField(index)
                    }}
                    variant="text"
                  >
                    <IconTrash className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </HtmlLabel>
            ))}
          </div>

          <HtmlLabel
            title="Weight"
            units="kg"
            optional
            error={errors.weight?.message}
          >
            <HtmlInput
              type="number"
              {...register('weight', { valueAsNumber: true })}
            />
          </HtmlLabel>
          <HtmlLabel title="Status" error={errors.status?.message}>
            <HtmlSelect {...register('status')}>
              <option defaultChecked value={Status.Missing}>
                Missing
              </option>
              <option value={Status.FoundSafe}>Found Safe</option>
              <option value={Status.FoundDeceased}>Found Deceased</option>
            </HtmlSelect>
          </HtmlLabel>
          <HtmlLabel title="Images">
            <HtmlInput
              multiple
              type="file"
              placeholder="Upload images"
              accept="image/*"
              onChange={handleUpload}
            />
            {percent > 0 ? (
              <ProgressBar variant="determinate" value={percent} />
            ) : null}
          </HtmlLabel>
          <div className="text-lg">Reports</div>
          <div className="p-2 bg-gray-50">
            {fields.length === 0 ? (
              <div className="flex items-center justify-center h-20">
                No reports added.
              </div>
            ) : null}
            {fields.map((field, index) => (
              <div key={field.localId} className="p-3">
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
                    <option
                      defaultChecked
                      value={ReportType.GeneralInformation}
                    >
                      General Information
                    </option>
                  </HtmlSelect>
                </HtmlLabel>
                <HtmlLabel title="Description">
                  <HtmlTextArea {...register(`reports.${index}.description`)} />
                </HtmlLabel>
                <DisplayLocation
                  lat={formData.reports[index].lat}
                  lng={formData.reports[index].lng}
                />

                <div className="flex justify-between mt-1">
                  <Button
                    variant="text"
                    size="none"
                    onClick={() =>
                      mymap?.flyTo({
                        center: [
                          formData.reports[index].lng,
                          formData.reports[index].lat,
                        ],
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
                  lat: mymap?.getCenter().lat || 0,
                  lng: mymap?.getCenter().lng || 0,
                  description: '',
                  type: ReportType.Sighting,
                  time: time,
                  audio: null,
                })
              }}
            >
              Add report <IconPlus className="inline" />
            </Button>
          </div>
          <Button type="submit" fullWidth isLoading={loading}>
            Add case
          </Button>
        </div>

        <div className="col-span-3 bg-red-400">
          <Map>
            {formData.reports?.map((report, index) => (
              <MarkerPopup
                index={index}
                key={report.localId}
                report={report}
                setLocation={([lng, lat]) => {
                  setValue(`reports.${index}.lat`, lat || 0)
                  setValue(`reports.${index}.lng`, lng || 0)
                }}
              />
            ))}
            <MapLines
              coordinates={formData.reports
                ?.filter((rep) => rep.type === ReportType.Sighting)
                .sort((a, b) => {
                  if (a.time > b.time) {
                    return 1
                  } else {
                    return -1
                  }
                })
                .map((rep) => [rep.lng, rep.lat])}
            />
          </Map>
        </div>
      </Form>
    </Container>
  )
}

export const MarkerWithOfficerApproval = ({
  lat,
  lng,
  type,
  children,
}: {
  lat: number
  lng: number
  type: ReportType
  children: ReactNode
}) => {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      {showPopup ? (
        <Popup
          latitude={lat}
          longitude={lng}
          closeOnClick={false}
          anchor="bottom"
          offset={24}
          closeButton={false}
        >
          <PopupContent onClose={() => setShowPopup(false)}>
            {children}
          </PopupContent>
        </Popup>
      ) : null}
      <Marker
        anchor="bottom"
        longitude={lng}
        latitude={lat}
        onClick={() => {
          setShowPopup((state) => !state)
        }}
      >
        <div className="text-red-500 cursor-pointer animate-pulse">
          {type === ReportType.Sighting ? (
            <IconPinned />
          ) : type === ReportType.Lead ? (
            <IconBulb />
          ) : (
            <IconInfoSquare />
          )}
        </div>
      </Marker>
    </>
  )
}

export const MarkerPopup = ({
  report,
  index,
  setLocation,
}: {
  report: FormTypeAddNewCase['reports'][number]
  index: number
  setLocation: (location: [number, number]) => void
}) => {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div>
      {showPopup ? (
        <Popup
          latitude={report.lat || 0}
          longitude={report.lng || 0}
          onOpen={() => console.log('Opened')}
          closeOnClick={false}
          anchor="bottom"
          offset={24}
          closeButton={false}
        >
          <PopupContent onClose={() => setShowPopup(false)}>
            <div className="p-2 space-y-1">
              <TitleValue title="Description">
                {report.description || '-'}
              </TitleValue>
              <TitleValue title="Time">
                {format(new Date(report.time), 'PPp') || '-'}
              </TitleValue>
              <TitleValue title="Type">{report.type}</TitleValue>
              <TitleValue title="Location">
                <DisplayLocation lat={report.lat} lng={report.lng} />
              </TitleValue>
            </div>
          </PopupContent>
        </Popup>
      ) : null}
      <Marker
        anchor="bottom"
        key={report.localId}
        draggable
        longitude={report.lng || 0}
        latitude={report.lat || 0}
        onClick={() => {
          setShowPopup(true)
        }}
        onDragStart={() => setShowPopup(false)}
        onDragEnd={({ lngLat }) => {
          setLocation([lngLat.lng, lngLat.lat])
          setShowPopup(true)
          console.log({
            latitude: lngLat.lat,
            longitude: lngLat.lng,
            lat: report.lat,
            lng: report.lng,
          })
        }}
      >
        <div className="text-red-500 cursor-pointer animate-pulse">
          {report.type === ReportType.Sighting ? (
            <IconPinned />
          ) : report.type === ReportType.Lead ? (
            <IconBulb />
          ) : (
            <IconInfoSquare />
          )}
        </div>
      </Marker>
    </div>
  )
}

export const DisplayLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  if (!lat || !lng) return null
  return (
    <div className="flex gap-2 text-xs">
      <div className="px-1 bg-gray-200 ">{lat.toFixed(2)}</div>
      <div className="px-1 bg-gray-200 ">{lng.toFixed(2)}</div>
    </div>
  )
}
