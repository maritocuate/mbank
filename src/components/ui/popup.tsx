import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import './popup.css'

interface PopupProps {
  title: string
  description: string
  icon: React.ReactNode
  submitHandler?: (amount: number) => void
}

const Popup = ({ title, description, icon, submitHandler }: PopupProps) => {
  const [amount, setAmount] = useState<number>(0)

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value))
  }

  const handleSubmission = () => {
    if (submitHandler) {
      submitHandler(amount)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer mr-5" asChild>
        {icon}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {description}
          </Dialog.Description>
          <fieldset className="Fieldset">
            <input
              className="Input text-4xl"
              id="username"
              value={amount}
              onChange={handleAmountChange}
            />
          </fieldset>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleSubmission}>
                Submit
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Popup
