import React from 'react';
interface Guest {
  id: number;
  name: string;
  email: string;
  rsvp: boolean; 
}
interface GuestListProps {
  guests: Guest[];
  onConfirmGuest: (guestId: number) => void; 
  onRemoveGuest: (guestId: number) => void; 
}
const GuestList: React.FC<GuestListProps> = ({ guests, onConfirmGuest, onRemoveGuest }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Guest List</h2>
        {guests.length > 0 && (
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            {guests.length} {guests.length === 1 ? 'Guest' : 'Guests'}
          </span>
        )}
      </div>
      {guests.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No guests yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first guest.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {guests.map((guest) => (
            <li
              key={guest.id}
              className={`py-4 flex justify-between items-center hover:bg-gray-50 px-3 transition-colors ${
                guest.rsvp ? 'bg-green-50' : ''
              }`}
            >
              <div>
                <p className="text-lg font-medium text-gray-800">{guest.name}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {guest.email}
                </div>
                {guest.rsvp && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                    Confirmed
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onConfirmGuest(guest.id)}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white ${
                    guest.rsvp 
                      ? 'bg-orange-500 hover:bg-orange-600' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {guest.rsvp ? 'Cancel' : 'Confirm'}
                </button>
                <button
                  onClick={() => onRemoveGuest(guest.id)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
                  aria-label={`Remove ${guest.name}`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default GuestList; 