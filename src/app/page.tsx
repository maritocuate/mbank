import Image from 'next/image'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import AuthForm from '@/components/AuthForm'

export default function Home() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
      <div className="index-container--logo flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-md">
        <span className="mx-auto m-5">
          <Image
            alt="Logo"
            height="48"
            width="48"
            src="/images/logo.svg"
            priority
          />
        </span>
        <AuthForm />
      </div>
    </MaxWidthWrapper>
  )
}
