// Créez un nouveau fichier src/components/ui/Toast.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (isVisible) {
      setProgress(100);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 30); // 3 seconds total duration

      return () => clearInterval(interval);
    }
  }, [isVisible, onClose]);

  const colors = {
    success: 'from-[#8C52FF] to-[#FF4D8F]',
    error: 'from-red-500 to-orange-500',
    info: 'from-[#FF8C60] to-[#FFC74F]',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden max-w-md">
            <div className="flex items-center p-4">
              <div className="flex-1">
                <p className="text-white">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div 
              className={`h-1 bg-gradient-to-r ${colors[type]}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;