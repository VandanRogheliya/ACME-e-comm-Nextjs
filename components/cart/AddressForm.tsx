import { AddressType } from '@lib/types/common'
import { updateUserAddress } from '@lib/util/common'
import { useAuth } from 'contexts/auth'
import { useEffect, useState } from 'react'

type InputFieldProps = {
  label: string
  value: string
  onChange: (addressField: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ label, value, onChange }: InputFieldProps) => (
  <div className="flex flex-col space-y-1">
    <label>{label}</label>
    <input
      value={value}
      onChange={onChange}
      className="bg-gray-800 outline-none"
    />
  </div>
)

type Props = {
  handleCheckout: () => Promise<void>
}

const AddressForm = ({ handleCheckout }: Props) => {
  const { user } = useAuth()
  const [address, setAddress] = useState<AddressType>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })

  const handleSetAddress = (fieldName: any) =>
    setAddress((address) => ({ ...address, ...fieldName }))

  const handleOnSubmit = async () => {
    await updateUserAddress(user.uid, address)
  }

  // Call handleCheckout function once address has been updated for the user
  useEffect(() => {
    if (user.address) handleCheckout()
  }, [user.address])

  return (
    <div className="flex flex-col px-5 pt-5 h-full">
      <h1 className="text-2xl font-bold mb-10">Enter your address</h1>
      <form
        className="flex flex-col h-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col space-y-4">
          <InputField
            label="Line 1"
            onChange={(e) => handleSetAddress({ line1: e.target.value })}
            value={address.line1}
          />
          <InputField
            label="Line 2"
            onChange={(e) => handleSetAddress({ line2: e.target.value })}
            value={address.line2}
          />
          <InputField
            label="City"
            onChange={(e) => handleSetAddress({ city: e.target.value })}
            value={address.city}
          />
          <InputField
            label="State"
            onChange={(e) => handleSetAddress({ state: e.target.value })}
            value={address.state}
          />
          <InputField
            label="Postal Code"
            onChange={(e) => handleSetAddress({ postalCode: e.target.value })}
            value={address.postalCode}
          />
          <InputField
            label="Country"
            onChange={(e) => handleSetAddress({ country: e.target.value })}
            value={address.country}
          />
        </div>
        <button
          className="bg-white text-black py-5 mt-auto duration-150 border hover:bg-gray-400"
          onClick={handleOnSubmit}
        >
          CONFIRM ADDRESS
        </button>
      </form>
    </div>
  )
}

export default AddressForm
