import { LatLng } from '@haveyouseen-org/types'
import { useState, useEffect } from 'react'

export const useMapboxDirections = (start: LatLng, end: LatLng) => {
  const [data, setData] = useState<[number, number][]>([])
  const [distance, setDistance] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!start || !end) {
        setData([])
        setDistance(null)
        return
      }

      setLoading(true)
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${start.lng},${start.lat};${end.lng},${end.lat}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&steps=true&overview=simplified`,
        )
        const data = await response.json()
        const coordinates =
          data?.routes[0]?.legs[0]?.steps.map(
            (step: { maneuver: { location: any } }) => step.maneuver.location,
          ) || []
        setData(coordinates)
        setDistance(data.routes[0].distance)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [start, end])

  return { data, distance, loading, error }
}
