import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { FaPlusCircle, FaRegEye } from "react-icons/fa";
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from './Modal'; 
import ConfirmDeleteModal from './ConfirmDeleteModal'; 
import PreviewModal from './PreviewModal'; 
import { FiSearch } from 'react-icons/fi';

function AllContact() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [contactToPreview, setContactToPreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, { id: contacts.length + 1, ...newContact }]);
  };

  const handleUpdateContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
  };

  const handleEditClick = (contact) => {
    setEditContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handlePreviewClick = (contact) => {
    setContactToPreview(contact);
    setIsPreviewModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setContacts(contacts.filter(contact => contact.id !== contactToDelete.id));
    setIsDeleteModalOpen(false);
    setContactToDelete(null);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  
  return (
    <div className='w-[60%] mx-auto my-10 p-6 bg-gradient-to-br from-purple-800 to-indigo-900 text-white rounded-lg shadow-lg'>
      <h1 className='text-4xl font-extrabold flex flex-row items-center justify-center gap-4 text-center mb-8'>
        All Contact 
        <FaPlusCircle 
          onClick={() => setIsModalOpen(true)} 
          className='cursor-pointer text-yellow-400 hover:text-yellow-300 transition-colors duration-300'
        />
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md text-gray-800'>
      <div className="relative w-full">
      <input
        type="text"
        placeholder="Search Contact"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <FiSearch className="absolute right-3 top-4 text-gray-500 font-bold" />
    </div>
        <div className='mt-5 space-y-4'>
          {filteredContacts.map((contact, index) => (
            <div 
              key={contact.id} 
              className='flex flex-row justify-between items-center p-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-lg shadow-sm transition-transform transform hover:scale-105'
            >
              <div className='font-bold'>{index + 1}</div>
              <div>
                <p className='font-semibold text-lg'>{contact.name}</p>
                <p className='text-sm'>{contact.email}</p>
                <p className='text-sm'>{contact.mobile}</p>
              </div>
              <div className='flex flex-row text-2xl space-x-4'>
                <FaRegEye 
                  onClick={() => handlePreviewClick(contact)} 
                  className='cursor-pointer text-blue-300 hover:text-blue-200 transition-colors duration-300'
                />
                <MdDelete 
                  onClick={() => handleDeleteClick(contact)} 
                  className='cursor-pointer text-red-400 hover:text-red-300 transition-colors duration-300'
                />
                <MdEdit 
                  onClick={() => handleEditClick(contact)} 
                  className='cursor-pointer text-green-400 hover:text-green-300 transition-colors duration-300'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditContact(null);
        }} 
        onAddContact={handleAddContact}
        editContact={editContact}
        onUpdateContact={handleUpdateContact}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        contact={contactToPreview}
      />
    </div>
  );
}

export default AllContact;
