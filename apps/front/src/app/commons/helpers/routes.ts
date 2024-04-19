import { GameTab } from "../../pages/game";
import { Routes } from "../enums/routes.enum"

export const getRoomPath = (roomName: string) => {
  return Routes.RoomByName.replace(':name', roomName);
}

export const getTabPath = (tab: GameTab) => {
  return Routes.GameTab.replace(':tab', tab);
}