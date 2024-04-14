import { Token } from "@monopoly-wallet/shared-types";

export interface Option<T> {
  label: string;
  value: T;
}

export interface TokenOption extends Option<Token> {
  usedBy?: string
}