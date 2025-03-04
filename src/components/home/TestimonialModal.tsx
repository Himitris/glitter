// Créez un nouveau fichier src/components/home/TestimonialModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: Testimonial;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  onClose,
  testimonial
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 max-w-md w-full relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X size={24} />
            </button>
            
            <div className="mb-6">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "text-[#FFC74F] fill-[#FFC74F]" : "text-gray-600"}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-gray-300 italic mb-6">"{testimonial.content}"</p>
            
            <div>
              <p className="font-semibold text-white">{testimonial.name}</p>
              <p className="text-gray-400 text-sm">{testimonial.role}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TestimonialModal;