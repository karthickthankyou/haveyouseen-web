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

export interface ISignupFormProps {}

export const RegisterForm = ({ className }: { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const { loading, error, success, callAsyncFn } = useAsync(
    (data: FormTypeRegister) => registerUser(data),
    (err: any) => {
      console.log('err', err)
      if (err.code === 'auth/user-not-found') {
        return 'Invalid email.'
      } else if (err.code === 'auth/email-already-in-use') {
        return 'Email already in use.'
      }
      return 'Something went wrong. Please try again.'
    },
  )

  const router = useRouter()

  const uid = useAppSelector(selectUid)
  if (error) {
    notification$.next({ message: error, type: 'error' })
  }
  if (uid) {
    notification$.next({ message: 'Authenticated. ' })
    router.push('/')
  }

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        const user = await callAsyncFn({ email, password })
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
      <Button type="submit" isLoading={loading} fullWidth>
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
