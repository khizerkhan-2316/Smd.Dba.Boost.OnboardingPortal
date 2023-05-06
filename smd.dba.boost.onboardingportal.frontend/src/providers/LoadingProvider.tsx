import React, { useState } from 'react';
import { LoadingContext } from '../context/LoadingContext';
import LinearProgress from '@mui/material/LinearProgress';

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />
      )}
      {children}
    </LoadingContext.Provider>
  );
};
