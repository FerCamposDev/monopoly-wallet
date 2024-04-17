import { LocalStorageKey } from "../enums/storage.enum";

const sentAudio = new Audio('/assets/sounds/confirm-jingle.wav');
const bankSentAudio = new Audio('/assets/sounds/notification-1.wav');
const receivedAudio = new Audio('/assets/sounds/cash-register-purchase.wav');

export enum MuteStatus {
  true = 'true',
  false = 'false',
}

export const setMute = (status: MuteStatus) => {
  localStorage.setItem(LocalStorageKey.Mute, status);
}

export const isMute = () => {
  return localStorage.getItem(LocalStorageKey.Mute) === MuteStatus.true;
}

const sent = () => {
  if (!isMute()) {
    sentAudio.play();
  }
}

const bankSent = () => {
  if (!isMute()) {
    bankSentAudio.play();
  }
}

const received = () => {
  if (!isMute()) {
    receivedAudio.play();
  }
}

export const sounds = {
  sent,
  received,
  bankSent,
}
