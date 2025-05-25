'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import * as GsWhiteLogo from '../../images/gs-white.png';
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        setIsTransitioning(true);
        mobileMenuRef.current.classList.remove('hidden', 'transform', 'translate-y-[-100%]', 'opacity-0', 'duration-300', 'ease-out');
        mobileMenuRef.current.classList.add('transform', 'translate-y-0', 'opacity-100', 'duration-300', 'ease-in-out');
        const transitionEndHandler = () => {
          setIsTransitioning(false);
          mobileMenuRef.current?.removeEventListener('transitionend', transitionEndHandler);
        };
        mobileMenuRef.current.addEventListener('transitionend', transitionEndHandler);
      } else {
        setIsTransitioning(true);
        mobileMenuRef.current.classList.remove('transform', 'translate-y-0', 'opacity-100', 'duration-300', 'ease-in-out');
        mobileMenuRef.current.classList.add('transform', 'translate-y-[-100%]', 'opacity-0', 'duration-300', 'ease-out');
        const transitionEndHandler = () => {
          setIsTransitioning(false);
          mobileMenuRef.current?.classList.add('hidden');
          mobileMenuRef.current?.removeEventListener('transitionend', transitionEndHandler);
        };
        mobileMenuRef.current.addEventListener('transitionend', transitionEndHandler);
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <header>
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <Image className="size-8" src={GsWhiteLogo} alt="Granny Says" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/tips" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Tips</Link>
                  <Link href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Show a random tip</Link>
                  <Link href="/contribute/add-tip" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Add a tip</Link>
                </div>
              </div>
            </div>
            {/* ... (rest of the desktop menu and user icons) ... */}
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
                disabled={isTransitioning}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} size-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} size-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className="md:hidden hidden transform translate-y-[-100%] opacity-0 duration-300 ease-out"
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Tip</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Show a random tip</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contribute</a>
          </div>
        </div>
      </nav>
      <main>

      </main>
    </div>
    </header>
  );
}