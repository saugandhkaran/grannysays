import React from 'react';

export const dynamic = 'force-dynamic';

export default function TipsLayout({
  children,
  drawer
}: {
  children: React.ReactNode;
  drawer: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Main content container - keeping this stable prevents rerendering */}
      <div className="main-content">
        {children}
      </div>
      {/* Drawer rendered in a separate container that overlays the content */}
      {drawer}
    </div>
  );
}
