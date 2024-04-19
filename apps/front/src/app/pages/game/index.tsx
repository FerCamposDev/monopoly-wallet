
import { AccountBalanceOutlined, AccountBalanceWalletOutlined } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Stack } from "@mui/material";
import React from "react";
import UserScreen from "../../components/game-screens/User";
import BankScreen from "../../components/game-screens/Bank";
import withAuth from "../../hocs/withAuth";
import RoomLayout from "../../components/shared/RoomLayout";
import QRScanButton from "../../components/shared/QRScanButton";
import { useNavigate, useParams } from "react-router-dom";
import { getTabPath } from "../../commons/helpers/routes";

export enum GameTab {
  User = 'user',
  Bank = 'bank',
}

export function GamePage() {
  const { tab = GameTab.User } = useParams<{ tab: GameTab}>();
  const navigate = useNavigate();

  const screenMap = {
    [GameTab.User]: <UserScreen />,
    [GameTab.Bank]: <BankScreen />,
  };


  const handleChangeTab = (_e: React.SyntheticEvent, newValue: GameTab) => {
    navigate(getTabPath(newValue));
  }

  return (
    <RoomLayout isBankTab={tab === GameTab.Bank}>
      <Stack maxHeight="100vh" height="100%" justifyContent="space-between">
        {screenMap[tab]}

        <BottomNavigation
          showLabels
          value={tab}
          onChange={handleChangeTab}
        >
          <BottomNavigationAction value={GameTab.User} label="User" icon={<AccountBalanceWalletOutlined />} />
          <BottomNavigationAction value={GameTab.Bank} label="Bank" icon={<AccountBalanceOutlined />} />
        </BottomNavigation>
      </Stack>
      <QRScanButton />
    </RoomLayout>
  );
}

export default withAuth(GamePage);
