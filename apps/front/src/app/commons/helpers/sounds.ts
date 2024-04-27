import { LocalStorageKey } from '../enums/storage.enum';

const sentAudio = new Audio('/assets/sounds/confirm-jingle.wav');
const bankSentAudio = new Audio('/assets/sounds/notification-1.wav');
const receivedAudio = new Audio('/assets/sounds/cash-register-purchase.wav');
const errorAudio1 = new Audio('/assets/sounds/error-3.wav');
const userEnterAudio = new Audio('/assets/sounds/user-enter.wav');
const userLeaveAudio = new Audio('/assets/sounds/user-leave.wav');

export enum MuteStatus {
  true = 'true',
  false = 'false',
}

export const setMute = (status: MuteStatus) => {
  localStorage.setItem(LocalStorageKey.Mute, status);
};

export const isMute = () => {
  return localStorage.getItem(LocalStorageKey.Mute) === MuteStatus.true;
};

const sent = () => {
  if (isMute()) return;
  sentAudio.play();
};

const bankSent = () => {
  if (isMute()) return;
  bankSentAudio.play();
};

const received = () => {
  if (isMute()) return;
  receivedAudio.play();
};

const transactionError = () => {
  if (isMute()) return;
  errorAudio1.play();
};

const userEnter = () => {
  if (isMute()) return;
  userEnterAudio.play();
};

const userLeave = () => {
  if (isMute()) return;
  userLeaveAudio.play();
};

export const sounds = {
  sent,
  received,
  bankSent,
  transactionError,
  userEnter,
  userLeave,
};
