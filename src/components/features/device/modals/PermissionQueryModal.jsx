import React from 'react';
import { Modal } from '@components/common/Modal';
import { X } from 'lucide-react';

const personnelData = [
  { id: 1, name: 'Harry Potter', phone: '-', email: 'harry@gmail.com' },
  { id: 2, name: 'Strongman Brunei', phone: '-', email: 'strong@gmail.com' },
  { id: 3, name: 'David Beckham', phone: '-', email: 'yazid@veridface.com' },
  { id: 4, name: 'Sen TenZ', phone: '-', email: 'tenz@gmail.com' },
  { id: 5, name: 'David Beckham', phone: '-', email: 'mzidd37@gmail.com' },
  { id: 6, name: 'Brad Pitt', phone: '-', email: 'brad@gmail.com' },
  { id: 7, name: 'Scarlett Johanson', phone: '-', email: 'scarlett@gmail.com' },
  { id: 8, name: 'Kjayi Khalis', phone: '-', email: 'khalis@gmail.com' },
  { id: 9, name: 'Andhika', phone: '-', email: '-' },
  { id: 10, name: 'Naz', phone: '-', email: 'naz@gmail.com' },
  { id: 11, name: 'Bobby of Brunei', phone: '-', email: 'bobby@gmail.com' },
  { id: 12, name: 'Iswa', phone: '-', email: 'vin@gmail.com' },
];

const PermissionQueryModal = ({ isOpen, onClose, deviceName = 'Device' }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lihat izin akses personel"
      maxWidth="max-w-3xl"
      maxHeight="max-h-[80vh]"
    >
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-center py-3 px-4 text-gray-700 font-semibold">Name</th>
                <th className="text-center py-3 px-4 text-gray-700 font-semibold">Phone</th>
                <th className="text-center py-3 px-4 text-gray-700 font-semibold">Email</th>
              </tr>
            </thead>
            <tbody>
              {personnelData.map((person) => (
                <tr key={person.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-center text-gray-700">{person.name}</td>
                  <td className="py-3 px-4 text-center text-gray-700">{person.phone}</td>
                  <td className="py-3 px-4 text-center text-gray-700">{person.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default PermissionQueryModal;
