import { getFullnodeUrl } from '@mysten/sui.js/client';
import { createNetworkConfig } from '@mysten/dapp-kit';
import { COUNTER_PACKAGE_ID } from './constants';

const { networkConfig, useNetworkVariable } =
  createNetworkConfig({
    testnet: {
      url: getFullnodeUrl('testnet'),
      variables: {
        counterPackageId: COUNTER_PACKAGE_ID,
      },
    },
    mainnet: {
      url: getFullnodeUrl('mainnet'),
      variables: {
        counterPackageId: COUNTER_PACKAGE_ID,
      },
    },
  });

export { useNetworkVariable, networkConfig };
