import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999]"
            >
              <div className="bg-white/10 border border-yellow-400 text-yellow-50 px-6 py-3 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-3 font-medium">
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-sm">{message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
