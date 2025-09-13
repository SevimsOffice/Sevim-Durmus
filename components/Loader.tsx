
import React from 'react';

const Loader: React.FC<{ text?: string }> = ({ text = "Generating..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3 bg-brand-purple-light/20 rounded-lg">
      <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
      <p className="text-brand-purple-dark font-semibold">{text}</p>
    </div>
  );
};

export default Loader;
