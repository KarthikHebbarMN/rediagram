import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type RDSType =
  | 'Aurora'
  | 'Aurora alt'
  | 'MariaDB'
  | 'MariaDB alt'
  | 'MySQL'
  | 'MySQL alt'
  | 'on VMware'
  | 'Oracle'
  | 'Oracle alt'
  | 'PIOPS'
  | 'PostgreSQL'
  | 'PostgreSQL alt'
  | 'RDS'
  | 'RDS alt'
  | 'SQL Server'
  | 'SQL Server alt';

function resolveImage(type?: RDSType): string {
  switch (type) {
    case 'Aurora':
      return resolveAsset('database/RDS/Aurora.png');
    case 'Aurora alt':
      return resolveAsset('database/RDS/Aurora-alt.png');
    case 'MariaDB':
      return resolveAsset('database/RDS/MariaDB.png');
    case 'MariaDB alt':
      return resolveAsset('database/RDS/MariaDB-alt.png');
    case 'MySQL':
      return resolveAsset('database/RDS/MySQL.png');
    case 'MySQL alt':
      return resolveAsset('database/RDS/MySQL-alt.png');
    case 'on VMware':
      return resolveAsset('database/RDS/on-VMware.png');
    case 'Oracle':
      return resolveAsset('database/RDS/Oracle.png');
    case 'Oracle alt':
      return resolveAsset('database/RDS/Oracle-alt.png');
    case 'PIOPS':
      return resolveAsset('database/RDS/PIOPS.png');
    case 'PostgreSQL':
      return resolveAsset('database/RDS/PostgreSQL.png');
    case 'PostgreSQL alt':
      return resolveAsset('database/RDS/PostgreSQL-alt.png');
    case 'RDS':
      return resolveAsset('database/RDS/RDS.png');
    case 'RDS alt':
      return resolveAsset('database/RDS/RDS-alt.png');
    case 'SQL Server':
      return resolveAsset('database/RDS/SQL-Server.png');
    case 'SQL Server alt':
      return resolveAsset('database/RDS/SQL-Server-alt.png');
    default:
      return resolveAsset('database/RDS.png');
  }
}

function useIcon(type?: RDSType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined || type === 'on VMware' ? 56 : 37,
    };
  }, [type]);
}

export type RDSProps = {
  type?: RDSType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Relational Database Service');
      case 'medium':
        return SubLabel('Relational Database Service');
      default:
        return SubLabel('RDS');
    }
  }
  return undefined;
}

export const RDS: FC<RDSProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

RDS.displayName = 'RDS';
