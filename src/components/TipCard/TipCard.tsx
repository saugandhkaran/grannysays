import React from 'react';

export interface TipCardProps {
  title: string;
  tags: string[];
  tipNumber: number;
  date: string;
  category: string;
  onclickfunction?: () => void;
}

export enum CategoryTypes {
  HEALTH = 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-700/50',
  FITNESS = 'bg-yellow-50 text-yellow-700 ring-yellow-600/10 dark:bg-yellow-700/50',
  LIFESTYLE = 'bg-blue-50 text-blue-700 ring-blue-600/10 dark:bg-blue-700/50',
  GARDEN = 'bg-indigo-50 text-indigo-700 ring-indigo-600/10 dark:bg-indigo-700/50',
  FOOD = 'bg-green-50 text-green-700 ring-green-600/10 dark:bg-green-700/50',
  DEFAULT = 'bg-purple-50 text-purple-700 ring-purple-600/10 dark:bg-purple-700/50'
}


export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Health':
      return CategoryTypes.HEALTH;
    case 'Fitness':
      return CategoryTypes.FITNESS;
    case 'Life':
      return CategoryTypes.LIFESTYLE;
    case 'Garden':
      return CategoryTypes.GARDEN;
    case 'Cooking':
      return CategoryTypes.FOOD;
    default:
      return CategoryTypes.DEFAULT;
  }
}

const TipCard: React.FC<TipCardProps> = (props) => {
  const { title, category, onclickfunction } = props;
  const categoryStyleClass = getCategoryColor(category);
  return (
    <div className={`rounded-lg shadow-md overflow-hidden min-h-32 cursor-pointer ${categoryStyleClass}`} onClick={onclickfunction}>
      <div className='px-6 py-4 border-b border-gray-200'>
        <h3 className='text-l font-semibold text-gray-800 dark:text-white'>{title}</h3>
      </div>

      <div className='px-6 py-4 bg-gray-100 border-t border-gray-200 dark:bg-gray-200 flex justify-end space-x-2 position-fixed bottom-0'>
      {/* {tags.map((tag, index) => (
        <span key={index} className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">{tag}</span>
      ))} */}
      <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">{category}</span>
      {/* <div className='flex items-center space-x-2'>
       <span>{`#${tipNumber}`}</span>
       <span>{date}</span>
       <span>{category}</span>
      </div> */}
      </div>
    </div>

  );
};

export default TipCard;