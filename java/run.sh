clear
docker run --rm -v $PWD/day$1:/app -w /app openjdk:8-alpine /bin/sh -c "javac Day$1.java && java Day$1"