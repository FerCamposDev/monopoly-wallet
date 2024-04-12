
import { AccountBalanceOutlined, AccountBalanceWalletOutlined } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Grid, Stack } from "@mui/material";
import { useState } from "react";
import UserScreen from "../../components/game-screens/User";
import BankScreen from "../../components/game-screens/Bank";
import { useGame } from "../../context/game/useGame";
import withAuth from "../../hocs/withAuth";

enum Screen {
  User,
  Bank
}

export function GamePage() {
  const [value, setValue] = useState<Screen>(Screen.User);
  const { player, game } = useGame();

  if (!player || !game) return null;

  const screenMap = {
    [Screen.User]: <UserScreen player={player} />,
    [Screen.Bank]: <BankScreen />,
  };

  return (
    <Stack height="100vh">
      <Grid container height="100%">
        {screenMap[value]}
      </Grid>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(_e, newValue) => { setValue(newValue) }}
      >
        <BottomNavigationAction label="User" icon={<AccountBalanceWalletOutlined />} />
        <BottomNavigationAction label="Bank" icon={<AccountBalanceOutlined />} />
      </BottomNavigation>
    </Stack>
  );
}

export default withAuth(GamePage);
