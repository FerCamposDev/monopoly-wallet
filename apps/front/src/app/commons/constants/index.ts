import { PaymentReason, Token } from "@monopoly-wallet/shared-types";
import { Option, TokenOption } from "../interfaces";

const tokens = Object.entries(Token);

export const TOKEN_OPTIONS: TokenOption[] = tokens.map(([key, value]): TokenOption => ({
  label: value,
  value: key as Token
}))

const paymentReasons = Object.entries(PaymentReason);

export const PAYMENT_REASONS_OPTIONS: Option<PaymentReason>[] = paymentReasons.map(
  ([key, value]): Option<PaymentReason> => ({
    label: value,
    value: key as PaymentReason
  })
)