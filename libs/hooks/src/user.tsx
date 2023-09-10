import { auth } from '@haveyouseen-org/network/src/config/firebase'

import { useAppDispatch, useAppSelector } from '@haveyouseen-org/store'
import {
  resetUser,
  setUser,
  selectUser,
  setApp,
  selectDisplayName,
} from '@haveyouseen-org/store/user'

import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import {
  useCreateOfficerMutation,
  useCreateWitnessMutation,
  useOfficerMeLazyQuery,
  useWitnessMeLazyQuery,
} from '@haveyouseen-org/network/src/generated'
import { Role } from '@haveyouseen-org/types'
import { notification$ } from '@haveyouseen-org/util/subjects'

export const useUserListener = () => {
  //   useRefreshToken()

  const dispatch = useAppDispatch()

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          dispatch(resetUser())
          return
        }

        const tokenResult = await auth.currentUser?.getIdTokenResult()
        const roles = tokenResult?.claims.roles || []
        const { displayName, email, uid } = user
        console.log('tokenResult ', tokenResult, displayName)

        dispatch(
          setUser({
            uid,
            email: email || '',
            displayName: displayName || '',
            roles,
            token: tokenResult?.token,
          }),
        )
      }),
    [],
  )
}

export const useInitialiseUser = ({ role }: { role?: Role }) => {
  const dispatch = useAppDispatch()
  const { uid, displayName } = useAppSelector(selectUser)

  useEffect(() => {
    if (role) {
      dispatch(setApp(role))
    }
  }, [role])

  const [
    getOfficerMe,
    { data: officerData, loading: officerLoading, called: officerCalled },
  ] = useOfficerMeLazyQuery()
  const [
    getWitnessMe,
    { data: witnessData, loading: witnessLoading, called: witnessCalled },
  ] = useWitnessMeLazyQuery()

  const [createWitness] = useCreateWitnessMutation()
  const [createOfficer] = useCreateOfficerMutation()

  useEffect(() => {
    if (uid) {
      getWitnessMe()
      getOfficerMe()
    }
  }, [uid, getWitnessMe, getOfficerMe])

  useEffect(() => {
    try {
      if (role === 'officer') {
        if (
          uid &&
          !officerData?.officerMe &&
          officerCalled &&
          !officerLoading
        ) {
          notification$.next({ message: 'Creating officer...' })
          ;(async () => {
            await createOfficer({
              variables: {
                createOfficerInput: {
                  name: displayName,
                  uid,
                },
              },
            })
          })()
          notification$.next({ message: 'Officer created.' })
        }
      }

      if (role === 'witness') {
        if (
          uid &&
          !witnessData?.witnessMe &&
          witnessCalled &&
          !witnessLoading
        ) {
          notification$.next({ message: 'Creating witness...' })
          ;(async () => {
            await createWitness({
              variables: {
                createWitnessInput: {
                  name: displayName,
                  uid,
                },
              },
            })
          })()
          notification$.next({
            message: `Welcome ${displayName ? displayName : 'User.'}`,
          })
        }
      }
    } catch (error) {
      notification$.next({ message: `Failed to create user.` })
    }
  }, [uid, role, officerData, witnessData, notification$])
}
