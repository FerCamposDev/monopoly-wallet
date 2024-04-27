import { Token } from '@monopoly-wallet/shared-types';

export const getTokenImagePath = (token: Token) => {
  return `/assets/images/tokens/${token}.png`;
};