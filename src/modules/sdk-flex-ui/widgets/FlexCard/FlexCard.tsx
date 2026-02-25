import { useEffect, useRef, useState } from 'react';
import type { Init, Tools } from '../../ext';
import styles from './FlexCard.module.css';
import { validateConfigurationRouting } from '../../configurations/routing/validators/validateConfigurationRouting';

type FlexCardProps = {
  tools: Tools;
  init: Init;
};

export const FlexCard = ({ tools, init }: FlexCardProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [validationResult, setValidationResult] = useState<unknown>(null);
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

    tools
      .http({
        method: 'GET',
        url: init.routing,
      })
      .then((response) => {
        if (response.success) {
          const result = validateConfigurationRouting(response.data);
          setValidationResult(result);
        }
      });

    return () => {
      resizeObserver.disconnect();
    };
  }, [tools, init.routing]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.info}>
        Ширина: {Math.round(dimensions.width)}px | Высота:{' '}
        {Math.round(dimensions.height)}px
      </div>
      {validationResult !== null && (
        <div className={styles.result}>
          <pre>{JSON.stringify(validationResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
