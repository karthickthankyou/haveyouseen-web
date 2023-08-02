import { LngLatBounds } from 'mapbox-gl'
import { ReactNode, useEffect, useState, useMemo } from 'react'
import { Popup, Marker, useMap } from 'react-map-gl'
import { format } from 'date-fns'

import {
  CaseQuery,
  ReportType,
  SearchCasesQuery,
  useCreateApprovedReportMutation,
  useCaseQuery,
  useUnapprovedReportsQuery,
  useSearchCasesQuery,
  useCaseLazyQuery,
} from '@haveyouseen-org/network/src/generated'

import { Map } from '../../organisms/Map'
import { AnimatePresence, motion } from 'framer-motion'
import {
  IconBulb,
  IconInfoSquare,
  IconPinned,
  IconX,
} from '@tabler/icons-react'
import { ConfidenceMeter } from '../../molecules/ConfidenceMeter'
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
} from '../AddNewCase/AddNewCase'
import { getBounds, useGetCoordinates } from '../NewReport/NewReport'
import { useRouter } from 'next/router'

import { MapLines } from '../../molecules/MapLines'

import { RedirectToSearch } from '../../molecules/RedirectToSearch'
import { KeyValue } from '../../atoms/KeyValue'
import { AddReports } from '../AddReports'
import { ReportsTimeline } from '../ReportsTimeline'
import { MissingPersonInfo } from '../../organisms/MissingPersonInfo'
import { ContactInfo } from '../../organisms/ContactInfo'
import {
  MAP_MODE,
  convertReportsToCoordinates,
  useKeypress,
} from '@haveyouseen-org/util'
import { useAppSelector } from '@haveyouseen-org/store'
import { selectUid, selectUser } from '@haveyouseen-org/store/user'

export interface IHomePageProps {}

export const HomePage = ({}: IHomePageProps) => {
  const [bounds, setBounds] = useState<LngLatBounds>()

  const router = useRouter()
  const caseId = useMemo(() => router.query.caseId, [router.query.caseId])

  return (
    <div>
      <Map>
        {router.query.mode === MAP_MODE.SEARCH ? (
          <DisplayAllMarkers bounds={bounds} />
        ) : router.query.mode === MAP_MODE.CASE ? (
          <DisplayOneCase caseId={caseId ? +caseId : undefined} />
        ) : router.query.mode === MAP_MODE.ADD_CASE ? (
          <div>Add new case</div>
        ) : (
          <RedirectToSearch />
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
    <div className="w-full max-w-md px-2 bg-white shadow-lg">
      <Accordion
        defaultOpen
        titleClassName="text-lg"
        title={caseInfo.missingPerson.displayName}
      >
        <div className="space-y-2 overflow-y-auto h-[80vh]">
          <MissingPersonInfo missingPerson={caseInfo.missingPerson} />
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

export const DisplayOneCase = ({ caseId }: { caseId?: number }) => {
  const { current: thisMap } = useMap()

  const [getCase, { data }] = useCaseLazyQuery()
  useEffect(() => {
    if (caseId) getCase({ variables: { where: { id: caseId } } })
  }, [caseId])

  const sortedReports = useMemo(() => {
    if (data?.case) {
      return data.case.reports.sort((a, b) => {
        if (a.time < b.time) return -1
        if (a.time > b.time) return 1
        return 0
      })
    }
    return []
  }, [data?.case])

  const router = useRouter()

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

  return (
    <FormProvider {...methods}>
      <Panel position="left-top" className="max-w-sm">
        <SidebarInfo caseInfo={data?.case} reports={sortedReports} />

        <div className="flex gap-2">
          <Button
            variant="text"
            size="none"
            onClick={() => {
              thisMap?.flyTo({ zoom: 6 })
              router.push({ pathname: '/', query: { mode: MAP_MODE.SEARCH } })
            }}
          >
            Show all cases
          </Button>
        </div>
      </Panel>
      {sortedReports?.map((caseInfo, i) => (
        <MarkerWithPopupCase
          key={caseInfo.id}
          caseInfo={caseInfo}
          lastSeen={Boolean(i + 1 === sortedReports.length)}
        />
      ))}
      <ManageUnapprovedReports />

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

  const uid = useAppSelector(selectUid)

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
                          officerId: uid,
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

export const DisplayAllMarkers = ({ bounds }: { bounds?: LngLatBounds }) => {
  const { data, loading } = useSearchCasesQuery({
    variables: {
      dateFilter: {
        end: '2022-12-22',
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

  return (
    <div>
      {data?.searchCases.map((caseInfo) => (
        <MarkerWithPopup key={caseInfo.case?.id} marker={caseInfo} />
      ))}
    </div>
  )
}

export const MarkerWithPopupCase = ({
  caseInfo,
  lastSeen,
}: {
  caseInfo: NonNullable<CaseQuery['case']>['reports'][0]
  lastSeen?: boolean
}) => {
  const [showPopup, setShowPopup] = useState(false)
  const { current: map } = useMap()

  if (!caseInfo.location?.latitude) {
    return null
  }

  let MarkerIcon = IconPinned
  if (caseInfo.type === ReportType.Lead) MarkerIcon = IconBulb
  else if (caseInfo.type === ReportType.GeneralInformation)
    MarkerIcon = IconInfoSquare

  return (
    <div>
      {showPopup ? (
        <Popup
          latitude={caseInfo?.location?.latitude || 0}
          longitude={caseInfo?.location?.longitude || 0}
          onOpen={() => console.log('Opened')}
          closeOnClick={false}
          anchor="bottom"
          offset={24}
          closeButton={false}
        >
          <PopupContent onClose={() => setShowPopup(false)}>
            <div className="p-2 space-y-1">
              <KeyValue title="Status">{caseInfo?.description || '-'}</KeyValue>
              <ConfidenceMeter confidence={3} />
            </div>
          </PopupContent>
        </Popup>
      ) : null}
      <Marker
        anchor="bottom"
        latitude={caseInfo.location?.latitude}
        longitude={caseInfo.location?.longitude}
        onClick={() => {
          setShowPopup((state) => !state)
        }}
      >
        <MarkerIcon className={`cursor-pointer ${lastSeen && 'fill-black'}`} />
        {map && map?.getZoom() > 6 ? (
          <div className="absolute py-2 text-xs w-36">
            <div>{format(new Date(caseInfo.time), 'PP')}</div>
            <div>{format(new Date(caseInfo.time), 'p')}</div>
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
          offset={24}
          closeButton={false}
        >
          <PopupContent onClose={() => setShowPopup(false)}>
            <div className="p-2 space-y-1">
              <KeyValue title="Status">{marker.case?.status || '-'}</KeyValue>
              <ConfidenceMeter confidence={3} />
              <Button
                className="w-full"
                onClick={() =>
                  router.push({
                    pathname: '/',
                    query: { mode: MAP_MODE.CASE, caseId: marker.case?.id },
                  })
                }
              >
                Case view
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
          className="rounded-full cursor-pointer outline-dashed outline-1 outline-gray-300 shadow-black/50"
          alt={marker.case?.missingPerson.displayName || ''}
          src={
            marker.case?.missingPerson?.images?.length
              ? marker.case?.missingPerson?.images[0]
              : ''
          }
        />
        <div className="absolute">{marker.case.missingPerson.displayName}</div>
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, transform: 'translateY(50%)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }}
        exit={{ opacity: 0, transform: 'translateY(50%)' }}
        className="grid grid-cols-1 grid-rows-1 "
      >
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
      </motion.div>
    </AnimatePresence>
  )
}
