// ==============================|| CUSTOM - Table CARD ||============================== //
import React from 'react';

const TableCard = ({ children } : Readonly<{  children: React.ReactNode }> ) => {
  return <div style={{ margin: '0 -20px -20px -20px' }}>{children}</div>;
};

export default TableCard;
