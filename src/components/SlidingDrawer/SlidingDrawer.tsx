"use client";
import React, { useEffect, useRef } from 'react';
import { GrannySaying, Tip } from '@/lib/types';
import { useRouter } from 'next/navigation';

export interface TipsObject {
  tip: Tip;
  sayings: GrannySaying[];
}
export interface SlidingDrawerProps {
  tipsObject: TipsObject;
  onClose?: () => void;
}

const SlidingDrawer: React.FC<SlidingDrawerProps> = ({ tipsObject, onClose }) => {
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close the drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        // Use router.back() to preserve the browser history correctly
        router.back();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [router]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [router]);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    // Save the current overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto relative w-screen max-w-md" ref={drawerRef}>
              <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                <button
                  type="button"
                  onClick={() => onClose && onClose()}
                  className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                >
                  <span className="absolute -inset-2.5"></span>
                  <span className="sr-only">Close panel</span>
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className={`flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl dark:bg-slate-700`}>
                <div className="px-4 sm:px-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white" id="slide-over-title">{tipsObject.tip?.title}</h2>
                  <span className="inline-flex mt-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">{tipsObject.tip.category}</span>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <p className="mt-2 text-gray-900 dark:text-white">{tipsObject.tip?.description}</p>
                  {/* <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-2 dark:text-white">Granny's Sayings</h3> */}
                    {tipsObject.sayings.map((saying, index) => (
                      <div key={index} className="mb-2 p-2">
                        <dt className="font-medium text-gray-900 dark:text-white">{saying.country}</dt>
                        <div className="border-t border-gray-200 pt-4 dark:text-gray" />
                        <dd className="text-sm text-gray-500 dark:text-white">{saying.saying}</dd>
                      </div>
                    ))}
                </div>
                <button
                    onClick={() => router.push(`/contribute/edit-tip?id=${tipsObject.tip.id}`)}
                    className="mt-4 mb-4 mx-4 inline-flex items-center justify-center rounded-md bg-slate-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-400 focus:outline-hidden focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Add a saying to this topic?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
};

export default SlidingDrawer;
