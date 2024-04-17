const sentAudio = new Audio('/assets/sounds/confirm-jingle.wav');
const receivedAudio = new Audio('/assets/sounds/cash-register-purchase.wav');

export const useSounds = () => {

  const sent = () => {
    sentAudio.play();
  }

  const received = () => {
    receivedAudio.play();
  }

  return {
    success: {
      sent,
      received,
    },
  }
}