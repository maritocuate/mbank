'use client'
import { useCallback, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER')
    if (variant === 'REGISTER') setVariant('LOGIN')
  }, [variant])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <div className="m-5 text-sm rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
      >
        {variant === 'REGISTER' && (
          <>
            <Input type="text" placeholder="Name" name="name" />
            <Input
              type="text"
              placeholder="Balance ($)"
              name="balance"
              onKeyDown={event => {
                if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
                  event.preventDefault()
                }
              }}
            />
          </>
        )}
        <Input type="text" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
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
