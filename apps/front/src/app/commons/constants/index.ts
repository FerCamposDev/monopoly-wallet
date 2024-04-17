import { PaymentReason, Token } from "@monopoly-wallet/shared-types";
import { Option, TokenOption } from "../interfaces";

const tokens = Object.entries(Token);

export const TOKEN_OPTIONS: TokenOption[] = tokens.map(([key, value]): TokenOption => ({
  label: value,
  value: key as Token
}))


export const PAYMENT_REASONS_OPTIONS: Option<PaymentReason>[] = [
  {
    label: PaymentReason.BUY_PROPERTY,
    value: PaymentReason.BUY_PROPERTY,
  },
  {
    label: PaymentReason.BUILD,
    value: PaymentReason.BUILD,
  },
  {
    label: PaymentReason.RENT,
    value: PaymentReason.RENT,
  },
  {
    label: PaymentReason.MORTGAGE,
    value: PaymentReason.MORTGAGE,
  },
  {
    label: PaymentReason.UN_MORTGAGE,
    value: PaymentReason.UN_MORTGAGE,
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
  {
    label: PaymentReason.JAIL,
    value: PaymentReason.JAIL,
  },
]

export const BANK_PAYMENT_REASONS_OPTIONS: Option<PaymentReason>[] = [
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
    label: PaymentReason.Start,
    value: PaymentReason.Start,
  }
]