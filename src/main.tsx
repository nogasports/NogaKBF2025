import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './ErrorBoundary';
import { monitoring } from './lib/monitoring';

// Global error handler for uncaught exceptions
window.onerror = (message, source, lineno, colno, error) => {
  monitoring.logError(error || new Error(String(message)), {
    source,
    lineno,
    colno,
    type: 'uncaught_exception'
  });
};

// Global handler for unhandled promise rejections
window.onunhandledrejection = (event) => {
  monitoring.logError(event.reason, {
    type: 'unhandled_rejection',
    promise: event.promise
  });
};

// Enable React profiling in development
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.REACT_PROFILER_ENABLED = true;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);