import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} rounded-full border-2 border-t-[#8C52FF] border-r-[#FF4D8F] border-b-[#FF8C60] border-l-[#FFC74F] opacity-80 animate-spin`}
      />
    </div>
  );
};

export default Loader;
