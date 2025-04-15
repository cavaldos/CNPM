import React, { useEffect, useState } from 'react';
import StudentService from '../../../services/student.service';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContacts = async () => {
    try {
      const response = await StudentService.enrollment.getContacts(1);
      if (response && response.data) {
        setContacts(response.data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.FullName.toLowerCase().includes(searchLower) ||
      contact.UserName.toLowerCase().includes(searchLower) ||
      contact.Email.toLowerCase().includes(searchLower)
    );
  });

  const onSelectContact = contact => {
    setSelectedContactId(contact.UserID);
    // Here you could also add logic to show messages for this contact
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Format date to a readable format
  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-1/3 border-r border-gray-200 overflow-y-auto bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full px-4 py-2 pr-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearch}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <li
              key={contact.UserID}
              onClick={() => onSelectContact(contact)}
              className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${selectedContactId === contact.UserID ? 'bg-gray-100' : ''}`}
            >
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={
                      contact.Avatar ||
                      'https://ui-avatars.com/api/?name=' + encodeURIComponent(contact.FullName)
                    }
                    alt={contact.FullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {contact.IsOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{contact.FullName}</h3>
                    <span className="text-xs text-gray-500">{formatDate(contact.EnrollDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate max-w-[150px]">
                      {contact.UserName} • {contact.EnrollmentStatus}
                    </p>
                    {contact.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-3 text-center text-gray-500">Không tìm thấy liên hệ nào</li>
        )}
      </ul>
    </div>
  );
};

export default ContactsList;
