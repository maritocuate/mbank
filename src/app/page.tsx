import Image from 'next/image'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <div className="index-container sm:px-6 lg:px-8">
        <div className="index-container--logo sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Logo"
            height="48"
            width="48"
            src="/images/logo.svg"
            priority
          />
          <h2 className="index-container--title">Sign in</h2>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
