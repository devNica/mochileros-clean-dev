INSERT INTO public.profile (rol) VALUES('owners');
INSERT INTO public.profile (rol) VALUES('customers');
INSERT INTO public.profile (rol) VALUES('admins');
INSERT INTO public.profile (rol) VALUES('operators');

insert into public.account_status (status) values ('unverifiableIdentity');
insert into public.account_status (status) values ('awaitingReview');
insert into public.account_status (status) values ('approved');
insert into public.account_status (status) values ('rejected');
insert into public.account_status (status) values ('locked');