import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCloseRef = useRef(onClose);

  // Keep onClose ref updated
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Handle auto-close when progress reaches 0
  useEffect(() => {
    if (progress <= 0) {
      onCloseRef.current();
    }
  }, [progress]);

  useEffect(() => {
    if (isVisible) {
      setProgress(100);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 30); // 3 seconds total duration

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isVisible]);

  const colors = {
    success: 'from-[#8C52FF] to-[#FF4D8F]',
    error: 'from-red-500 to-orange-500',
    info: 'from-[#FF8C60] to-[#FFC74F]',
  };

  const bgColors = {
    success: 'bg-green-50 border-green-100',
    error: 'bg-red-50 border-red-100',
    info: 'bg-blue-50 border-blue-100',
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
          <div className={`bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-w-md ${bgColors[type]}`}>
            <div className="flex items-center p-4">
              <div className="flex-1">
                <p className="text-gray-800">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-gray-600"
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