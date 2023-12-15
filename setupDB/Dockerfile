FROM postgres

COPY bdd.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER application
ENV POSTGRES_PASSWORD root
ENV POSTGRES_DB assignmentDGW

EXPOSE 5432
