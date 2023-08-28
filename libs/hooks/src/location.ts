import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl'

import { useDebouncedValue } from './async'
import { CaseQuery } from '@haveyouseen-org/network/src/generated'

export type LocationInfo = { placeName: string; latLng: [number, number] }

export const useSearchLocation = () => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [locationInfo, setLocationInfo] = useState<LocationInfo[]>(() => [])

  const debouncedSearchText = useDebouncedValue(searchText)

  useEffect(() => {
    setLoading(true)
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${debouncedSearchText}.json?fuzzyMatch=true&access_token=pk.eyJ1IjoiaWFta2FydGhpY2siLCJhIjoiY2t4b3AwNjZ0MGtkczJub2VqMDZ6OWNrYSJ9.-FMKkHQHvHUeDEvxz2RJWQ`,
    )
      .then((response) => response.json())
      .then((data) => {
        const filtered = data.features?.map((x: any) => ({
          placeName: x.place_name,
          latLng: [x.center[1], x.center[0]],
        }))

        setLocationInfo(filtered)
      })
      .finally(() => setLoading(false))
  }, [debouncedSearchText, setLocationInfo])

  return { loading, setLoading, searchText, setSearchText, locationInfo }
}

export const useSetMapBoundsBasedOnReports = ({
  reports = [],
}: {
  reports: CaseQuery['case']['reports']
}) => {
  const { current: map } = useMap()
  useEffect(() => {
    const locations = reports.map((report) => report.location)
    if (locations.length === 0) {
      return
    }

    // Calculate bounds
    let minLat = locations[0]?.latitude || 0
    let maxLat = locations[0]?.latitude || 0
    let minLng = locations[0]?.longitude || 0
    let maxLng = locations[0]?.longitude || 0

    locations.forEach((location) => {
      if (!location) return
      minLat = Math.min(minLat, location.latitude)
      maxLat = Math.max(maxLat, location.latitude)
      minLng = Math.min(minLng, location.longitude)
      maxLng = Math.max(maxLng, location.longitude)
    })

    // Add padding in percentage
    const latPadding = (maxLat - minLat) * 0.4 // 10% padding
    const lngPadding = (maxLng - minLng) * 0.4 // 10% padding

    minLat -= latPadding
    maxLat += latPadding
    minLng -= lngPadding
    maxLng += lngPadding

    // Set bounds with padding
    map?.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 50 },
    )
  }, [reports, map])
}
