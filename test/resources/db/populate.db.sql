INSERT INTO public.user (id, email, password_hash)
VALUES
  (1, 'email1@gmail.com', 'hash1'),
  (2, 'email2@gmail.com', 'hash2'),
  (3, 'email3@gmail.com', 'hash3'),
  (4, 'email4@gmail.com', 'hash4'),
  (5, 'email5@gmail.com', 'hash5');

-- Reset 'user_id_seq' sequence object's counter value.
SELECT setval('user_id_seq', (SELECT MAX(id) FROM public.user));
