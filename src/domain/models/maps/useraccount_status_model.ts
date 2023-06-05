export type UserAccountType = 'unverifiableIdentity' | 'awaitingReview' | 'approved' | 'rejected' | 'locked'

export const UserAccountStatusMap: Record<UserAccountType, number> = {
  unverifiableIdentity: 1,
  awaitingReview: 2,
  approved: 3,
  rejected: 4,
  locked: 5
}
