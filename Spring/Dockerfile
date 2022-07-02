#FROM java:8-alpine
#FROM ubuntu:latest
#FROM williamyeh/java8:latest

FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=target/*.jar
ARG SCRIPT_FILES=script
RUN mkdir -p /opt
COPY ${JAR_FILE} /opt/app.jar
COPY ${SCRIPT_FILES} /opt

RUN set -xe \
&& apk --no-cache add ttf-dejavu fontconfig

WORKDIR /opt	
EXPOSE 8080	
ENTRYPOINT ["java","-Dfile.encoding=utf-8", "-jar","/opt/app.jar"]