import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import TanstackProvider from './libs/tanstack/TanstackProvider';
import { BrowserRouter } from 'react-router-dom';
import RootErrorBoundary from './components/RootErrorBoundary';

const Main = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      console.log(event);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
    }
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <RootErrorBoundary>
          <TanstackProvider>
            <App />
            {deferredPrompt && (
              <button onClick={handleInstallClick}>
                Install PWA
              </button>
            )}
          </TanstackProvider>
        </RootErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Main />
);
