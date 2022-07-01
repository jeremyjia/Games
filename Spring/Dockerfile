FROM java:8-alpine
VOLUME /tmp
ARG JAR_FILE=target/*.jar
ARG SCRIPT_FILES=script/*.*
COPY ${JAR_FILE} /app.jar
COPY ${SCRIPT_FILES} /
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]