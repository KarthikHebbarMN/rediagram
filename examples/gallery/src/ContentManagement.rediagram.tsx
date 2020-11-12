import React from 'react';
import { PNG, Diagram, GeneralIcon } from 'rediagram';
import {
  GCP,
  CloudLoadBalancing,
  InvizGCP,
  CloudDNS,
  ComputeEngine,
  Zone,
  CloudStorage,
  CloudSQL,
  TitleBar,
} from '@rediagram/gcp';

PNG(
  <Diagram title={<TitleBar>Content Management</TitleBar>}>
    <InvizGCP>
      <GeneralIcon name="iOS/Android/Web" type="Mobile client" upstream={['DNS', 'Load Balancer']} />
      <GeneralIcon name="Publisher" type="Client" upstream={['Content Server2']} />
      <GCP>
        <CloudDNS name="DNS" />
        <CloudLoadBalancing name="Load Balancer" upstream={['Content Server1', 'Content Server2']} />
        <Zone title="Zone A">
          <ComputeEngine
            name="Content Server1"
            description="Auto Scaling"
            upstream={['Static Content', 'Dynamic Content']}
          />
        </Zone>
        <Zone title="Zone B">
          <ComputeEngine
            name="Content Server2"
            description="Auto Scaling"
            upstream={['Static Content', 'Dynamic Content']}
          />
        </Zone>
        <CloudStorage name="Static Content" />
        <CloudSQL name="Dynamic Content" />
      </GCP>
    </InvizGCP>
  </Diagram>,
);
