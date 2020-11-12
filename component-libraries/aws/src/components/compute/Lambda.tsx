import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type LambdaType = 'Lambda Function';

export type LambdaProps = {
  type?: LambdaType;
  name: string;
} & AWSDependences;

function resolveImage(type?: LambdaType): string {
  switch (type) {
    case 'Lambda Function':
      return resolveAsset('compute/Lambda/Lambda-Function.png');
    default:
      return resolveAsset('compute/Lambda.png');
  }
}

function useIcon(type?: LambdaType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const Lambda: FC<LambdaProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

Lambda.displayName = 'Lambda';
