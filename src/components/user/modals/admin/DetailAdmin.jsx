// src/components/user/modals/admin/DetailAdmin.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiUser, FiMail, FiCalendar, FiTag, FiX } from 'react-icons/fi';

const DetailAdmin = ({ isOpen, onClose, admin }) => {
  if (!isOpen || !admin) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Detail Admin
              </h3>
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-center w-full">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FiUser className="h-10 w-10" />
                </div>
              </div>
              <div className="text-center mt-2">
                <h4 className="text-xl font-semibold text-gray-800">{admin.name}</h4>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  {admin.role}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{admin.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-500">Tanggal Dibuat</label>
                  <p className="text-gray-900">
                    {new Date(admin.createdAt || admin.created_at).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <FiTag className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-500">ID Admin</label>
                  <p className="text-gray-900">{admin.id}</p>
                </div>
              </div>
              
              {/* Additional information could be added here if available */}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailAdmin.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  admin: PropTypes.object
};

export default DetailAdmin;