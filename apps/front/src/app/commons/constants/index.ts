import { PaymentReason, Token } from '@monopoly-wallet/shared-types';
import { Option, TokenOption } from '../interfaces';

const tokens = Object.entries(Token);

export const TOKEN_OPTIONS: TokenOption[] = tokens.map(([key, value]): TokenOption => ({
  label: value,
  value: key as Token,
}));

export const COLLECT_PAYMENT_REASONS_OPTIONS: Option<PaymentReason>[] = [
  {
    label: PaymentReason.LUCK_CARD,
    value: PaymentReason.LUCK_CARD,
  },
  {
    label: PaymentReason.ARK_CARD,
    value: PaymentReason.ARK_CARD,
  },
];

export const P2P_PAYMENT_REASONS_OPTIONS: Option<PaymentReason>[] = [
  {
    label: PaymentReason.BUY_PROPERTY,
    value: PaymentReason.BUY_PROPERTY,
  },
  {
    label: PaymentReason.RENT,
    value: PaymentReason.RENT,
  },
  {
    label: PaymentReason.TRADE,
    value: PaymentReason.TRADE,
  },
  {
    label: PaymentReason.LUCK_CARD,
    value: PaymentReason.LUCK_CARD,
  },
  {
    label: PaymentReason.ARK_CARD,
    value: PaymentReason.ARK_CARD,
  },
];

export const TO_BANK_PAYMENT_REASONS_OPTIONS: Option<PaymentReason>[] = [
  {
    label: PaymentReason.BUY_PROPERTY,
    value: PaymentReason.BUY_PROPERTY,
  },
  {
    label: PaymentReason.BUILD,
    value: PaymentReason.BUILD,
  },
  {
    label: PaymentReason.UN_MORTGAGE,
    value: PaymentReason.UN_MORTGAGE,
  },
  {
    label: PaymentReason.LUCK_CARD,
    value: PaymentReason.LUCK_CARD,
  },
  {
    label: PaymentReason.ARK_CARD,
    value: PaymentReason.ARK_CARD,
  },
  {
    label: PaymentReason.JAIL,
    value: PaymentReason.JAIL,
  },
  {
    label: PaymentReason.TAXES,
    value: PaymentReason.TAXES,
  },
];

export const BANK_PAYMENT_REASONS_OPTIONS: Option<PaymentReason>[] = [
  {
    label: PaymentReason.BUILD,
    value: PaymentReason.BUILD,
  },
  {
    label: PaymentReason.MORTGAGE,
    value: PaymentReason.MORTGAGE,
  },
  {
    label: PaymentReason.LUCK_CARD,
    value: PaymentReason.LUCK_CARD,
  },
  {
    label: PaymentReason.ARK_CARD,
    value: PaymentReason.ARK_CARD,
  },
  {
    label: PaymentReason.START,
    value: PaymentReason.START,
  },
];