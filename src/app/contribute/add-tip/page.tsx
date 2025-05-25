import React from 'react';
import AddTipForm
 from '@/components/AddTipForm/AddTipForm';
const AddTip = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-bold mt-8">Add a Tip</h1>
      <p className="mt-4 text-gray-600 mb-8">Share your knowledge with the community!</p>
      <AddTipForm />
    </div>
  );
}

export default AddTip;