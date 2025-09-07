'use client';

import dynamic from 'next/dynamic';
import { Toaster as SonnerToaster } from 'sonner';

// Create a client-side only version of the Toaster
const Toaster = () => (
  <SonnerToaster
    position="top-center"
    toastOptions={{
      style: {
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        border: '1px solid hsl(var(--border))',
      },
    }}
  />
);

// Export as a dynamic component with no SSR
export default dynamic(() => Promise.resolve(Toaster), {
  ssr: false,
});
