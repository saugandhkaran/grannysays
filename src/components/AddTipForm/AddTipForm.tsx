'use client';

import React, { useState, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';
import { Tip, Tag as TagType, TipTag, GrannySaying, Tag } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import { components } from 'react-select';
import { countries } from './countries';

// Import the country data and helper function
const countriesData = countries;


// Mock Data (for demonstration)
const categories = ['Home', 'Garden', 'Cooking', 'Health', 'Life', 'Fitness', 'Relationships', 'Organization', 'DIY'];

// load all tags from /api/tags on page load and memoize the result


// Form Components
interface AddTipFormProps {
  existingTip?: {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: TipTag[];
    sayings: GrannySaying[];
  };
  isEditing?: boolean;
}

const AddTipForm: React.FC<AddTipFormProps> = ({ existingTip, isEditing = false }) => {
  // State for the form fields
  const [title, setTitle] = useState(existingTip?.title || '');
  const [description, setDescription] = useState(existingTip?.description || '');
  const [category, setCategory] = useState(existingTip?.category || '');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(existingTip?.tags.map(tag => tag.tagId) || []);
  const [sayings, setSayings] = useState<GrannySayingForm[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [availableTags, setAvailableTags] = useState<TagType[]>([]);

  // fetch tags from /api/tags and assign the value to availableTags on page load once
  useMemo(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        setAvailableTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  // Load existing sayings when the component mounts if in edit mode
  React.useEffect(() => {
    if (existingTip?.sayings && existingTip.sayings.length > 0) {
      const formattedSayings = existingTip.sayings.map(saying => {
        const country = countriesData.find(c => c.code === saying.country) || {} as typeof countriesData[0];
        return {
          id: saying.id ?? crypto.randomUUID(),
          country,
          saying: saying.saying,
          verified: saying.verified || false
        };
      });
      setSayings(formattedSayings);
    }
  }, [existingTip]);
  
  // Local state for managing granny sayings form
  interface GrannySayingForm {
    id: string;
    country: typeof countriesData[0];
    saying: string;
    verified: boolean;
  }

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  // Tag selection handler
  const handleTagChange = (tagId: string) => {
    setSelectedTagIds((prevTagIds) =>
      prevTagIds.includes(tagId)
        ? prevTagIds.filter((id) => id !== tagId)
        : [...prevTagIds, tagId]
    );
  };

  // Add a new granny saying form
  const addGrannySaying = () => {
    setSayings([...sayings, { id: crypto.randomUUID(), country: {} as typeof countriesData[0], saying: '', verified: false }]);
  };

    // Update a granny saying form
    const updateGrannySaying = (id: string, field: keyof GrannySayingForm, value: any) => {
        setSayings(sayings.map(saying =>
            saying.id === id ? { ...saying, [field]: value } : saying
        ));
    };

  // Delete a granny saying form
  const deleteGrannySaying = (id: string) => {
    setSayings(sayings.filter(saying => saying.id !== id));
  };

  // Validation function
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    if (!description.trim()) {
      errors.description = 'Description is required';
    }
    if (!category) {
      errors.category = 'Category is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    // Construct the tip object (adapt to your actual API)
    const tipData: Partial<Tip> = {
      title,
      description,
      category,
      tags: selectedTagIds.map(tagId => ({
        tipId: existingTip?.id || '', // Will be populated by backend for new tips
        tagId,
        tip: {} as Tip, // Will be populated by the backend
        tag: {} as Tag,
        name: availableTags.find(tag => tag.id === tagId)?.name || '',
      })),
      sayings: sayings.map(s => ({
        id: s.id,
        country: s.country?.code,
        saying: s.saying,
        verified: s.verified || false,
        tip: {} as Tip, // Will be populated by the backend
      })),
    };

    // For new tips, add the tipNumber and date
    if (!isEditing) {
      tipData.tipNumber = Math.floor(Math.random() * 10000); // Random number for demonstration
      tipData.date = new Date();
    }

    try {
      // Determine endpoint and method based on whether we're editing or creating
      const endpoint = isEditing ? `/api/tips/${existingTip?.id}` : '/api/tips';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'submit'} tip`);
      }
      
      const result = await response.json();
      console.log(`Tip ${isEditing ? 'updated' : 'submitted'} successfully:`, result);
      
      if (!isEditing) {
        // Only reset the form if creating a new tip
        setTitle('');
        setDescription('');
        setCategory('');
        setSelectedTagIds([]);
        setSayings([]);
      }
      
      setFormErrors({});
      setSubmissionStatus('success');
    } catch (error) {
      console.error(`Failed to ${isEditing ? 'update' : 'submit'} tip:`, error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

    // Memoize the country options for the select component
    const countryOptions = useMemo(() => {
        return countriesData.map(country => ({
            value: country.code,
            ...country
        }));
    }, []);

    // Custom components for react-select-country-list
    const FlagOption = (props: any) => (
        <components.Option {...props}>
            {props.data && props.data.code && (
                <span className="mr-2">
                    {/* You might need a library or custom component to render the flag based on props.data.code */}
                    {/* Example (using a simple text representation): */}
                    <span className="inline-block w-4 h-4 rounded-full border border-gray-300" style={{backgroundImage: `url(https://flagcdn.com/w40/${props.data.code.toLowerCase()}.png)`, backgroundSize: 'cover'}}></span>
                </span>
            )}
            {props.data && props.data.label}
        </components.Option>
    );

    const FlagValue = (props: any) => (
        <components.SingleValue {...props}>
            {props.data && props.data.code && (
                <span className="mr-2">
                   <span className="inline-block w-4 h-4 rounded-full border border-gray-300" style={{backgroundImage: `url(https://flagcdn.com/w40/${props.data.code.toLowerCase()}.png)`, backgroundSize: 'cover'}}></span>
                </span>
            )}
            {props.data && props.data.label}
        </components.SingleValue>
    );

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Title and Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            placeholder="Enter the tip title"
            disabled={isSubmitting}
          />
          {formErrors.title && (
            <p className="mt-2 text-sm text-red-600">{formErrors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-1 px-3 py-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.description ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            placeholder="Enter the tip description"
            rows={4}
            disabled={isSubmitting}
          />
          {formErrors.description && (
            <p className="mt-2 text-sm text-red-600">{formErrors.description}</p>
          )}
        </div>
      </div>

      {/* Category and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.category ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            disabled={isSubmitting}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {formErrors.category && (
            <p className="mt-2 text-sm text-red-600">{formErrors.category}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagChange(tag.id)}
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${selectedTagIds.includes(tag.id)
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                  disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={isSubmitting}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Granny Sayings */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Granny Sayings</label>
        <AnimatePresence>
          {sayings.map((sayingForm, index) => (
            <motion.div
              key={sayingForm.id}
              variants={{
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 20 },
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              className="border rounded-md p-4 mb-4 space-y-4 relative"
            >
              <h4 className="text-lg font-semibold">Saying {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Country Select */}
                <div>
                  <label htmlFor={`country-${sayingForm.id}`} className="block text-sm font-medium text-gray-700">Country</label>
                  <Select
                    id={`country-${sayingForm.id}`}
                    value={sayingForm.country}
                    onChange={(selectedOption) => updateGrannySaying(sayingForm.id, 'country', selectedOption ? selectedOption : '')}
                    options={countryOptions}
                    isSearchable
                    components={{ Option: FlagOption, SingleValue: FlagValue }}
                    placeholder="Select a country..."
                    className="mt-1"
                    isDisabled={isSubmitting}
                  />
                </div>
                {/* Verified Checkbox */}
              </div>
              {/* Saying Textarea */}
              <div>
                <label htmlFor={`saying-${sayingForm.id}`} className="block text-sm font-medium text-gray-700">Saying</label>
                <textarea
                  id={`saying-${sayingForm.id}`}
                  value={sayingForm.saying}
                  onChange={(e) => updateGrannySaying(sayingForm.id, 'saying', e.target.value)}
                  className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={2}
                  placeholder="Enter the granny saying"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="button"
                onClick={() => deleteGrannySaying(sayingForm.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 text-xs"
                disabled={isSubmitting}
              >
                Delete
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          type="button"
          // variant="outline" // Removed as it's not a valid HTML attribute
          onClick={addGrannySaying}
          className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-md px-4 py-2 flex items-center"
          disabled={isSubmitting}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Granny Saying
        </button>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 font-semibold" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : isEditing ? 'Update Tip' : 'Submit Tip'}
      </button>

      {/* Submission Status Messages */}
      {submissionStatus === 'success' && (
        <div className="mt-4 text-green-600 font-semibold text-center">
          Tip {isEditing ? 'updated' : 'submitted'} successfully!
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className="mt-4 text-red-600 font-semibold text-center">
          Failed to {isEditing ? 'update' : 'submit'} tip. Please try again.
        </div>
      )}
    </motion.form>
  );
};

export default AddTipForm;
