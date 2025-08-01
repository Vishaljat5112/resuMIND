import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50"></div>
      <p className="ml-4 text-blue-600 font-medium">Analyzing resume...</p>
    </div>
  );
};

export default Loader;