import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { bitable, IAttachmentField } from '@lark-base-open/js-sdk';
import { Alert, AlertProps } from 'antd';
import { Network } from 'vis-network/standalone/esm/vis-network';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoadApp />
  </React.StrictMode>
);

function LoadApp() {
  const [info, setInfo] = useState('get table name, please waiting ....');
  const [alertType, setAlertType] = useState<AlertProps['type']>('info');
  const networkContainerRef = useRef(null);

  useEffect(() => {
    const fn = async () => {
      const table = await bitable.base.getTable("论文关系表");
      const records = await table.getRecords({
        pageSize: 5000,
      });

      const nodesMap = new Map();
      const edges = [];

      for (const record of records.records) {
        for (const from of record.fields.fldXO8AWUw.recordIds) {
          if (!nodesMap.has(from)) {
            nodesMap.set(from, { id: from, label: record.fields.fldXO8AWUw.text });
          }
          for (const to of record.fields.fldlGpQosO.recordIds) {
            if (!nodesMap.has(to)) {
              nodesMap.set(to, { id: to, label: record.fields.fldlGpQosO.text });
            }
            edges.push({ from, to, arrows: 'to' });
          }
        }
      }
      console.log(records.records)
      const nodesArray = Array.from(nodesMap.values());
      const data = {
        nodes: nodesArray,
        edges: edges,
      };

      const options = {
        nodes: {
          shape: 'dot',
          size: 16,
        },
        edges: {
          smooth: true,
        },
        physics: {
          enabled: true,
        },
      };

      const network = new Network(networkContainerRef.current, data, options);

      setInfo("Graph loaded successfully!");
      setAlertType('success');
    };

    fn();
  }, []);

  return (
    <div>
      <Alert message={info} type={alertType} />
      <div ref={networkContainerRef} style={{ height: '600px', border: '1px solid lightgray', marginTop: '20px' }}></div>
    </div>
  );
}
