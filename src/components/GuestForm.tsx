import React, { useState } from 'react';
interface GuestFormProps {
  onAddGuest: (guest: { name: string; email: string }) => void;
}
const GuestForm: React.FC<GuestFormProps> = ({ onAddGuest }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email) {
      alert('Please enter both name and email.');
      return;
    }
    const newGuest = { name, email };
    console.log('Adding guest:', newGuest); 
    onAddGuest(newGuest); 
    setName('');
    setEmail('');
  };
  return (
    <div className="bg-[#6b46f1] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Add New Guest</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1 text-center">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-white rounded-md shadow-sm focus:outline-none"
            placeholder="Enter guest name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1 text-center">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white rounded-md shadow-sm focus:outline-none"
            placeholder="Enter guest email"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-purple-700 font-medium py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition-colors"
        >
          Add Guest
        </button>
      </form>
    </div>
  );
};
export default GuestForm; 