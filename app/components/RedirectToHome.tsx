'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function RedirectToHome() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the window is top-level (not in an iframe)
    if (typeof window !== 'undefined' && window.self === window.top) {
       // We are not in an iframe, so redirect to home
       // Pass the current path as the blog param
       router.push(`/?blog=${pathname}`);
    }
  }, [pathname, router]);

  return null;
}

