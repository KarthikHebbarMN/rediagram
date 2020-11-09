import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type S3GlacierType = 'Vault' | 'Archive';

export type S3GlacierProps = {
  type?: S3GlacierType;
  name: string;
} & AWSDependences;

function resolveImage(type?: S3GlacierType): string {
  switch (type) {
    case 'Vault':
      return resolveAsset('storage/S3Glacier/Vault.png');
    case 'Archive':
      return resolveAsset('storage/S3Glacier/Archive.png');
    default:
      return resolveAsset('storage/S3Glacier.png');
  }
}

function useIcon(type?: S3GlacierType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const S3Glacier: FC<S3GlacierProps> = ({ type, name, upstream, downstream, children, dependencesOption }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <IconNode
      name={name}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
      dependencesOption={dependencesOption}
    />
  );
};

S3Glacier.displayName = 'S3Glacier';
