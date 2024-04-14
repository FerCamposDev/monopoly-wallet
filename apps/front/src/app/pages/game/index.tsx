
import { AccountBalanceOutlined, AccountBalanceWalletOutlined } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Grid, Stack } from "@mui/material";
import { useState } from "react";
import UserScreen from "../../components/game-screens/User";
import BankScreen from "../../components/game-screens/Bank";
import withAuth from "../../hocs/withAuth";
import RoomLayout from "../../components/shared/RoomLayout";

enum Screen {
  User,
  Bank
}

export function GamePage() {
  const [value, setValue] = useState<Screen>(Screen.User);

  const screenMap = {
    [Screen.User]: <UserScreen />,
    [Screen.Bank]: <BankScreen />,
  };

  return (
    <RoomLayout>
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
    </RoomLayout>
  );
}

export default withAuth(GamePage);
