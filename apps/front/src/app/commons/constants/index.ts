import { Token } from "@monopoly-wallet/shared-types";
import { TokenOption } from "../interfaces";

const tokens = Object.entries(Token);

export const TOKEN_OPTIONS: TokenOption[] = tokens.map(([key, value]): TokenOption => ({
  label: value,
  value: key as Token
}))