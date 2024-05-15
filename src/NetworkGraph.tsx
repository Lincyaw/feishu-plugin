import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import { fetchTableData } from './api';

interface NetworkGraphProps {
  onGraphLoaded: (message: string, type: string) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ onGraphLoaded }) => {
  const networkContainerRef = useRef(null);

  useEffect(() => {
    const initializeGraph = async () => {
      try {
        const { nodesArray, edges } = await fetchTableData();

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

        new Network(networkContainerRef.current, data, options);

        onGraphLoaded('Graph loaded successfully!', 'success');
      } catch (error) {
        onGraphLoaded('Failed to load graph', 'error');
      }
    };

    initializeGraph();
  }, [onGraphLoaded]);

  return <div ref={networkContainerRef} style={{ height: '600px', border: '1px solid lightgray', marginTop: '20px' }}></div>;
};

export default NetworkGraph;
