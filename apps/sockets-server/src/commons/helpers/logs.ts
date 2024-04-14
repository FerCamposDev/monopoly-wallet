import { IP2PPayment, IPaymentFromBank, IPaymentToBank } from "@monopoly-wallet/shared-types";
import { Log } from "../../model/Log";

export const createPaymentP2PLog = (payment: IP2PPayment) => {
  return new Log(
    `${payment.from.token} sent to ${payment.to.token} $ ${payment.amount}.`,
    `${payment.reason}`
  );
}

export const createPaymentToBankLog = (payment: IPaymentToBank) => {
  return new Log(
    `${payment.from.token} sent to Bank $ ${payment.amount}.`,
    `${payment.reason}`
  );
}

export const createPaymentFromBankLog = (payment: IPaymentFromBank) => {
  return new Log(
    `Bank sent to ${payment.to.token} $ ${payment.amount}.`,
    `${payment.reason}`
  );
}