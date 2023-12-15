--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: assignmentDGW; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "assignmentDGW";


ALTER SCHEMA "assignmentDGW" OWNER TO application;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO application;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: assignmentDGW; Owner: postgres
--

CREATE TABLE "assignmentDGW".users (
    id integer DEFAULT nextval('public.user_id_seq'::regclass) NOT NULL,
    username character varying(255),
    email character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    password character varying(255)
);


ALTER TABLE "assignmentDGW".users OWNER TO application;

--
-- Data for Name: users; Type: TABLE DATA; Schema: assignmentDGW; Owner: postgres
--

COPY "assignmentDGW".users (id, username, email, "firstName", "lastName", password) FROM stdin;
2	iWilli	willi.nguyen@hotmail.fr	William	Nguyen	$2b$10$WxC4dSOe8XPe9dB0nPh/U.nv1FKN.NPynTm9ogKq9LN0XBDohXupG
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: assignmentDGW; Owner: postgres
--

ALTER TABLE ONLY "assignmentDGW".users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA "assignmentDGW"; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA "assignmentDGW" TO application;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO application;


--
-- Name: SEQUENCE user_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.user_id_seq TO application;


--
-- Name: TABLE users; Type: ACL; Schema: assignmentDGW; Owner: postgres
--

GRANT ALL ON TABLE "assignmentDGW".users TO application;


--
-- PostgreSQL database dump complete
--

