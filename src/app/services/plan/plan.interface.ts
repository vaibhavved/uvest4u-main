export interface plan {
    planId: string,
    planName: string,
    planPrice: number
}
export interface PayPlan {
    codeName: string,
    codeValue: string,
    groupName: string,
    id: number,
    sort: number,
    plan: plan[]
}