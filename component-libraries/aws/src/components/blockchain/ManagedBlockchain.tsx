import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type ManagedBlockchainType = 'Blockchain';

export type ManagedBlockchainProps = {
  type?: ManagedBlockchainType;
  name: string;
} & HasDependences;

function resolveImage(type?: ManagedBlockchainType): string {
  switch (type) {
    case 'Blockchain':
      return resolve(__dirname, '../../../assets/blockchain/ManagedBlockchain/Blockchain.png');
    default:
      return resolve(__dirname, '../../../assets/blockchain/ManagedBlockchain.png');
  }
}

function useIcon(type?: ManagedBlockchainType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const ManagedBlockchain: FC<ManagedBlockchainProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ManagedBlockchain.displayName = 'ManagedBlockchain';
