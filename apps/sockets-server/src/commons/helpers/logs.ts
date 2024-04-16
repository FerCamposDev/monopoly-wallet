import { ILog, IP2PPayment, IPaymentFromBank, IPaymentToBank } from "@monopoly-wallet/shared-types";

export const createPaymentP2PLog = (payment: IP2PPayment): ILog => {
  return {
    date: new Date(),
    message: `${payment.from.token} sent to ${payment.to.token} $ ${payment.amount}.`,
    detail: `${payment.reason}`,
    from: payment.from,
    to: payment.to,
  }
}

export const createPaymentToBankLog = (payment: IPaymentToBank) => {
  return {
    date: new Date(),
    message: `${payment.from.token} sent to Bank $ ${payment.amount}.`,
    detail: `${payment.reason}`,
    from: payment.from,
  }
}

export const createPaymentFromBankLog = (payment: IPaymentFromBank) => {
  return {
    date: new Date(),
    message: `Bank sent to ${payment.to.token} $ ${payment.amount}.`,
    detail: `${payment.reason}`,
    to: payment.to,
  }
}