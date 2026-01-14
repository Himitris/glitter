import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isVisible) {
      // Auto-close après 3 secondes
      timerRef.current = setTimeout(onClose, 3000);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [isVisible, onClose]);

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

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-w-md ${bgColors[type]}`}>
        <div className="flex items-center p-4">
          <div className="flex-1">
            <p className="text-gray-800">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {/* Barre de progression CSS animée */}
        <div
          className={`h-1 bg-gradient-to-r ${colors[type]} animate-shrink-width`}
        />
      </div>
    </div>
  );
};

export default Toast;
