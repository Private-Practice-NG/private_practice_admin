import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import mockAvatar from '../assets/hospitalAvatar.png';

function ViewApplicationModal({ isOpen, onClose, hospital }) {
  if (!hospital) return null;

  return (
    <>
      {/* Background overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          aria-hidden="true"
        ></div>
      )}

      {/* Modal Dialog */}
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full md:w-3/4 lg:w-2/4 space-y-4 border bg-[#E2E2E2] p-4 rounded-md">
            <div className="flex flex-col justify-center gap-4 md:flex-row md:justify-between md:items-center">
              {/* Hospital Info */}
              <div className="flex items-center gap-5">
                <img
                  src={mockAvatar}
                  className="h-20 w-20 rounded-full"
                  alt="Hospital Avatar"
                />
                <DialogTitle className="flex flex-col gap-2">
                  <h3 className="font-bold text-lg">{hospital.hospitalName}</h3>
                  <span className="font-normal text-xs">
                    {hospital.email || 'No email available'}
                  </span>
                  <span className="font-semibold text-xs">
                    {hospital.hospitalPhoneNumber || '-----'}
                  </span>
                </DialogTitle>
              </div>

              {/* Approve/Decline Buttons */}
              <div className="flex gap-8 md:gap-4">
                <button
                  onClick={() => {
                    console.log('Approved');
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded text-xs"
                  aria-label="Approve hospital"
                >
                  Approve
                </button>
                <button
                  onClick={onClose}
                  className="bg-red-500 text-white px-4 py-2 rounded text-xs"
                  aria-label="Decline hospital"
                >
                  Decline
                </button>
              </div>
            </div>

            {/* Document View Section */}
            <div className="w-full border-2 border-[#ACACAC] flex justify-between items-center text-xs p-3">
              <span className="capitalize block">
                {hospital.documentName || '------'}
              </span>
              <button
                onClick={() => {
                  console.log('View document clicked');
                }}
                className="bg-[#ACACAC] rounded-lg capitalize px-4 py-2 cursor-pointer"
                aria-label="View hospital document"
              >
                view documents
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default ViewApplicationModal;
