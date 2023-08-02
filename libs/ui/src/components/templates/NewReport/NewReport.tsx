import {
  IconBulb,
  IconInfoSquare,
  IconPinned,
  IconPlus,
} from '@tabler/icons-react'

import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useFormCreateWitness } from '@haveyouseen-org/forms/src/createWitness'
import { useFieldArray, useWatch } from 'react-hook-form'
import {
  LngLatBounds,
  LngLatBoundsLike,
  Marker,
  Popup,
  useMap,
} from 'react-map-gl'

import {
  CaseQuery,
  ReportType,
  useCreateWitnessMutation,
  useCaseQuery,
  useWitnessMeQuery,
  namedOperations,
} from '@haveyouseen-org/network/src/generated'

import { Button } from '../../atoms/Button'
import { Container } from '../../atoms/Container'
import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import HtmlSelect from '../../atoms/HtmlSelect'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import { AudioRecord } from '../../molecules/AudioRecord'
import { Map } from '../../organisms/Map'
import { Panel } from '../../organisms/Map/Panel'
import { DisplayLocation, MarkerPopup } from '../AddNewCase/AddNewCase'

import { PopupContent } from '../Home/Home'
import { MapLines } from '../../molecules/MapLines'

import { useFormAddNewReports } from '@haveyouseen-org/forms/src/addNewReports'
import { useAppSelector } from '@haveyouseen-org/store'
import { selectUid } from '@haveyouseen-org/store/user'
import { convertReportsToCoordinates, makeId } from '@haveyouseen-org/util'
import { TitleValue } from '../../atoms/TitleValue'

export interface INewReportProps {}

export const NewReport = ({}: INewReportProps) => {
  const uid = useAppSelector(selectUid)
  const witness = useWitnessMeQuery()

  if (!uid) return <Link href="/login">Login</Link>

  if (!witness.data?.witnessMe) {
    return (
      <Container className="flex items-center justify-center h-96 bg-gray-50">
        <div className="w-full max-w-md">
          <div>Create witness account.</div>
          <div>
            <CreateWitness uid={uid} />
          </div>
        </div>
      </Container>
    )
  }
  return <CreateNewReport />
}

export const CreateWitness = ({ uid }: { uid: string }) => {
  const [createWitnessMutation, { loading, data }] = useCreateWitnessMutation()

  const { register, handleSubmit } = useFormCreateWitness()
  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        await createWitnessMutation({
          variables: {
            createWitnessInput: { uid, name: data.name },
          },
          awaitRefetchQueries: true,
          refetchQueries: [namedOperations.Query.witnessMe],
        })
      })}
    >
      <HtmlLabel title="Name">
        <HtmlInput {...register('name')} />
      </HtmlLabel>
      <Button isLoading={loading} type="submit">
        Create witness
      </Button>
    </Form>
  )
}

export const useGetCoordinates = ({
  reports,
}: {
  reports?: {
    type: ReportType
    time: string
    location: { latitude: number; longitude: number }
  }[]
}): [number, number][] | undefined => {
  console.log(
    'coordinates reports',
    reports?.filter((rep) => rep.type === ReportType.Sighting),
  )
  return useMemo(
    () =>
      reports
        ?.filter((rep) => rep.type === ReportType.Sighting)
        .sort((a, b) => {
          if (new Date(a.time) > new Date(b.time)) {
            return 1
          } else {
            return -1
          }
        })
        .map((rep) => rep.location)
        .filter(Boolean)
        //   Todo: Hack implementation
        .map((location) => [location!.longitude, location!.latitude]),
    [reports],
  )
}

export const getBounds = (
  coordinates?: [number, number][],
): LngLatBoundsLike | undefined => {
  if (!coordinates) return
  let minLat = 90,
    minLng = 180,
    maxLat = -90,
    maxLng = -180
  coordinates.forEach((coordinate) => {
    minLat = Math.min(minLat, coordinate[1])
    minLng = Math.min(minLng, coordinate[0])
    maxLat = Math.max(maxLat, coordinate[1])
    maxLng = Math.max(maxLng, coordinate[0])
  })
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ]
}

export const CreateNewReport = () => {
  const [bounds, setBounds] = useState<LngLatBounds>()
  const router = useRouter()
  const caseId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : 0

  const {
    register,
    formState: { errors },
    control,
    setValue,
    watch,
    handleSubmit,
  } = useFormAddNewReports()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reports',
  })

  const formReports = useWatch({
    control,
    name: 'reports',
    defaultValue: [],
  })

  const { data, loading } = useCaseQuery({
    variables: { where: { id: caseId } },
  })

  const { mapNewReport } = useMap()

  const coordinates = useGetCoordinates({
    reports: [
      ...(data?.case?.reports?.map(({ time, type, location }) => ({
        time,
        type,
        location: {
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
        },
      })) || []),
      ...formReports?.map((rep) => ({
        type: rep.type,
        time: rep.time,
        location: { latitude: rep.lat, longitude: rep.lng },
      })),
    ],
  })

  return (
    <Container className="flex">
      <Form
        className="p-2 overflow-y-scroll min-w-[20vw] h-[90vh] space-y-6"
        onSubmit={handleSubmit((data) => {
          console.log('Data', data)
        })}
      >
        {fields.length === 0 ? (
          <div className="flex items-center justify-center h-20">
            No reports added.
          </div>
        ) : null}
        {fields.map((field, index) => (
          <div key={field.localId} className="p-3 bg-gray-50">
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
            <HtmlLabel title="Description">
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
        <Button fullWidth type="submit">
          Submit
        </Button>
      </Form>
      <Map id="mapNewReport">
        {!data?.case?.reports.length && (
          <Panel position="center-center">
            <div className="p-3 bg-white/30 backdrop-blur-sm text-md">
              No reports found.
            </div>
          </Panel>
        )}
        {data?.case?.reports?.map((report, index) => (
          <MarkerPopupDisplay key={report.id} report={report} />
        ))}

        {formReports?.map((report, index) => (
          <MarkerPopup
            index={index}
            key={report.localId}
            report={report}
            setLocation={([lng, lat]) => {
              setValue(`reports.${index}.lat`, lat)
              setValue(`reports.${index}.lng`, lng)
            }}
          />
        ))}

        <MapLines coordinates={coordinates} />
      </Map>
    </Container>
  )
}

export const MarkerPopupDisplay = ({
  report,
}: {
  report: NonNullable<CaseQuery['case']>['reports'][number]
}) => {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div>
      {showPopup ? (
        <Popup
          latitude={report.location?.latitude || 0}
          longitude={report.location?.longitude || 0}
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
            </div>
          </PopupContent>
        </Popup>
      ) : null}
      <Marker
        anchor="bottom"
        key={report.id}
        longitude={report.location?.longitude || 0}
        latitude={report.location?.latitude || 0}
        onClick={() => {
          setShowPopup(true)
        }}
      >
        <div className="cursor-pointer">
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
