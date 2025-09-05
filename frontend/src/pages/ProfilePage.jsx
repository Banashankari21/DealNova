import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);

  // Initialize state with existing user data
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [username, setUsername] = useState(user?.username || '');
  const [contact, setContact] = useState(user?.contact || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateProfile({
        id: user.id,
        firstname,
        lastname,
        username,
        contact,
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile. Try again later.');
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-medium">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1a2a47] to-[#0f172a] text-white min-h-screen px-6 py-10 flex flex-col items-center justify-center">
      <div className="bg-[#223c64] bg-opacity-80 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4 tracking-wide">My Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstname" className="block mb-1 font-medium tracking-wide">First Name</label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter your first name"
              className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 placeholder-gray-400 focus:outline-none py-1 transition duration-300"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block mb-1 font-medium tracking-wide">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter your last name"
              className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 placeholder-gray-400 focus:outline-none py-1 transition duration-300"
            />
          </div>

          <div>
            <label htmlFor="username" className="block mb-1 font-medium tracking-wide">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 placeholder-gray-400 focus:outline-none py-1 transition duration-300"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block mb-1 font-medium tracking-wide">Contact</label>
            <input
              type="text"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
              className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 placeholder-gray-400 focus:outline-none py-1 transition duration-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium tracking-wide">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              disabled
              className="w-full bg-transparent border-b border-gray-500 text-gray-400 focus:outline-none py-1 transition duration-300"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-full w-full shadow-md transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
