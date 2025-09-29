--
-- PostgreSQL database dump
--

\restrict 85n2ohQxpNBB0AJgQZVcz4x0gz04nFDYPPqIPNn7XIikXhcyd5jQ9ljX1ql6Gkx

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-09-29 13:32:06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


--
-- TOC entry 5587 (class 0 OID 16390)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'ana.petrovic@example.com', 'Ana', 'Petrović', '+38761100001', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 932);
INSERT INTO public.users VALUES (2, 'marko.ivanovic@example.com', 'Marko', 'Ivanović', '+38761100002', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 933);
INSERT INTO public.users VALUES (3, 'jelena.kovacevic@example.com', 'Jelena', 'Kovačević', '+38761100003', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 936);
INSERT INTO public.users VALUES (4, 'nikola.stojanovic@example.com', 'Nikola', 'Stojanović', '+38761100004', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 940);
INSERT INTO public.users VALUES (5, 'marija.jovanovic@example.com', 'Marija', 'Jovanović', '+38761100005', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 926);
INSERT INTO public.users VALUES (6, 'aleksandar.milosevic@example.com', 'Aleksandar', 'Milošević', '+38761100006', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 930);
INSERT INTO public.users VALUES (7, 'sofija.popovic@example.com', 'Sofija', 'Popović', '+38761100007', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 938);
INSERT INTO public.users VALUES (8, 'stefan.ilic@example.com', 'Stefan', 'Ilić', '+38761100008', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 925);
INSERT INTO public.users VALUES (9, 'teodora.savic@example.com', 'Teodora', 'Savić', '+38761100009', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 939);
INSERT INTO public.users VALUES (10, 'luka.djokovic@example.com', 'Luka', 'Đoković', '+38761100010', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, false, NULL, NULL, 0, '2025-09-19 14:14:29.979227+02', NULL, 17, 939);
INSERT INTO public.users VALUES (11, 'andjelastojnic1607@gmail.com', 'Andjela', 'Stojnić', '+387611232323456', '$2b$10$EN5M4i1vtJWUesZFifBvLO54eIt1gBo6og3FmXFS.s3hTQkXIdPh6', true, false, NULL, NULL, 0, '2025-09-24 10:58:32.703+02', NULL, NULL, NULL);
INSERT INTO public.users VALUES (12, 'andjelastojnic1607+testing@gmail.com', 'Andjela', 'Stojnic', '065123432', '$2b$10$g.a98fhUiy.KdMXw8cIdfe0lsK79gUZGXyOeEV4JJFZzes6ll04IS', true, false, NULL, NULL, 0, '2025-09-25 12:13:38.633+02', NULL, 17, 931);


--
-- TOC entry 5589 (class 0 OID 16404)
-- Dependencies: 220
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts VALUES (1, 1, 'Manual Ana Petrović #1', '+38762010100', 'ana.1@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (2, 2, 'Manual Marko Ivanović #1', '+38762020100', 'marko.2@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (3, 3, 'Manual Jelena Kovačević #1', '+38762030100', 'jelena.3@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (4, 4, 'Manual Nikola Stojanović #1', '+38762040100', 'nikola.4@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (5, 5, 'Manual Marija Jovanović #1', '+38762050100', 'marija.5@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (6, 6, 'Manual Aleksandar Milošević #1', '+38762060100', 'aleksandar.6@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (7, 7, 'Manual Sofija Popović #1', '+38762070100', 'sofija.7@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (8, 8, 'Manual Stefan Ilić #1', '+38762080100', 'stefan.8@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (9, 9, 'Manual Teodora Savić #1', '+38762090100', 'teodora.9@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (10, 10, 'Manual Luka Đoković #1', '+38762100100', 'luka.10@example.com', 'personal', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (11, 1, 'Manual Ana Petrović #2', '+38762010200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (12, 2, 'Manual Marko Ivanović #2', '+38762020200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (13, 3, 'Manual Jelena Kovačević #2', '+38762030200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (14, 4, 'Manual Nikola Stojanović #2', '+38762040200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (15, 5, 'Manual Marija Jovanović #2', '+38762050200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (16, 6, 'Manual Aleksandar Milošević #2', '+38762060200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (17, 7, 'Manual Sofija Popović #2', '+38762070200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (18, 8, 'Manual Stefan Ilić #2', '+38762080200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (19, 9, 'Manual Teodora Savić #2', '+38762090200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (20, 10, 'Manual Luka Đoković #2', '+38762100200', NULL, 'work', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.contacts VALUES (31, 12, 'Stefan Marko', '+38765767410', 'vrhovaco88@gmail.com', 'Notes', false, '2025-09-29 12:34:26.888+02', '', NULL);


--
-- TOC entry 5593 (class 0 OID 16446)
-- Dependencies: 224
-- Data for Name: calls; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.calls VALUES (1, 1, 'missed', '2025-09-19 14:03:29.979227+02', 3, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (2, 2, 'missed', '2025-09-19 13:53:29.979227+02', 4, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (3, 3, 'missed', '2025-09-19 13:43:29.979227+02', 5, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (4, 4, 'missed', '2025-09-19 13:33:29.979227+02', 6, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (5, 5, 'missed', '2025-09-19 13:23:29.979227+02', 7, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (6, 6, 'missed', '2025-09-19 13:13:29.979227+02', 8, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (7, 7, 'missed', '2025-09-19 13:03:29.979227+02', 9, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (8, 8, 'missed', '2025-09-19 12:53:29.979227+02', 10, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (9, 9, 'missed', '2025-09-19 12:43:29.979227+02', 1, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (10, 10, 'missed', '2025-09-19 12:33:29.979227+02', 2, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (11, 1, 'outgoing', '2025-09-19 14:02:29.979227+02', 4, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (12, 2, 'outgoing', '2025-09-19 13:52:29.979227+02', 5, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (13, 3, 'outgoing', '2025-09-19 13:42:29.979227+02', 6, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (14, 4, 'outgoing', '2025-09-19 13:32:29.979227+02', 7, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (15, 5, 'outgoing', '2025-09-19 13:22:29.979227+02', 8, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (16, 6, 'outgoing', '2025-09-19 13:12:29.979227+02', 9, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (17, 7, 'outgoing', '2025-09-19 13:02:29.979227+02', 10, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (18, 8, 'outgoing', '2025-09-19 12:52:29.979227+02', 1, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (19, 9, 'outgoing', '2025-09-19 12:42:29.979227+02', 2, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (20, 10, 'outgoing', '2025-09-19 12:32:29.979227+02', 3, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (21, 1, 'incoming', '2025-09-19 14:01:29.979227+02', 5, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (22, 2, 'incoming', '2025-09-19 13:51:29.979227+02', 6, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (23, 3, 'incoming', '2025-09-19 13:41:29.979227+02', 7, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (24, 4, 'incoming', '2025-09-19 13:31:29.979227+02', 8, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (25, 5, 'incoming', '2025-09-19 13:21:29.979227+02', 9, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (26, 6, 'incoming', '2025-09-19 13:11:29.979227+02', 10, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (27, 7, 'incoming', '2025-09-19 13:01:29.979227+02', 1, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (28, 8, 'incoming', '2025-09-19 12:51:29.979227+02', 2, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (29, 9, 'incoming', '2025-09-19 12:41:29.979227+02', 3, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (30, 10, 'incoming', '2025-09-19 12:31:29.979227+02', 4, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (31, 1, 'missed', '2025-09-19 13:43:29.979227+02', NULL, 1, NULL, false, false);
INSERT INTO public.calls VALUES (32, 2, 'missed', '2025-09-19 13:33:29.979227+02', NULL, 2, NULL, false, false);
INSERT INTO public.calls VALUES (33, 3, 'missed', '2025-09-19 13:23:29.979227+02', NULL, 3, NULL, false, false);
INSERT INTO public.calls VALUES (34, 4, 'missed', '2025-09-19 13:13:29.979227+02', NULL, 4, NULL, false, false);
INSERT INTO public.calls VALUES (35, 5, 'missed', '2025-09-19 13:03:29.979227+02', NULL, 5, NULL, false, false);
INSERT INTO public.calls VALUES (36, 6, 'missed', '2025-09-19 12:53:29.979227+02', NULL, 6, NULL, false, false);
INSERT INTO public.calls VALUES (37, 7, 'missed', '2025-09-19 12:43:29.979227+02', NULL, 7, NULL, false, false);
INSERT INTO public.calls VALUES (38, 8, 'missed', '2025-09-19 12:33:29.979227+02', NULL, 8, NULL, false, false);
INSERT INTO public.calls VALUES (39, 9, 'missed', '2025-09-19 12:23:29.979227+02', NULL, 9, NULL, false, false);
INSERT INTO public.calls VALUES (40, 10, 'missed', '2025-09-19 12:13:29.979227+02', NULL, 10, NULL, false, false);
INSERT INTO public.calls VALUES (41, 1, 'outgoing', '2025-09-19 13:42:29.979227+02', NULL, 11, NULL, false, false);
INSERT INTO public.calls VALUES (42, 2, 'outgoing', '2025-09-19 13:32:29.979227+02', NULL, 12, NULL, false, false);
INSERT INTO public.calls VALUES (43, 3, 'outgoing', '2025-09-19 13:22:29.979227+02', NULL, 13, NULL, false, false);
INSERT INTO public.calls VALUES (44, 4, 'outgoing', '2025-09-19 13:12:29.979227+02', NULL, 14, NULL, false, false);
INSERT INTO public.calls VALUES (45, 5, 'outgoing', '2025-09-19 13:02:29.979227+02', NULL, 15, NULL, false, false);
INSERT INTO public.calls VALUES (46, 6, 'outgoing', '2025-09-19 12:52:29.979227+02', NULL, 16, NULL, false, false);
INSERT INTO public.calls VALUES (47, 7, 'outgoing', '2025-09-19 12:42:29.979227+02', NULL, 17, NULL, false, false);
INSERT INTO public.calls VALUES (48, 8, 'outgoing', '2025-09-19 12:32:29.979227+02', NULL, 18, NULL, false, false);
INSERT INTO public.calls VALUES (49, 9, 'outgoing', '2025-09-19 12:22:29.979227+02', NULL, 19, NULL, false, false);
INSERT INTO public.calls VALUES (50, 10, 'outgoing', '2025-09-19 12:12:29.979227+02', NULL, 20, NULL, false, false);
INSERT INTO public.calls VALUES (51, 1, 'incoming', '2025-09-19 13:23:29.979227+02', NULL, NULL, '+38769011555', false, false);
INSERT INTO public.calls VALUES (52, 2, 'incoming', '2025-09-19 13:13:29.979227+02', NULL, NULL, '+38769021555', false, false);
INSERT INTO public.calls VALUES (53, 3, 'incoming', '2025-09-19 13:03:29.979227+02', NULL, NULL, '+38769031555', false, false);
INSERT INTO public.calls VALUES (54, 4, 'incoming', '2025-09-19 12:53:29.979227+02', NULL, NULL, '+38769041555', false, false);
INSERT INTO public.calls VALUES (55, 5, 'incoming', '2025-09-19 12:43:29.979227+02', NULL, NULL, '+38769051555', false, false);
INSERT INTO public.calls VALUES (56, 6, 'incoming', '2025-09-19 12:33:29.979227+02', NULL, NULL, '+38769061555', false, false);
INSERT INTO public.calls VALUES (57, 7, 'incoming', '2025-09-19 12:23:29.979227+02', NULL, NULL, '+38769071555', false, false);
INSERT INTO public.calls VALUES (58, 8, 'incoming', '2025-09-19 12:13:29.979227+02', NULL, NULL, '+38769081555', false, false);
INSERT INTO public.calls VALUES (59, 9, 'incoming', '2025-09-19 12:03:29.979227+02', NULL, NULL, '+38769091555', false, false);
INSERT INTO public.calls VALUES (60, 10, 'incoming', '2025-09-19 11:53:29.979227+02', NULL, NULL, '+38769101555', false, false);
INSERT INTO public.calls VALUES (61, 1, 'missed', '2025-09-19 13:22:29.979227+02', NULL, NULL, '+38769012555', false, false);
INSERT INTO public.calls VALUES (62, 2, 'missed', '2025-09-19 13:12:29.979227+02', NULL, NULL, '+38769022555', false, false);
INSERT INTO public.calls VALUES (63, 3, 'missed', '2025-09-19 13:02:29.979227+02', NULL, NULL, '+38769032555', false, false);
INSERT INTO public.calls VALUES (64, 4, 'missed', '2025-09-19 12:52:29.979227+02', NULL, NULL, '+38769042555', false, false);
INSERT INTO public.calls VALUES (65, 5, 'missed', '2025-09-19 12:42:29.979227+02', NULL, NULL, '+38769052555', false, false);
INSERT INTO public.calls VALUES (66, 6, 'missed', '2025-09-19 12:32:29.979227+02', NULL, NULL, '+38769062555', false, false);
INSERT INTO public.calls VALUES (67, 7, 'missed', '2025-09-19 12:22:29.979227+02', NULL, NULL, '+38769072555', false, false);
INSERT INTO public.calls VALUES (68, 8, 'missed', '2025-09-19 12:12:29.979227+02', NULL, NULL, '+38769082555', false, false);
INSERT INTO public.calls VALUES (69, 9, 'missed', '2025-09-19 12:02:29.979227+02', NULL, NULL, '+38769092555', false, false);
INSERT INTO public.calls VALUES (70, 10, 'missed', '2025-09-19 11:52:29.979227+02', NULL, NULL, '+38769102555', false, false);
INSERT INTO public.calls VALUES (101, 12, 'missed', '2025-09-29 10:34:48.387+02', NULL, 31, NULL, false, false);
INSERT INTO public.calls VALUES (102, 8, 'missed', '2025-09-29 10:18:12.468+02', 12, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (103, 5, 'missed', '2025-09-29 10:18:11.247+02', 12, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (104, 6, 'missed', '2025-09-29 10:18:09.862+02', 12, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (105, 12, 'accepted', '2025-09-29 10:45:19.501+02', NULL, 31, NULL, false, false);
INSERT INTO public.calls VALUES (106, 12, 'accepted', '2025-09-29 10:24:48.387+02', NULL, 31, NULL, false, false);
INSERT INTO public.calls VALUES (107, 8, 'accepted', '2025-09-29 10:11:12.468+02', 12, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (82, 12, 'missed', '2025-09-29 12:18:09.862+02', 6, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (83, 12, 'missed', '2025-09-29 12:18:11.247+02', 5, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (81, 12, 'missed', '2025-09-29 12:18:04.719+02', 6, NULL, NULL, true, false);
INSERT INTO public.calls VALUES (85, 12, 'missed', '2025-09-29 12:34:48.387+02', NULL, 31, NULL, false, false);
INSERT INTO public.calls VALUES (86, 12, 'missed', '2025-09-29 12:41:19.501+02', NULL, 31, NULL, true, false);
INSERT INTO public.calls VALUES (84, 12, 'missed', '2025-09-29 12:18:12.468+02', 8, NULL, NULL, true, false);
INSERT INTO public.calls VALUES (100, 12, 'missed', '2025-09-29 10:41:19.501+02', NULL, 31, NULL, true, false);
INSERT INTO public.calls VALUES (87, 12, 'missed', '2025-09-29 13:06:44.438+02', 5, NULL, NULL, false, false);
INSERT INTO public.calls VALUES (88, 12, 'missed', '2025-09-29 13:07:58.807+02', NULL, NULL, '065123456', false, false);


--
-- TOC entry 5591 (class 0 OID 16419)
-- Dependencies: 222
-- Data for Name: user_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_contacts VALUES (1, 1, 3, 'Jelena Kovačević', '+38761100003', 'jelena.kovacevic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (2, 2, 4, 'Nikola Stojanović', '+38761100004', 'nikola.stojanovic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (3, 3, 5, 'Marija Jovanović', '+38761100005', 'marija.jovanovic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (4, 4, 6, 'Aleksandar Milošević', '+38761100006', 'aleksandar.milosevic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (5, 5, 7, 'Sofija Popović', '+38761100007', 'sofija.popovic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (6, 6, 8, 'Stefan Ilić', '+38761100008', 'stefan.ilic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (7, 7, 9, 'Teodora Savić', '+38761100009', 'teodora.savic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (8, 8, 10, 'Luka Đoković', '+38761100010', 'luka.djokovic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (9, 9, 1, 'Ana Petrović', '+38761100001', 'ana.petrovic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (10, 10, 2, 'Marko Ivanović', '+38761100002', 'marko.ivanovic@example.com', true, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (11, 1, 4, 'Nikola Stojanović', '+38761100004', 'nikola.stojanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (12, 2, 5, 'Marija Jovanović', '+38761100005', 'marija.jovanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (13, 3, 6, 'Aleksandar Milošević', '+38761100006', 'aleksandar.milosevic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (14, 4, 7, 'Sofija Popović', '+38761100007', 'sofija.popovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (15, 5, 8, 'Stefan Ilić', '+38761100008', 'stefan.ilic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (16, 6, 9, 'Teodora Savić', '+38761100009', 'teodora.savic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (17, 7, 10, 'Luka Đoković', '+38761100010', 'luka.djokovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (18, 8, 1, 'Ana Petrović', '+38761100001', 'ana.petrovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (19, 9, 2, 'Marko Ivanović', '+38761100002', 'marko.ivanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (20, 10, 3, 'Jelena Kovačević', '+38761100003', 'jelena.kovacevic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (21, 1, 5, 'Marija Jovanović', '+38761100005', 'marija.jovanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (22, 2, 6, 'Aleksandar Milošević', '+38761100006', 'aleksandar.milosevic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (23, 3, 7, 'Sofija Popović', '+38761100007', 'sofija.popovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (24, 4, 8, 'Stefan Ilić', '+38761100008', 'stefan.ilic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (25, 5, 9, 'Teodora Savić', '+38761100009', 'teodora.savic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (26, 6, 10, 'Luka Đoković', '+38761100010', 'luka.djokovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (27, 7, 1, 'Ana Petrović', '+38761100001', 'ana.petrovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (28, 8, 2, 'Marko Ivanović', '+38761100002', 'marko.ivanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (29, 9, 3, 'Jelena Kovačević', '+38761100003', 'jelena.kovacevic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (30, 10, 4, 'Nikola Stojanović', '+38761100004', 'nikola.stojanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (31, 1, 6, 'Aleksandar Milošević', '+38761100006', 'aleksandar.milosevic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (32, 2, 7, 'Sofija Popović', '+38761100007', 'sofija.popovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (33, 3, 8, 'Stefan Ilić', '+38761100008', 'stefan.ilic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (34, 4, 9, 'Teodora Savić', '+38761100009', 'teodora.savic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (35, 5, 10, 'Luka Đoković', '+38761100010', 'luka.djokovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (36, 6, 1, 'Ana Petrović', '+38761100001', 'ana.petrovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (37, 7, 2, 'Marko Ivanović', '+38761100002', 'marko.ivanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (38, 8, 3, 'Jelena Kovačević', '+38761100003', 'jelena.kovacevic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (39, 9, 4, 'Nikola Stojanović', '+38761100004', 'nikola.stojanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (40, 10, 5, 'Marija Jovanović', '+38761100005', 'marija.jovanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (41, 1, 7, 'Sofija Popović', '+38761100007', 'sofija.popovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (42, 2, 8, 'Stefan Ilić', '+38761100008', 'stefan.ilic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (43, 3, 9, 'Teodora Savić', '+38761100009', 'teodora.savic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (44, 4, 10, 'Luka Đoković', '+38761100010', 'luka.djokovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (45, 5, 1, 'Ana Petrović', '+38761100001', 'ana.petrovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (46, 6, 2, 'Marko Ivanović', '+38761100002', 'marko.ivanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (47, 7, 3, 'Jelena Kovačević', '+38761100003', 'jelena.kovacevic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (48, 8, 4, 'Nikola Stojanović', '+38761100004', 'nikola.stojanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (49, 9, 5, 'Marija Jovanović', '+38761100005', 'marija.jovanovic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (50, 10, 6, 'Aleksandar Milošević', '+38761100006', 'aleksandar.milosevic@example.com', false, '2025-09-19 14:14:29.979227+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (58, 12, 6, 'Aleksandar Milošević', '+38761100006', 'aleksandar.milosevic@example.com', false, '2025-09-29 12:17:55.5+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (57, 12, 5, 'Marija Jovanović', '+38761100005', 'marija.jovanovic@example.com', true, '2025-09-29 12:17:54.116+02', NULL, NULL);
INSERT INTO public.user_contacts VALUES (56, 12, 8, 'Stefan Ilić', '+38761100008', 'stefan.ilic@example.com', true, '2025-09-29 12:17:51.943+02', NULL, NULL);


--
-- TOC entry 5595 (class 0 OID 16481)
-- Dependencies: 226
-- Data for Name: verification_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5605 (class 0 OID 0)
-- Dependencies: 223
-- Name: calls_callId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."calls_callId_seq"', 88, true);


--
-- TOC entry 5606 (class 0 OID 0)
-- Dependencies: 227
-- Name: cities_cityId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."cities_cityId_seq"', 32558, true);


--
-- TOC entry 5607 (class 0 OID 0)
-- Dependencies: 219
-- Name: contacts_contactId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."contacts_contactId_seq"', 31, true);


--
-- TOC entry 5608 (class 0 OID 0)
-- Dependencies: 229
-- Name: countries_countryId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."countries_countryId_seq"', 252, true);


--
-- TOC entry 5609 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_contacts_userContactId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."user_contacts_userContactId_seq"', 58, true);


--
-- TOC entry 5610 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users_userId_seq"', 12, true);


--
-- TOC entry 5611 (class 0 OID 0)
-- Dependencies: 225
-- Name: verification_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.verification_tokens_id_seq', 2, true);


-- Completed on 2025-09-29 13:32:06

--
-- PostgreSQL database dump complete
--

\unrestrict 85n2ohQxpNBB0AJgQZVcz4x0gz04nFDYPPqIPNn7XIikXhcyd5jQ9ljX1ql6Gkx

