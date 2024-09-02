import React from 'react';
import { FaTimes } from 'react-icons/fa';

const PreviewModal = ({ isOpen, onClose, contact }) => {
  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[40%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Contact Preview</h2>
          <FaTimes onClick={onClose} className="text-gray-600 hover:text-gray-800 cursor-pointer transition duration-200" />
        </div>
        <div className="space-y-2 text-black">
          <p><strong className="text-gray-700">Name:</strong> {contact.name}</p>
          <p><strong className="text-gray-700">Email:</strong> {contact.email}</p>
          <p><strong className="text-gray-700">Phone:</strong> {contact.mobile}</p>  
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
