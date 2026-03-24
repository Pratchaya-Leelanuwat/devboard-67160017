const LoadingSpinner = () => {
  return (
    <div className="text-center p-20">
      <div className="inline-block w-10 h-10 border-t-2 border-blue-800 rounded-full animate-spin" />
      <p className="mt-4 text-gray-600">กำลังโหลด...</p>
    </div>
  );
};

export default LoadingSpinner;
