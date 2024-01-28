'use client'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { signIn, useSession } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER')
    if (variant === 'REGISTER') setVariant('LOGIN')
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      balance: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      }).then(callback => {
        if (callback?.error) {
          toast.error('Invalid credentials')
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in!')
        }
      })
    }

    if (variant === 'REGISTER') {
      await axios
        //.post('/api/accounts', data)
        .post('https://mbank-backend.vercel.app/accounts', data)
        //.then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong!'))
    }
  }

  return (
    <div className="m-5 text-sm rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
      >
        {variant === 'REGISTER' && (
          <>
            <Input
              {...register('name', { required: true })}
              type="text"
              placeholder="Name"
              name="name"
            />
          </>
        )}
        <Input
          {...register('email', { required: true })}
          type="text"
          placeholder="Email"
          name="email"
        />
        <Input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          name="password"
        />
        <Button type="submit" size="default">
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
        <div className="flex justify-between">
          <div>
            {variant === 'LOGIN' ? 'New here?' : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
