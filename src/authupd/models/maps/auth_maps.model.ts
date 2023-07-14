export type UserAccountStatus = 'unverifiableIdentity' | 'awaitingReview' | 'approved' | 'rejected' | 'locked'

export type ProfileType = 'owners' | 'customers' | 'admins' | 'operators'

export const UserAccountStatusMap: Record<UserAccountStatus, number> = {
  unverifiableIdentity: 1,
  awaitingReview: 2,
  approved: 3,
  rejected: 4,
  locked: 5
}

export const UserProfileMap: Record<ProfileType, number> = {
  owners: 1,
  customers: 2,
  admins: 3,
  operators: 4
}
