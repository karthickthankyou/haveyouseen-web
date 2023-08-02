import { IconMicrophone, IconPlayerStop, IconTrash } from '@tabler/icons-react'
import {
  deleteObject,
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage'
import { useState } from 'react'

import { Button } from '../../atoms/Button'
import { useAppSelector } from '@haveyouseen-org/store'
import { selectUser } from '@haveyouseen-org/store/user'
import { storage } from '@haveyouseen-org/network/src/config/firebase'
import { makeId } from '@haveyouseen-org/util'
import { notification$ } from '@haveyouseen-org/util/subjects'

export interface IAudioRecordProps {
  setAudio: (url: string | null) => void
}

export const AudioRecord = ({ setAudio }: IAudioRecordProps) => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioStorageRef, setAudioStorageRef] =
    useState<StorageReference | null>(null)

  const user = useAppSelector(selectUser)

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream)
      setRecorder(mediaRecorder)
      mediaRecorder.start()

      mediaRecorder.ondataavailable = (e) => {
        handleUpload(new Blob([e.data], { type: 'audio/webm' }))
      }
    })
  }

  const handleUpload = (blob: Blob | null) => {
    if (!blob || !user.uid) return null

    setAudioBlob(blob)

    const storageRef = ref(storage, `/audio/${user.uid}/${makeId()}.mp3`)
    setAudioStorageRef(storageRef)

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot)

        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url)
          setAudio(url)
          notification$.next({
            message: `Audio upload successful.`,
            type: 'info',
          })
        })
      })
      .catch((err) => {
        notification$.next({
          message: `Audio upload failed. Please try again.`,
          type: 'error',
        })
      })
  }

  return (
    <div className="flex items-center justify-center h-24 bg-white shadow">
      {audioBlob ? (
        <>
          <audio src={URL.createObjectURL(audioBlob)} controls />
          <Button
            variant="text"
            size="none"
            onClick={async () => {
              if (!audioStorageRef) return
              await deleteObject(audioStorageRef)
              setAudioStorageRef(null)
              setAudio(null)
              setAudioBlob(null)
              notification$.next({ message: 'Audio file deleted.' })
            }}
          >
            <IconTrash className="text-red-500" />
          </Button>
        </>
      ) : null}

      {!(recorder?.state === 'recording') ? (
        !audioBlob ? (
          <div>
            <Button
              type="button"
              variant="text"
              color="white"
              size="none"
              onClick={startRecording}
            >
              Record <IconMicrophone className="inline w-4 h-4" />
            </Button>
          </div>
        ) : null
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 py-2 animate-pulse">
            <span className="inline-block w-4 h-4 bg-red-500 rounded-full" />{' '}
            <div>Recording...</div>
          </div>
          <div>
            <Button
              type="button"
              variant="text"
              onClick={() => {
                recorder?.stop()
              }}
            >
              <div className="p-1 rounded-full outline outline-black outline-1">
                <IconPlayerStop className="w-4 h-4 fill-black" />
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
