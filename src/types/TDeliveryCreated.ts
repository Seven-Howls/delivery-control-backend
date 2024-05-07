export type TDeliveryCreated = {
    id?: string,
    deliveryFeeId: string,
    motoboyId: string,
    paymentMethodId: string,
    statusId: string,
    productValue: number,
    serviceFee: number,
    equityValue: number,
    commandId: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null
}
