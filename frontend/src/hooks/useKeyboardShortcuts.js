import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case 'q':
            event.preventDefault();
            navigate('/trade/voltbox');
            break;
          case 'm':
            event.preventDefault();
            navigate('/market-data');
            break;
          case 'a':
            event.preventDefault();
            navigate('/ai-thinking');
            break;
          case 's':
            event.preventDefault();
            navigate('/search');
            break;
          case 'c':
            event.preventDefault();
            navigate('/control-panel');
            break;
          case 't':
            event.preventDefault();
            navigate('/trades');
            break;
          case 'h':
            event.preventDefault();
            navigate('/hotel-finder');
            break;
          case 'b':
            event.preventDefault();
            navigate('/boardroom');
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
};
