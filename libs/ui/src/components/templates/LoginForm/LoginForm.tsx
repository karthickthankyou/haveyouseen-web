import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Button } from '../../atoms/Button'
import Link from 'next/link'

import { FormTypeLogin, useFormLogin } from '@haveyouseen-org/forms/src/login'
import { FormError } from '../../atoms/FormError'
import { Form } from '../../atoms/Form'

import { useAppSelector } from '@haveyouseen-org/store'
import { selectUid } from '@haveyouseen-org/store/user'

import { useAsync } from '@haveyouseen-org/hooks/src/fetcher'
import { googleSignIn, login } from '@haveyouseen-org/network/src/auth'
import { notification$ } from '@haveyouseen-org/util/subjects'
import { useRouter } from 'next/router'
import { PlainButton } from '../../atoms/PlainButton'
import { IconBrandGoogle } from '@tabler/icons-react'

export interface ILoginFormProps {
  className?: string
}

const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const { loading, error, success, callAsyncFn } = useAsync(
    (data: FormTypeLogin) => login(data),
    (err: any) => {
      if (err.code === 'auth/user-not-found') {
        return 'Invalid email.'
      } else if (err.code === 'auth/wrong-password') {
        return 'Invalid password.'
      }
      return 'Something went wrong. Please try again.'
    },
  )

  const router = useRouter()

  const uid = useAppSelector(selectUid)

  if (uid) {
    notification$.next({ message: 'Logged in.' })
    router.push('/')
  }

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        await callAsyncFn({ email, password })
      })}
    >
      <HtmlLabel
        className="text-black"
        title="Email"
        error={errors.email?.message}
      >
        <HtmlInput placeholder="Enter the email." {...register('email')} />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          type="password"
          placeholder="********"
          {...register('password')}
        />
      </HtmlLabel>
      <Button isLoading={loading} type="submit" fullWidth>
        Login
      </Button>
      {error ? <FormError error={error.message} /> : null}
      <div className="mt-4 text-sm">
        Do not have a haveyouseen account?
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Create one
        </Link>{' '}
        now.
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <PlainButton
          className="p-1 transition-all border-2 border-black rounded-full shadow-lg hover:shadow-xl"
          onClick={googleSignIn}
        >
          <IconBrandGoogle />
        </PlainButton>
      </div>
    </Form>
  )
}

export { LoginForm }
