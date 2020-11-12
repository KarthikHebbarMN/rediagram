import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type ElasticLoadBalancingType = 'Application load balancer' | 'Classic load balancer' | 'Network load balancer';

function resolveImage(type?: ElasticLoadBalancingType): string {
  switch (type) {
    case 'Application load balancer':
      return resolveAsset('networking-content-delivery/ElasticLoadBalancing/Application-load-balancer.png');
    case 'Classic load balancer':
      return resolveAsset('networking-content-delivery/ElasticLoadBalancing/Classic-load-balancer.png');
    case 'Network load balancer':
      return resolveAsset('networking-content-delivery/ElasticLoadBalancing/Network-load-balancer.png');
    default:
      return resolveAsset('networking-content-delivery/ElasticLoadBalancing.png');
  }
}

function useIcon(type?: ElasticLoadBalancingType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type ElasticLoadBalancingProps = {
  type?: ElasticLoadBalancingType;
  name: string;
} & AWSDependences;

export const ElasticLoadBalancing: FC<ElasticLoadBalancingProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};
