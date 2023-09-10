import { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import { Popup, useMap } from 'react-map-gl'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { FormTypeAddNewCase } from '@haveyouseen-org/forms/src/addNewCase'
import {
  Gender,
  ReportType,
  Status,
  useCreateCaseMutation,
} from '@haveyouseen-org/network/src/generated'
import { Button } from '../../atoms/Button'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import HtmlSelect from '../../atoms/HtmlSelect'
import { Map } from '../../organisms/Map'

import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import { useFieldArray } from 'react-hook-form'
import { Form } from '../../atoms/Form'
import {
  IconBulb,
  IconEye,
  IconEyeClosed,
  IconInfoSquare,
  IconPinned,
  IconPinnedFilled,
  IconPlus,
  IconX,
} from '@tabler/icons-react'
import { Marker } from '../../organisms/Map/MapMarker'

import { PopupContent } from '../Home/Home'
import { MapLines } from '../../molecules/MapLines'

import { format } from 'date-fns'
import { AudioRecord } from '../../molecules/AudioRecord'

import { useRouter } from 'next/navigation'
import { notification$ } from '@haveyouseen-org/util/subjects'
import { makeId, useImageUpload } from '@haveyouseen-org/util'
import { TitleValue } from '../../atoms/TitleValue'
import { Panel } from '../../organisms/Map/Panel'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'
import { SearchPlaceBox } from '../../organisms/SearchPlaceBox'
import { ImageUploadPreview } from '../../organisms/ImageUploadPreview'
import { useAppDispatch, useAppSelector } from '@haveyouseen-org/store'
import { setVictimName, setVictimPic } from '@haveyouseen-org/store/utils'
import Accordion from '../../molecules/Accordion'
import { PlainButton } from '../../atoms/PlainButton'
import { selectUid } from '@haveyouseen-org/store/user'
import { Switch } from '../../atoms/Switch'
import { FormError } from '../../atoms/FormError'

export interface IAddNewCaseProps {}

export const AddNewCase = ({}: IAddNewCaseProps) => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<FormTypeAddNewCase>()

  const { displayName, images } = useWatch<FormTypeAddNewCase>()
  useSetHeaderText(displayName)
  useSetHeaderPic(images?.[0] ? URL.createObjectURL(images?.[0]) : '')

  const [createCaseMutation, { loading, data, error }] = useCreateCaseMutation()

  const router = useRouter()
  useEffect(() => {
    if (data) {
      notification$.next({
        message: 'Case created successfully.',
        type: 'success',
      })
      reset()
      router.push('/')
    }

    if (error)
      notification$.next({
        message: 'Case creation failed. Please try again.',
        type: 'error',
      })
  }, [data, error, router])
  const [{ uploading }, uploadImages] = useImageUpload()
  const uid = useAppSelector(selectUid)

  useEffect(() => {
    if (errors) {
      console.log('errors while submitting... ', errors)
    }
  }, [errors])

  return (
    <div>
      <Form
        onSubmit={handleSubmit(
          async ({
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
          }) => {
            const uploadedImages = await uploadImages(images)

            const uploadedReportImagesPromises = reports.map((report) =>
              uploadImages(report.images),
            )
            const uploadedReportImages = await Promise.all(
              uploadedReportImagesPromises,
            )

            await createCaseMutation({
              variables: {
                createCaseInput: {
                  reports: reports.map(
                    (
                      {
                        audio,
                        description,
                        lat,
                        lng,
                        showPublic,
                        time,
                        type,
                        address,
                        officerDescription,
                      },
                      index,
                    ) => ({
                      description,
                      type,
                      audio,
                      location: {
                        latitude: lat || 0,
                        longitude: lng || 0,
                        address: address || '',
                      },
                      time,
                      witnessId: uid,
                      images: uploadedReportImages[index],
                      showPublic,
                      officerDescription,
                    }),
                  ),
                  missingPerson: {
                    description,
                    displayName,
                    dob,
                    gender,
                    height,
                    images: uploadedImages,
                    weight,
                  },
                  status,
                  contact: contact.map((c) => c.number),
                },
              },
            })
          },
        )}
        className="relative grid gap-2 md:grid-cols-2"
      >
        <div className="flex flex-col gap-4 p-3 overflow-y-auto bg-white">
          <AddCaseDetails />
          <AddContacts />

          <AddReports />
          <Button type="submit" fullWidth isLoading={loading || uploading}>
            Create Case
          </Button>
        </div>

        <div>
          <ShowMap />
        </div>
      </Form>
    </div>
  )
}

export const useSetHeaderText = (displayName = '') => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (displayName) {
      dispatch(setVictimName(displayName))
    } else {
      dispatch(setVictimName(''))
    }

    return () => {
      dispatch(setVictimName(''))
    }
  }, [displayName])
}

export const useSetHeaderPic = (url = '') => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (url) {
      dispatch(setVictimPic(url))
    } else {
      dispatch(setVictimPic(''))
    }

    return () => {
      dispatch(setVictimPic(''))
    }
  }, [url])
}

export const AddCaseDetails = () => {
  const {
    register,
    formState: { errors },
    control,
    resetField,
  } = useFormContext<FormTypeAddNewCase>()
  const formData = useWatch<FormTypeAddNewCase>()

  return (
    <div className="flex flex-col gap-2">
      <FormGrid>
        <ImageUploadPreview
          src={formData.images?.[0] || undefined}
          clearImage={() => resetField('images')}
        >
          <Controller
            control={control}
            name={`images`}
            render={({ field }) => (
              <HtmlInput
                type="file"
                accept="image/*"
                multiple={true}
                onChange={(e) => field.onChange(e?.target?.files)}
              />
            )}
          />
        </ImageUploadPreview>
      </FormGrid>
      <HtmlLabel title="Name" error={errors.displayName?.message}>
        <HtmlInput placeholder="Enter the name" {...register('displayName')} />
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
      <HtmlLabel title="Description" error={errors.displayName?.message}>
        <HtmlTextArea
          placeholder="Describe the missing person"
          {...register('description')}
        />
      </HtmlLabel>
      <FormGrid>
        <HtmlLabel title="dob" error={errors.dob?.message}>
          <HtmlInput type="date" {...register('dob')} required />
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
      </FormGrid>
      <FormGrid>
        <HtmlLabel title="Height" units="cm" error={errors.height?.message}>
          <HtmlInput
            type="number"
            {...register('height', { valueAsNumber: true })}
          />
        </HtmlLabel>
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
      </FormGrid>
    </div>
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
        <div className="cursor-pointer animate-pulse">
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
  setLocation,
}: {
  report: Partial<FormTypeAddNewCase['reports'][number]>
  index: number
  setLocation: (location: [number, number]) => void
}) => {
  const [showPopup, setShowPopup] = useState(false)

  const imageSrc = report.images?.[0]
    ? URL.createObjectURL(report.images?.[0])
    : ''

  return (
    <div>
      {showPopup ? (
        <Popup
          latitude={report.lat || 0}
          longitude={report.lng || 0}
          closeOnClick={false}
          anchor="bottom"
          offset={24}
          closeButton={false}
        >
          <PopupContent onClose={() => setShowPopup(false)}>
            {imageSrc ? (
              <Image
                alt=""
                width={300}
                height={200}
                className="object-cover aspect-square"
                src={imageSrc}
              />
            ) : null}
            <div className="p-2 space-y-1">
              <div>
                {report.time ? format(new Date(report.time), 'PPp') : '-'}
              </div>
              <div className="text-xs font-medium text-left">
                {report.type?.split('_').join(' ')}
              </div>

              <div>{report.description || ''}</div>

              <TitleValue title="Location">
                <DisplayLocation lat={report.lat || 0} lng={report.lng || 0} />
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
          setShowPopup((state) => !state)
        }}
        onDragStart={() => setShowPopup(false)}
        onDragEnd={({ lngLat }) => {
          setLocation([lngLat.lng, lngLat.lat])
          setShowPopup(false)
        }}
      >
        <div
          className={`cursor-pointer ${
            report.showPublic ? 'text-black' : 'text-black/30'
          }`}
        >
          {report.type === ReportType.Sighting ? (
            <IconPinnedFilled />
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

export const SearchPlaceBoxContainer = () => {
  const { current: map } = useMap()
  return (
    <SearchPlaceBox
      setLocationInfo={(locationInfo) => {
        const {
          latLng: [lat, lng],
        } = locationInfo
        map?.flyTo({ center: { lat, lng }, essential: true })
      }}
    />
  )
}

export const FormGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 gap-2">{children}</div>
)

export const AddContacts = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<FormTypeAddNewCase>()
  const {
    fields: fieldsContact,
    append: appendContactField,
    remove: removeContactField,
  } = useFieldArray({
    control,
    name: 'contact',
  })

  return (
    <div className="p-3 bg-gray-25">
      <div className="flex items-center justify-between">
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

      <FormError error={errors.contact && errors.contact?.message} />

      <div className="grid grid-cols-2 gap-2">
        {fieldsContact.map((item, index) => (
          <div className="flex">
            <HtmlInput {...register(`contact.${index}.number`)} />
            <PlainButton
              className="p-1"
              onClick={() => {
                removeContactField(index)
              }}
            >
              <IconX className="w-5 h-5 text-gray-600 " />
            </PlainButton>
          </div>
        ))}
      </div>
    </div>
  )
}

export const AccordionTitle = ({
  time,
  description,
}: {
  time: string
  description: string
}) => {
  return (
    <div>
      <div> {time}</div>
      <div className="text-xs">{description}</div>
    </div>
  )
}

export const AddReports = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormTypeAddNewCase>()
  const { myMap } = useMap()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reports',
  })
  const { reports } = useWatch<FormTypeAddNewCase>({ control })

  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg">Reports</div>
      <FormError error={errors.reports?.message} />
      <div className="p-3 space-y-3 bg-gray-25">
        {fields.map((field, index) => (
          <Accordion
            defaultOpen
            title={
              <div className="flex items-center gap-2">
                <div>
                  {reports?.[index]?.showPublic ? (
                    <IconEye />
                  ) : (
                    <IconEyeClosed />
                  )}
                </div>
                <div>
                  <div className="">
                    {reports?.[index]?.time
                      ? format(new Date(reports?.[index]?.time || ''), 'PPp')
                      : null}
                  </div>
                  <div className="text-xs">
                    {reports?.[index]?.description?.substring(0, 100) || ''}...
                  </div>
                </div>
              </div>
            }
          >
            <div className="flex justify-end">
              <Button
                variant="text"
                size="none"
                color="error"
                onClick={() => {
                  remove(index)
                }}
              >
                Remove
              </Button>
            </div>
            <FormGridItem index={index} />

            <div className="flex justify-between mt-1">
              <Button
                variant="text"
                size="none"
                onClick={() =>
                  myMap?.flyTo({
                    center: [
                      reports?.[index].lng || 0,
                      reports?.[index].lat || 0,
                    ],
                    essential: true,
                  })
                }
              >
                Go to location
              </Button>
            </div>
          </Accordion>
        ))}
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            const time = new Date().toISOString().split('.')[0]

            append({
              localId: makeId(),
              lat: myMap?.getCenter().lat || 0,
              lng: myMap?.getCenter().lng || 0,
              description: '',
              type: ReportType.Sighting,
              time: time,
              audio: null,
              images: [],
            })
          }}
        >
          Add report <IconPlus className="inline" />
        </Button>
      </div>
    </div>
  )
}

export const FormGridItem = ({ index }: { index: number }) => {
  const { control, register, resetField, setValue } =
    useFormContext<FormTypeAddNewCase>()
  const { reports } = useWatch<FormTypeAddNewCase>({ control })

  useFieldArray({
    control,
    name: 'reports',
  })
  const [showPublic, setShowPublic] = useState(false)

  return (
    <FormGrid>
      <ImageUploadPreview
        src={reports?.[index]?.images?.[0] || undefined}
        clearImage={() => resetField(`reports.${index}.images`)}
      >
        <Controller
          control={control}
          name={`reports.${index}.images`}
          render={({ field }) => (
            <HtmlInput
              type="file"
              accept="image/*"
              multiple={true}
              onChange={(e) => field.onChange(e?.target?.files)}
            />
          )}
        />
      </ImageUploadPreview>
      <div className="flex flex-col gap-3">
        <HtmlLabel title="Time">
          <Controller
            control={control}
            name={`reports.${index}.time`}
            render={({ field }) => (
              <HtmlInput {...field} type="datetime-local" />
            )}
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
        <HtmlLabel title="Address" optional>
          <HtmlTextArea {...register(`reports.${index}.address`)} />
        </HtmlLabel>
        <HtmlLabel title="Voice" optional>
          <AudioRecord
            setAudio={(url) => setValue(`reports.${index}.audio`, url)}
          />
        </HtmlLabel>{' '}
        <HtmlLabel title="Description">
          <HtmlTextArea {...register(`reports.${index}.description`)} />
        </HtmlLabel>
        <DisplayLocation
          lat={reports?.[index]?.lat || 0}
          lng={reports?.[index]?.lng || 0}
        />
        <Switch
          label={'Public'}
          checked={showPublic}
          onChange={function (checked: boolean): void {
            setValue(`reports.${index}.showPublic`, checked)
            setShowPublic(checked)
          }}
        />
        {showPublic ? (
          <HtmlLabel title="Officer Description">
            <HtmlTextArea
              {...register(`reports.${index}.officerDescription`)}
            />
          </HtmlLabel>
        ) : null}
      </div>
    </FormGrid>
  )
}

export const ShowMap = () => {
  const { reports } = useWatch<FormTypeAddNewCase>()
  const { setValue } = useFormContext<FormTypeAddNewCase>()
  return (
    <div className="sticky top-16">
      <Map id="myMap">
        <Panel position="right-center" className="px-2 py-1 rounded-t">
          <DefaultZoomControls />
        </Panel>
        <Panel position="left-top">
          <SearchPlaceBoxContainer />
        </Panel>
        {reports?.map((report, index) => {
          return (
            <MarkerPopup
              index={index}
              key={report.localId}
              report={report}
              setLocation={([lng, lat]) => {
                setValue(`reports.${index}.lat`, lat)
                setValue(`reports.${index}.lng`, lng)
              }}
            />
          )
        })}
        <MapLines
          coordinates={
            reports
              ?.filter((rep) => Boolean(rep.time))
              ?.filter(
                (rep) =>
                  rep.type === ReportType.Sighting &&
                  rep.lng !== undefined &&
                  rep.lat !== undefined,
              )
              .sort((a, b) => ((a?.time || 0) > (b?.time || 0) ? 1 : -1))
              .map((rep) => [rep.lng as number, rep.lat as number]) || []
          }
        />
      </Map>
    </div>
  )
}
