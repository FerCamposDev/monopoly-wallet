
import { AccountBalanceOutlined, AccountBalanceWalletOutlined } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Grid, Stack } from "@mui/material";
import { useState } from "react";
import UserScreen from "../screens/User";
import BankScreen from "../screens/Bank";
import { MOCK_PLAYER } from "../commons/mocks/player";

enum Screen {
  User,
  Bank
}

export function App() {
  const [value, setValue] = useState<Screen>(Screen.User);

  const screenMap = {
    [Screen.User]: <UserScreen player={MOCK_PLAYER} />,
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

export default App;
