export const fetchUserAccountByEmail = (): string => `
    select 

    ua.id as "userId",
    ua.email,
    ua.password as "passwordHashed",
    ua.phone_number as "phoneNumber",
    ua.is_root as "isRoot",
    p.rol,
    acs.status as "status"

    from user_account ua
    inner join user_profile up on up.fk_user  = ua.id
    inner join profile p on p.id = up.fk_profile
    inner join account_status acs on acs.id = ua.fk_status 
    where ua.email = :email
`
