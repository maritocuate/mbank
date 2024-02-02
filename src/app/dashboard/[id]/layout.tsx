import NavBar from './components/NavBar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col justify-center">
      <NavBar />
      {children}
    </div>
  )
}
