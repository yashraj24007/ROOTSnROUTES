import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-4">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
          Something went wrong
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        
        <details className="mb-4">
          <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Error details
          </summary>
          <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded text-red-600 dark:text-red-400 overflow-auto">
            {error.message}
          </pre>
        </details>
        
        <div className="flex space-x-3">
          <button
            onClick={resetErrorBoundary}
            className="flex-1 bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

export default function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Application Error:', error);
        console.error('Error Info:', errorInfo);
      }}
      onReset={() => {
        // Optionally clear any app state here
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}