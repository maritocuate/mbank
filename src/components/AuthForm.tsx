'use client'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { getSession, signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import useUserStore from '@/store/userStore'
import { toast } from './ui/use-toast'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const session = useSession()
  const router = useRouter()
  const { setUser } = useUserStore()

  const getCurrentSession = async () => {
    const session = await getSession()
    const userId = session?.user.id

    if (session?.user) {
      await fetch('/api/accountByEmail', {
        method: 'POST',
        body: JSON.stringify({ email: session?.user.email }),
      })
        .then(res => res.json())
        .then(data =>
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            balance: data.balance,
          })
        )
    }
    router.push(`/dashboard/${userId}`)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (mode === 'login') {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (res?.error) {
        toast({
          title: 'Error',
          description: res.error,
          variant: 'destructive',
        })
      } else {
        getCurrentSession()
      }
    }

    if (mode === 'register') {
      await fetch('/api/accounts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => signIn('credentials', data))
        .catch(res => toast({ title: 'Error', description: res.response.data }))
        .then(() => toast({ description: 'Account created' }))
        .finally(() => getCurrentSession())
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full">
        <CardHeader className="flex">
          <div className="mx-auto">
            <Image
              alt="Logo"
              height="30"
              width="30"
              src="/images/logo.svg"
              priority
            />
          </div>
          <CardTitle className="capitalize">{mode}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {mode === 'register' && (
            <Input
              {...register('name', { required: true })}
              placeholder="Name"
            />
          )}
          <Input
            {...register('email', { required: true })}
            placeholder="Email"
            type="text"
          />
          <Input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
          />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
