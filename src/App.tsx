import React, { useState } from 'react';
import { Alert, AlertProps } from 'antd';
import NetworkGraph from './NetworkGraph';

const App: React.FC = () => {
  const [info, setInfo] = useState('get table name, please waiting ....');
  const [alertType, setAlertType] = useState<AlertProps['type']>('info');

  const handleGraphLoaded = (message: string, type: AlertProps['type']) => {
    setInfo(message);
    setAlertType(type);
  };

  return (
    <div>
      <Alert message={info} type={alertType} />
      <NetworkGraph onGraphLoaded={handleGraphLoaded} />
    </div>
  );
};

export default App;
