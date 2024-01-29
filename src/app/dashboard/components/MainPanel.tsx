import Image from 'next/image'
import getBalanceById from '@/app/actions/getBalanceById'

async function MainPanel() {
  const balance = await getBalanceById('1')

  return (
    <div className="m-5 text-sm rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 sm:mx-auto w-full">
      <span className="flex flex-col space-y-4 rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10">
        <p>
          <Image
            alt="Logo"
            height="48"
            width="48"
            src="/images/logo.svg"
            priority
          />
          {balance.length}
        </p>
      </span>
    </div>
  )
}

export default MainPanel
