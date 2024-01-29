import Image from 'next/image'

async function MainPanel() {
  return (
    <div className="text-sm rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 sm:mx-auto w-full">
      <span className="flex flex-col space-y-4 rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10">
        <article>
          <h2>Balance</h2>$<span className="text-5xl font-bold">0.00</span>
        </article>
      </span>
    </div>
  )
}

export default MainPanel
