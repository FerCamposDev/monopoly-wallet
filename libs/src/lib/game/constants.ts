import { Option } from "../ui";
import { Token } from "./token.enum";

export const TOKEN_OPTIONS: Option<Token>[] = Object.entries(Token).map(([key, value]): Option<Token> => ({
  label: value,
  value: key as Token
}))