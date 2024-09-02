import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onAddContact, editContact, onUpdateContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editContact) {
      setName(editContact.name || '');
      setEmail(editContact.email || '');
      setMobile(editContact.mobile || '');
    } else {
      setName('');
      setEmail('');
      setMobile(''); 
    }
  }, [editContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!mobile) newErrors.mobile = 'Phone number is required';
    else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = 'Phone number must be exactly 10 digits'; 

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editContact) {
      onUpdateContact({ ...editContact, name, email, mobile });
    } else {
      onAddContact({ name, email, mobile });
    }

    onClose();
    setName('');
    setEmail('');
    setMobile(''); 
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{editContact ? 'Edit Contact' : 'Add Contact'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 text-black focus:ring-blue-400 outline-none"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 text-black rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          
          <input
            type="number"
            placeholder="Phone Number"
            value={mobile}  
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-3 border border-gray-300 text-black rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.mobile && <p className="text-red-500">{errors.mobile}</p>} 
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {editContact ? 'Update Contact' : 'Add Contact'}
          </button>
          <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-300 transition duration-200 ml-10"
            >
              Cancel
            </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
