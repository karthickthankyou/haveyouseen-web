import { LngLatBounds } from 'mapbox-gl'
import { ReactNode, useEffect, useState, useMemo } from 'react'
import { Popup, Marker, useMap, ViewStateChangeEvent } from 'react-map-gl'
import { format } from 'date-fns'

import {
  CaseQuery,
  ReportType,
  SearchCasesQuery,
  useCreateApprovedReportMutation,
  useUnapprovedReportsQuery,
  useSearchCasesQuery,
  useCaseQuery,
  useUpdateCaseStatusMutation,
  namedOperations,
  Status,
} from '@haveyouseen-org/network/src/generated'

import { Map } from '../../organisms/Map'
import { AnimatePresence } from 'framer-motion'
import {
  IconBulb,
  IconInfoSquare,
  IconPinned,
  IconX,
} from '@tabler/icons-react'

import Image from 'next/image'
import { Button } from '../../atoms/Button'
import { Panel } from '../../organisms/Map/Panel'
import Accordion from '../../molecules/Accordion'
import { LinkButton } from '../../atoms/LinkButton'
import { useFormAddNewReports } from '@haveyouseen-org/forms/src/addNewReports'
import { FormProvider, useWatch } from 'react-hook-form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import {
  DisplayLocation,
  MarkerPopup,
  MarkerWithOfficerApproval,
  useSetHeaderPic,
  useSetHeaderText,
} from '../AddNewCase/AddNewCase'
import { useGetCoordinates } from '../NewReport/NewReport'
import { useRouter } from 'next/router'

import { MapLines } from '../../molecules/MapLines'

import { KeyValue } from '../../atoms/KeyValue'
import { AddReports } from '../AddReports'
import { ReportsTimeline } from '../ReportsTimeline'
import { MissingPersonInfo } from '../../organisms/MissingPersonInfo'
import { ContactInfo } from '../../organisms/ContactInfo'
import { useKeypress } from '@haveyouseen-org/util'
import { useAppSelector } from '@haveyouseen-org/store'
import { selectApp, selectUser } from '@haveyouseen-org/store/user'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'
import { CurrentLocationButton } from '../../molecules/CurrentLocationButton'
import { SearchPlaceBox } from '../../molecules/SearchPlaceBox'
import { Loader } from '../../molecules/Loader'
import { useSetMapBoundsBasedOnReports } from '@haveyouseen-org/hooks/src/location'
import { PlainButton } from '../../atoms/PlainButton'
import { Dialog } from '../../atoms/Dialog'
import { useFormUpdateCase } from '@haveyouseen-org/forms/src/updateCase'
import { Form } from '../../atoms/Form'
import HtmlSelect from '../../atoms/HtmlSelect'
import { Switch } from '../../atoms/Switch'
import { notification$ } from '@haveyouseen-org/util/subjects'

export interface IHomePageProps {}

export const HomePage = ({}: IHomePageProps) => {
  const [bounds, setBounds] = useState<LngLatBounds>()

  const router = useRouter()
  const caseId = useMemo(() => router.query.caseId, [router.query.caseId])

  function handleMapChange(target: ViewStateChangeEvent['target']) {
    const bounds = target.getBounds()
    setBounds(bounds)
  }
  return (
    <div>
      <Map
        onDragEnd={(e) => handleMapChange(e.target)}
        onZoomEnd={(e) => handleMapChange(e.target)}
        onLoad={(e) => handleMapChange(e.target)}
      >
        <Panel position="right-center">
          <DefaultZoomControls />
        </Panel>
        {caseId ? (
          <DisplayOneCase caseId={+caseId} />
        ) : (
          <DisplayAllMarkers bounds={bounds} />
        )}
      </Map>
    </div>
  )
}

export type CaseReport = NonNullable<CaseQuery['case']>['reports'][number]

export const SidebarInfo = ({
  caseInfo,
  reports,
}: {
  caseInfo?: CaseQuery['case']
  reports?: CaseReport[]
}) => {
  const user = useAppSelector(selectUser)

  if (!caseInfo?.missingPerson) return null
  return (
    <div className="z-30 w-full max-w-md px-2 bg-white rounded shadow-lg">
      <Accordion
        defaultOpen
        titleClassName="text-lg px-3"
        title={caseInfo.missingPerson.displayName}
      >
        <div className="space-y-6 overflow-y-auto h-[calc(100vh-8rem)] pr-2">
          <MissingPersonInfo
            missingPerson={caseInfo.missingPerson}
            status={caseInfo.status}
          />
          <ChangeCaseState caseInfo={caseInfo} />
          <ReportsTimeline reports={reports} />
          <ContactInfo contact={caseInfo.contact} />
          <div className="flex flex-col gap-3 pt-12">
            {user.uid ? (
              <AddReports />
            ) : (
              <LinkButton href="/login">
                Login to add new report online
              </LinkButton>
            )}
          </div>
        </div>
      </Accordion>
    </div>
  )
}

export const ChangeCaseState = ({
  caseInfo,
}: {
  caseInfo?: CaseQuery['case']
}) => {
  const [open, setOpen] = useState(false)
  const [update, { loading }] = useUpdateCaseStatusMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormUpdateCase()

  if (!caseInfo?.id) {
    return null
  }

  const appName = useAppSelector(selectApp)

  return (
    <div className="py-1">
      {appName === 'officer' ? (
        <PlainButton
          className="underline underline-offset-4"
          onClick={() => setOpen(true)}
        >
          Update case status
        </PlainButton>
      ) : null}
      <Dialog open={open} setOpen={setOpen} title={'Update case status'}>
        <Form
          onSubmit={handleSubmit(async ({ status }) => {
            try {
              const result = await update({
                variables: {
                  updateCaseInput: { status, id: caseInfo?.id },
                },
                awaitRefetchQueries: true,
                refetchQueries: [namedOperations.Query.case],
              })

              // Check if there are errors in the GraphQL response
              if (result.errors) {
                console.error('GraphQL Errors:', result.errors)
                notification$.next({ message: 'Action failed.' })
                return
              }

              // Otherwise, the action was successful
              notification$.next({ message: 'Action done.' })
            } catch (e) {
              // Handle network errors or any other exceptions
              console.error('Exception caught:', e)
              notification$.next({ message: 'Action failed.' })
            }
          })}
        >
          <HtmlLabel title="Status" error={errors.status?.message}>
            <HtmlSelect {...register('status')}>
              <option defaultChecked value={Status.Missing}>
                Missing
              </option>
              <option value={Status.FoundSafe}>Found Safe</option>
              <option value={Status.FoundDeceased}>Found Deceased</option>
            </HtmlSelect>
          </HtmlLabel>
          <Button isLoading={loading} type="submit">
            Update
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}

export const DisplayOneCase = ({ caseId }: { caseId: number }) => {
  const { current: map } = useMap()
  const { data, loading } = useCaseQuery({
    variables: { where: { id: caseId } },
  })

  useSetHeaderText(data?.case.missingPerson.displayName)
  useSetHeaderPic(data?.case.missingPerson.images?.[0])
  const sortedReports = useMemo(() => {
    if (data?.case) {
      return [...data.case.reports].sort((a, b) => {
        if (a.time < b.time) return -1
        if (a.time > b.time) return 1
        return 0
      })
    }
  }, [data?.case?.reports])

  useEffect(() => {
    if (!data?.case) {
      return
    }
    const location = data?.case.reports[data?.case.reports?.length - 1].location
    const lat = location?.latitude || 0
    const lng = location?.longitude || 0
    map?.flyTo({ center: { lat, lng }, essential: true })
  }, [data?.case])

  useSetMapBoundsBasedOnReports({ reports: data?.case.reports || [] })

  const router = useRouter()
  const [showtime, setShowtime] = useState(true)

  const methods = useFormAddNewReports()

  const formReports = useWatch({
    control: methods.control,
    name: 'reports',
    defaultValue: [],
  })

  useEffect(() => {
    if (data?.case?.id) {
      methods.setValue('caseId', data.case.id)
    }
  }, [data?.case?.id, methods])

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

  useKeypress(['Escape'], () => router.push({ pathname: '/' }))

  return (
    <FormProvider {...methods}>
      <Panel position="right-top">
        <div className="flex gap-2">
          <Button
            variant="text"
            size="none"
            onClick={() => {
              router.push({ pathname: '/' })
            }}
          >
            Show all cases (ESC)
          </Button>
        </div>
        <Switch
          label={'Show label'}
          checked={showtime}
          onChange={setShowtime}
        />
      </Panel>
      <Panel position="left-top">
        <SidebarInfo caseInfo={data?.case} reports={sortedReports} />
      </Panel>
      {sortedReports?.map((report, i) => (
        <MarkerWithPopupCase
          key={report.id}
          report={report}
          showtime={showtime}
          lastSeen={Boolean(i + 1 === sortedReports.length)}
        />
      ))}
      <ManageUnapprovedReports />
      {loading ? (
        <Panel position="center-bottom">
          <Loader />
        </Panel>
      ) : null}
      {formReports?.map((report, index) => (
        <MarkerPopup
          index={index}
          key={report.localId}
          report={report}
          setLocation={([lng, lat]) => {
            methods.setValue(`reports.${index}.lat`, lat)
            methods.setValue(`reports.${index}.lng`, lng)
          }}
        />
      ))}

      <MapLines coordinates={coordinates} />
    </FormProvider>
  )
}

export const ManageUnapprovedReports = () => {
  const { data: unapprovedReportsData, loading: unapprovedReportsFetching } =
    useUnapprovedReportsQuery({
      variables: {
        where: { approvedReport: { is: null }, caseId: { equals: 32 } },
      },
    })

  const [officerDescription, setOfficerDescription] = useState<string>('')

  const [approveReportMutation, { loading }] = useCreateApprovedReportMutation()

  return (
    <>
      {unapprovedReportsData?.reports?.map(
        ({ id, type, time, description, audio, location }, index) => (
          <MarkerWithOfficerApproval
            key={id}
            lat={location?.latitude || 0}
            lng={location?.longitude || 0}
            type={type}
          >
            <div className="p-2 space-y-1 min-w-[12rem]">
              <KeyValue title="Description">{description || '-'}</KeyValue>
              <KeyValue title="Time">
                {format(new Date(time), 'PPp') || '-'}
              </KeyValue>
              <KeyValue title="Type">{type}</KeyValue>
              <KeyValue title="Audio">
                <audio src={audio || ''} controls />
              </KeyValue>
              <KeyValue title="Location">
                <DisplayLocation
                  lat={location?.latitude || 0}
                  lng={location?.longitude || 0}
                />
              </KeyValue>
              <div>
                <HtmlLabel>
                  <HtmlTextArea
                    placeholder="Enter officer comments here."
                    value={officerDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setOfficerDescription(e.target?.value)
                    }
                  />
                </HtmlLabel>
                <Button
                  isLoading={loading}
                  onClick={async () => {
                    await approveReportMutation({
                      variables: {
                        createApprovedReportInput: {
                          id: +id,
                          description: officerDescription,
                        },
                      },
                    })
                  }}
                  fullWidth
                >
                  Approve
                </Button>
              </div>
            </div>
          </MarkerWithOfficerApproval>
        ),
      )}
    </>
  )
}

function usePreviousData<T>(data?: T) {
  const [displayData, setDisplayData] = useState<T>()

  useEffect(() => {
    if (data) {
      setDisplayData(data)
    }
  }, [data])

  return displayData
}

export const DisplayAllMarkers = ({ bounds }: { bounds?: LngLatBounds }) => {
  const { data, loading } = useSearchCasesQuery({
    variables: {
      dateFilter: {
        end: '2024-12-01',
        start: '2022-12-01',
      },
      locationFilter: {
        nw_lat: bounds?.getNorthWest().lat || 0,
        nw_lng: bounds?.getNorthWest().lng || 0,
        se_lat: bounds?.getSouthEast().lat || 0,
        se_lng: bounds?.getSouthEast().lng || 0,
      },
    },
  })
  const displayData = usePreviousData<SearchCasesQuery['searchCases']>(
    data?.searchCases,
  )

  return (
    <div>
      <Panel position="right-top">
        <div className="flex">
          <CurrentLocationButton moveToUserLocationOnLoad={true} />
          <SearchPlaceBox />
        </div>
      </Panel>
      {loading ? (
        <Panel position="center-bottom">
          <Loader />
        </Panel>
      ) : data?.searchCases.length === 0 ? (
        <Panel position="center-bottom">
          <div className="px-3 py-2 border rounded-full shadow-lg text-gray backdrop-blur-sm">
            No reports in this area.
          </div>
        </Panel>
      ) : null}
      {displayData?.map((caseInfo) => (
        <MarkerWithPopup key={caseInfo.case?.id} marker={caseInfo} />
      ))}
    </div>
  )
}

export const MarkerWithPopupCase = ({
  report,
  lastSeen,
  showtime,
}: {
  report: NonNullable<CaseQuery['case']>['reports'][0]
  lastSeen?: boolean
  showtime?: boolean
}) => {
  const [showPopup, setShowPopup] = useState(false)
  const { current: map } = useMap()

  if (!report.location?.latitude) {
    return null
  }

  let MarkerIcon = IconPinned
  if (report.type === ReportType.Lead) MarkerIcon = IconBulb
  else if (report.type === ReportType.GeneralInformation)
    MarkerIcon = IconInfoSquare

  return (
    <div>
      <AnimatePresence>
        {showPopup ? (
          <Popup
            key={report.id}
            latitude={report?.location?.latitude || 0}
            longitude={report?.location?.longitude || 0}
            onOpen={() => console.log('Opened')}
            closeOnClick={false}
            anchor="bottom"
            offset={36}
            closeButton={false}
          >
            <PopupContent onClose={() => setShowPopup(false)}>
              <div className="p-2 space-y-1">
                <div>
                  <div>{format(new Date(report?.time), 'p') || '-'}</div>
                  <div className="text-lg">
                    {format(new Date(report?.time), 'PP') || '-'}
                  </div>
                </div>
                <div>{report?.description || '-'}</div>
                <div>{report?.type || '-'}</div>
                <div>
                  {report.audio ? <audio src={report.audio} controls /> : null}
                </div>
              </div>
            </PopupContent>
          </Popup>
        ) : null}
      </AnimatePresence>

      <Marker
        anchor="bottom"
        latitude={report?.location?.latitude}
        longitude={report?.location?.longitude}
        onClick={() => {
          setShowPopup((state) => !state)
        }}
      >
        <MarkerIcon
          className={`cursor-pointer ${
            report.approvedReport
              ? 'text-black'
              : 'text-gray-300 fill-gray-300 animate-pulse'
          } ${lastSeen && 'fill-black'}`}
        />
        {showtime ? (
          <div className="absolute py-2 text-xs w-36">
            <div>{format(new Date(report.time), 'PP')}</div>
            <div>{format(new Date(report.time), 'p')}</div>
          </div>
        ) : null}
      </Marker>
    </div>
  )
}

export const MarkerWithPopup = ({
  marker,
}: {
  marker: SearchCasesQuery['searchCases'][number]
}) => {
  const [showPopup, setShowPopup] = useState(false)
  useKeypress(['Escape'], () => setShowPopup(false))
  const router = useRouter()
  if (
    !marker.location?.latitude ||
    !marker.location?.longitude ||
    !marker.case?.id
  ) {
    return null
  }

  return (
    <div key={marker.case?.id}>
      {showPopup ? (
        <Popup
          latitude={marker.location.latitude}
          longitude={marker.location.longitude}
          onOpen={() => console.log('Opened')}
          closeOnClick={false}
          anchor="bottom"
          offset={36}
          closeButton={false}
        >
          <PopupContent onClose={() => setShowPopup(false)}>
            <div className="space-y-1 rounded">
              <Image
                src={marker.case.missingPerson.images?.[0]}
                alt=""
                width={200}
                height={200}
              />
              <div className="p-2 space-y-2">
                <KeyValue title="Name">
                  {marker.case.missingPerson.displayName || '-'}
                </KeyValue>
                <KeyValue title="Gender">
                  {marker.case.missingPerson.gender || '-'}
                </KeyValue>
                <KeyValue title="Status">{marker.case?.status || '-'}</KeyValue>
              </div>
              <Button
                className="w-full"
                onClick={() =>
                  router.push({
                    pathname: '/',
                    query: { caseId: marker.case?.id },
                  })
                }
              >
                Detailed view
              </Button>
            </div>
          </PopupContent>
        </Popup>
      ) : null}

      <Marker
        anchor="bottom"
        latitude={marker.location.latitude}
        longitude={marker.location.longitude}
        onClick={() => {
          setShowPopup((state) => !state)
        }}
      >
        <Image
          width={30}
          height={30}
          className="border border-white rounded shadow-lg cursor-pointer aspect-[3/4] object-cover outline-gray-300 shadow-black/50"
          alt={marker.case?.missingPerson.displayName || ''}
          src={
            marker.case?.missingPerson?.images?.length
              ? marker.case?.missingPerson?.images[0]
              : ''
          }
        />
        <div className="absolute px-1 py-1 mt-1 font-semibold leading-3 text-center -translate-x-1/2 rounded-sm bg-white/50 left-1/2">
          {marker.case.missingPerson.displayName}
        </div>
      </Marker>
    </div>
  )
}

export const PopupContent = ({
  onClose,
  children,
}: {
  onClose: () => void
  children: ReactNode
}) => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 ">
      <div className="col-start-1 row-start-1 ">{children}</div>
      <div className="flex justify-end col-start-1 row-start-1 p-0 items-top">
        <button
          type="button"
          className="absolute top-0 right-0 p-0.5 rounded-bl bg-black/30 hover:bg-black/40"
          onClick={onClose}
        >
          <IconX className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
