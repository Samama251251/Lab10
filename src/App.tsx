import { useState, useEffect } from 'react'
import GuestForm from './components/GuestForm'
import GuestList from './components/GuestList'
import './App.css'
interface Guest {
  id: number
  name: string
  email: string
  rsvp: boolean 
}
const STORAGE_KEY = 'event-planner-guests'

function App() {
  const [guests, setGuests] = useState<Guest[]>(() => {
    const storedGuests = localStorage.getItem(STORAGE_KEY)
    return storedGuests ? JSON.parse(storedGuests) : []
  })
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests))
    console.log('Saved guests to localStorage:', guests)
  }, [guests])
  const handleAddGuest = (guestData: { name: string; email: string }) => {
    const newGuest: Guest = {
      ...guestData,
      id: Date.now(), 
      rsvp: false, 
    }
    setGuests((prevGuests) => [...prevGuests, newGuest])
  }
  const handleConfirmGuest = (guestId: number) => {
    console.log(`Confirming guest ${guestId} in App`)
    setGuests((prevGuests) => 
      prevGuests.map((guest) => 
        guest.id === guestId ? { ...guest, rsvp: !guest.rsvp } : guest
      )
    )
  }
  const handleRemoveGuest = (guestId: number) => {
    console.log(`Removing guest ${guestId}`)
    setGuests((prevGuests) => prevGuests.filter(guest => guest.id !== guestId))
  }
  const handleClearAllGuests = () => {
    if (window.confirm('Are you sure you want to remove all guests?')) {
      setGuests([])
    }
  }
  const confirmedCount = guests.filter(guest => guest.rsvp).length
  const unconfirmedCount = guests.length - confirmedCount
  return (
    <div className="min-h-screen bg-[#6b46f1] py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Event Planner</h1>
          <p className="text-white/80">Manage your guest list with ease</p>
        </div>
        <div className="mb-6">
          <GuestForm onAddGuest={handleAddGuest} />
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <GuestList
            guests={guests}
            onConfirmGuest={handleConfirmGuest}
            onRemoveGuest={handleRemoveGuest}
          />
        </div>
        {guests.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">RSVP Summary</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-2xl font-bold text-gray-800">{guests.length}</p>
                <p className="text-sm text-gray-600">Total Guests</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-2xl font-bold text-green-800">{confirmedCount}</p>
                <p className="text-sm text-gray-600">Confirmed</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <p className="text-2xl font-bold text-yellow-800">{unconfirmedCount}</p>
                <p className="text-sm text-gray-600">Unconfirmed</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleClearAllGuests}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
              >
                Clear All Guests
              </button>
            </div>
          </div>
        )}
        <div className="text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} Event Planner App</p>
        </div>
      </div>
    </div>
  )
}
export default App
