import { Routes } from "../enums/routes.enum"

export const getRoomPath = (roomName: string) => {
  return Routes.RoomByName.replace(':name', roomName);
}