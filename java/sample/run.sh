docker run --rm -v $PWD:/app -w /app openjdk:8-alpine javac HelloWorld.java
docker run --rm -v $PWD:/app -w /app openjdk:8-alpine java HelloWorld