import { IconCurrentLocation, IconLoader } from '@tabler/icons-react'
import { useMap } from 'react-map-gl'
import { Button } from '../../atoms/Button'
import { useEffect, useState } from 'react'

export const CurrentLocationButton = () => {
  const { current: map } = useMap()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchAndSetLocation = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        map?.flyTo({
          center: { lat: latitude, lng: longitude },
          zoom: 10,
          essential: true,
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
    fetchAndSetLocation()
  }, [])

  return (
    <>
      {loading ? (
        <div className="px-3 py-2 space-y-2 text-white bg-black bg-opacity-50 border border-black rounded-full backdrop-blur-sm ">
          <div className="flex items-center gap-2">
            <IconLoader className="animate-spin" />
            Loading your location.
          </div>
        </div>
      ) : (
        <Button
          variant="text"
          className="hover:bg-gray-200"
          onClick={fetchAndSetLocation}
        >
          <IconCurrentLocation className="stroke-1.5" />
        </Button>
      )}
    </>
  )
}
