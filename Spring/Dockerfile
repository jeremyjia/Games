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
WORKDIR /opt

RUN set -xe \
    && apk --no-cache add ttf-dejavu fontconfig \
    && echo "http://mirrors.aliyun.com/alpine/v3.6/main" > /etc/apk/repositories \
    && echo "http://mirrors.aliyun.com/alpine/v3.6/community" >> /etc/apk/repositories \
    && apk update upgrade \
    && apk add --no-cache procps unzip curl bash tzdata \
	&& apk add yasm && apk add ffmpeg \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
	&& dos2unix jpg2video.sh jpg2video.sh
	
EXPOSE 8080
EXPOSE 8090	
ENTRYPOINT ["java","-Dfile.encoding=utf-8", "-jar","/opt/app.jar"]