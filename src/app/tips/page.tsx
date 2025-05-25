'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import TipCard from '../../components/TipCard/TipCard';
import SearchBar from '../../components/Search/SearchBar';
import { Tip } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';
import SlidingDrawer from '@/components/SlidingDrawer/SlidingDrawer';
import { getTipById } from '@/lib/tips';
import { se } from 'date-fns/locale';

export const dynamic = "force-dynamic"

const TipSearch: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [tips, setTips] = useState<Tip[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [tipDetails, setTipDetails] = useState<Tip | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Reference for the last tip element
  const lastTipElementRef = useCallback((node: HTMLDivElement | null) => {
    // Skip if still loading
    if (loading) return;
    
    // Disconnect previous observer if it exists
    if (observer.current) observer.current.disconnect();
    
    // Create a new observer
    observer.current = new IntersectionObserver(entries => {
      // If the last element is visible and we have more items to load
      if (entries[0]?.isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { threshold: 0.5 });
    
    // Observe the last element
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleCardClick = async (tip: Tip) => {
    //router.push(`/tips/${tip.id}`);
    const tipId = tip?.id;
    const tipById = await fetch(`/api/tips/${tipId}`)
      .then(response => response.json())
      .catch(error => {
        console.error("Error fetching tip by ID:", error);
        return null;
      });
  
    if (!tipById) return null;
    
    const tipsObject = {
      tipById,
      sayings: tipById.sayings || []
    };

    setTipDetails(tipById);
  };

  const fetchTips = async (pageNum: number, isInitialLoad = false) => {
    if (isInitialLoad) {
      setInitialLoad(true);
    }
    setLoading(true);
    
    try {
      const response = await fetch(`/api/tips?page=${pageNum}`);
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setTips(prevTips => pageNum === 1 ? data : [...prevTips, ...data]);
      }
    } catch (error) {
      console.error("Error fetching tips:", error);
    } finally {
      setLoading(false);
      if (isInitialLoad) {
        setInitialLoad(false);
      }
    }
  };

  // Initial load of tips
  useEffect(() => {
    fetchTips(1, true);
  }, []);

  // Load more tips when page changes
  useEffect(() => {
    if (page > 1) {
      fetchTips(page);
    }
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search for Granny's Tips</h1>
      <p className="text-gray-600 mb-4">
        Find the best tips and tricks shared by our grandmothers. Click on a card to see more details.
      </p>
      
      {initialLoad ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p>Loading tips...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tips.map((tip, index) => {
              // Add ref to the last element
              if (tips.length === index + 1) {
                return (
                  <div key={tip.id} ref={lastTipElementRef}>
                    <TipCard
                      onclickfunction={() => handleCardClick(tip)}
                      title={tip.title}
                      tags={tip.tags}
                      tipNumber={tip.tipNumber}
                      date={tip.date}
                      category={tip.category}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={tip.id}>
                    <TipCard
                      onclickfunction={() => handleCardClick(tip)}
                      title={tip.title}
                      tags={tip.tags}
                      tipNumber={tip.tipNumber}
                      date={tip.date}
                      category={tip.category}
                    />
                  </div>
                );
              }
            })}
          </div>
          
          {loading && !initialLoad && (
            <div className="flex justify-center items-center py-4 mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {tipDetails && (
            <SlidingDrawer
              tipsObject={{ tip: tipDetails, sayings: tipDetails.sayings || [] }}
              onClose={() => setTipDetails(null)}
            />
          )}

          {/* Show message when no more tips are available */}
          
          {!hasMore && tips.length > 0 && (
            <div className="text-center text-gray-500 mt-8 py-4">
              You've reached the end of the tips!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TipSearch;