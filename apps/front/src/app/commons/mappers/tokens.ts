import { Token } from '@monopoly-wallet/shared-types';
import { Color } from '@mui/material';
import {
  red,
  brown,
  teal,
  pink,
  yellow,
  blueGrey,
  blue,
  amber,
  lightBlue,
  deepPurple,
  cyan,
  orange,
  lime,
} from '@mui/material/colors';

export const colorByToken: Record<Token, Color> = {
  [Token.Battleship]: red,
  [Token.Boot]: brown,
  [Token.Cannon]: teal,
  [Token.Cat]: pink,
  [Token.Duck]: yellow,
  [Token.Horse]: cyan,
  [Token.Iron]: blueGrey,
  [Token.Penguin]: lime,
  [Token.RaceCar]: blue,
  [Token.ScottieDog]: amber,
  [Token.Thimble]: deepPurple,
  [Token.TopHat]:  lightBlue,
  [Token.Wheelbarrow]: orange,
};
