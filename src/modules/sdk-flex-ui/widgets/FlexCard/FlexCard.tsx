import { useEffect, useRef, useState } from 'react';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: 'grey',
  boxSizing: 'border-box',
  position: 'relative',
};

export const FlexCard = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={containerStyle}>
      <div>
        Ширина: {Math.round(dimensions.width)}px | Высота:{' '}
        {Math.round(dimensions.height)}px
      </div>
    </div>
  );
};
