import { Button } from '../../atoms/Button'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import Link from 'next/link'
import { register as registerUser } from '@haveyouseen-org/network/src/auth'

import { Form } from '../../atoms/Form'
import {
  FormTypeRegister,
  useFormRegister,
} from '@haveyouseen-org/forms/src/signUp'
import { useAppSelector } from '@haveyouseen-org/store'
import { selectUid } from '@haveyouseen-org/store/user'

import { notification$ } from '@haveyouseen-org/util/subjects'
import { useRouter } from 'next/router'

import { useAsync } from '@haveyouseen-org/hooks/src/fetcher'
import { Role } from '@haveyouseen-org/types'
import { useCreateUser } from '@haveyouseen-org/hooks/src/user'
import { useEffect } from 'react'

export interface IRegisterFormProps {
  className?: string
  role?: Role
}

export const RegisterForm = ({ role, className }: IRegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const { data, loading, error, success, callAsyncFn } = useAsync(
    (data: FormTypeRegister) => registerUser(data),
    (err: any) => {
      console.log('err', err)
      if (err.code === 'auth/email-already-in-use') {
        return 'Registration failed.'
      }
      return 'Something went wrong. Please try again.'
    },
  )

  const router = useRouter()
  const { createUser, loading: creatingUser } = useCreateUser()

  useEffect(() => {
    if (error) notification$.next({ message: error, duration: 8000 })
  }, [error])

  useEffect(() => {
    console.log('data use effect ', data)
    if (data?.user.uid) {
      ;(async () => {
        await createUser({
          displayName: data.user.displayName,
          uid: data.user.uid,
          role,
        })

        if (success) {
          router.push('/')
        }
      })()
      notification$.next({ message: 'Authenticated. ' })
    }
  }, [data, success, role, router])

  return (
    <Form
      onSubmit={handleSubmit(async ({ email, password, displayName }) => {
        await callAsyncFn({ email, password, displayName })
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput placeholder="Enter the email." {...register('email')} />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          type="password"
          placeholder="······"
          {...register('password')}
        />
      </HtmlLabel>
      <HtmlLabel title="Display name" error={errors.displayName?.message}>
        <HtmlInput
          placeholder="Enter your name."
          {...register('displayName')}
        />
      </HtmlLabel>
      {Object.keys(errors).length ? (
        <div className="text-xs text-gray-600">
          Please fix the above {Object.keys(errors).length} errors
        </div>
      ) : null}
      <Button type="submit" isLoading={loading || creatingUser} fullWidth>
        Create account
      </Button>
      <div className="mt-4 text-sm ">
        Already have an Have you seen account?
        <br />
        <Link href="/login" className="font-bold underline underline-offset-4">
          Login
        </Link>{' '}
        now.
      </div>
    </Form>
  )
}
