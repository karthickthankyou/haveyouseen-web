import { IconCurrentLocation, IconLoader } from '@tabler/icons-react'
import { useMap } from 'react-map-gl'
import { Button } from '../../atoms/Button'
import { useEffect, useState } from 'react'

export const CurrentLocationButton = ({
  moveToUserLocationOnLoad,
}: {
  moveToUserLocationOnLoad?: boolean
}) => {
  const { current: map } = useMap()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchAndSetLocation = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        map?.flyTo({
          center: { lat: latitude, lng: longitude },
          zoom: 10,
        })
        setLoading(false)
      },
      (error) => {
        console.error(error)
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 20000 },
    )
  }

  useEffect(() => {
    if (moveToUserLocationOnLoad) {
      fetchAndSetLocation()
    }
  }, [])

  return (
    <>
      <Button
        variant="text"
        className="hover:bg-gray-200"
        onClick={fetchAndSetLocation}
        isLoading={loading}
      >
        <IconCurrentLocation className="stroke-1.5" />
      </Button>
    </>
  )
}
