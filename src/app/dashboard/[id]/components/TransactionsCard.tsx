import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getTransactions } from '../services'
import { PlusSquare, MinusSquare } from 'lucide-react'
import { Transaction } from '@/interfaces'

interface TransactionsCardProps {
  type: 'deposit' | 'withdrawal'
  data: Transaction[]
}

export default function TransactionsCard({
  type,
  data,
}: TransactionsCardProps) {
  const filteredData = data.filter(data => data.type === type)
  console.log(filteredData)

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-2">
          <CardTitle>Recent {type}</CardTitle>
          <CardDescription>
            You made {filteredData.length} {type} this month.
          </CardDescription>
        </div>
        {type === 'deposit' ? (
          <PlusSquare className="text-primary" size={18} />
        ) : (
          <MinusSquare className="text-red-500" size={18} />
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-8 mt-4">
            {filteredData.map((data, index) => (
              <div className="flex items-center pr-3" key={index}>
                <Avatar className="flex h-9 items-center justify-center space-y-0 border">
                  <AvatarImage src="/images/avatar.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm text-muted-foreground">{data.type}</p>
                </div>
                <div className="ml-auto font-medium">+${data.amount}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
