'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AddTipForm from '@/components/AddTipForm/AddTipForm';
import { Tip, Tag, TipTag, GrannySaying } from '@/lib/types';

const EditTipPage = () => {
  const searchParams = useSearchParams();
  const tipId = searchParams.get('id');
  
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTip = async () => {
      if (!tipId) {
        setError('No tip ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/tips/${tipId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch tip');
        }
        
        const data = await response.json();
        setTip(data);
      } catch (err) {
        console.error('Error fetching tip:', err);
        setError('Failed to load tip data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, [tipId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">Edit Tip</h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !tipId) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">Edit Tip</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error || 'No tip ID provided'}</span>
        </div>
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">Edit Tip</h1>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Notice: </strong>
          <span className="block sm:inline">Tip not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Edit Tip</h1>
      <AddTipForm existingTip={tip} isEditing={true} />
    </div>
  );
};

export default EditTipPage;