import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type IoTEventsProps = {
  name: string;
} & HasDependences;

function resolveImage(): string {
  return resolve(__dirname, '../../../assets/internet-of-things/IoTEvents.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

export const IoTEvents: FC<IoTEventsProps> = ({ name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

IoTEvents.displayName = 'IoTEvents';
