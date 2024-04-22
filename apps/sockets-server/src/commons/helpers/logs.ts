import { ILog, IP2PPayment, IPaymentFromBank, IPaymentToBank } from "@monopoly-wallet/shared-types";

export const createPaymentP2PLog = (payment: IP2PPayment): ILog => {
  return {
    date: new Date(),
    message: `${payment.from.token} sent to ${payment.to.token}.`,
    detail: `${payment.reason}`,
    from: payment.from,
    to: payment.to,
    amount: payment.amount,
    reason: payment.reason,
  }
}

export const createPaymentToBankLog = (payment: IPaymentToBank): ILog => {
  return {
    date: new Date(),
    message: `${payment.from.token} sent to Bank.`,
    detail: `${payment.reason}`,
    from: payment.from,
    amount: payment.amount,
    reason: payment.reason,
  }
}

export const createPaymentFromBankLog = (payment: IPaymentFromBank): ILog => {
  return {
    date: new Date(),
    message: `Bank sent to ${payment.to.token}.`,
    detail: `${payment.reason}`,
    to: payment.to,
    amount: payment.amount,
    reason: payment.reason,
  }
}

export const createFailTransactionP2PLog = (payment: IP2PPayment): ILog => {
  return {
    date: new Date(),
    message: `${payment.from.token} send to ${payment.to.token}.`,
    detail: `${payment.reason}, Transaction failed`,
    from: payment.from,
    to: payment.to,
    amount: payment.amount,
    reason: payment.reason,
    fail: true,
  }
}