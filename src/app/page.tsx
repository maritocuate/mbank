import AuthForm from '@/components/AuthForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-3 sm:mx-auto sm:w-full sm:max-w-md">
      <Tabs defaultValue="login" className="w-full justify-center">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <AuthForm mode="login" />
        </TabsContent>
        <TabsContent value="register">
          <AuthForm mode="register" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
