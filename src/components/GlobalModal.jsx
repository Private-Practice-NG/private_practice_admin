import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../slices/modalSlice';

export default function GlobalModal() {
  const dispatch = useDispatch();
  const { isOpen, title, message, onConfirm, onCancel } = useSelector(
    (state) => state.modal
  );

  function handleClose() {
    dispatch(closeModal());
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl transition-all duration-300 ease-out">
            <DialogTitle as="h3" className="text-base font-medium text-white">
              {title}
            </DialogTitle>
            <p className="mt-2 text-sm text-white/50">{message}</p>
            <div className="mt-4 flex justify-end gap-2">
              {onCancel && (
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-500 py-1.5 px-3 text-sm font-semibold text-white hover:bg-gray-400 focus:outline-none"
                  onClick={() => {
                    onCancel();
                    handleClose();
                  }}
                >
                  Cancel
                </button>
              )}
              {onConfirm && (
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 py-1.5 px-3 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none"
                  onClick={() => {
                    onConfirm();
                    handleClose();
                  }}
                >
                  Confirm
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
