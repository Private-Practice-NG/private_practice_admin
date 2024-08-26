import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

export default function MyModal() {
  const [isOpen, setIsOpen] = useState(true); // Set the initial state to true if you want the modal to open immediately

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl transition-all duration-300 ease-out">
              <DialogTitle as="h3" className="text-base font-medium text-white">
                Payment successful
              </DialogTitle>
              <p className="mt-2 text-sm text-white/50">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>
              <div className="mt-4">
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-600 focus:outline-none focus:outline-1 focus:outline-white"
                  onClick={close}
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
