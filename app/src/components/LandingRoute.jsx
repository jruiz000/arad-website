import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTION_ID_BY_ROUTE } from '../routes/seo';
import App from '../App';

export function LandingRoute() {
  const location = useLocation();
  
  useEffect(() => {
    // Auto-scroll to the correct section based on the route
    const sectionId = SECTION_ID_BY_ROUTE[location.pathname];
    
    if (sectionId && sectionId !== 'hero') {
      // Small delay to ensure the page is rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (location.pathname === '/') {
      // Scroll to top for home page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);
  
  return <App />;
}
