import * as Dialog from '@radix-ui/react-dialog'
import './popup.css'

interface PopupProps {
  title: string
  description: string
  icon: React.ReactNode
  submitHandler?: () => void
}

const Popup = ({ title, description, icon, submitHandler }: PopupProps) => {
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
            <input className="Input text-4xl" id="username" defaultValue="0" />
          </fieldset>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={submitHandler}>
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
