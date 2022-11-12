# Docker and CI/CD Pipeline

Created Docker file and .dockerignore file

Used following command to manage docker file,
docker -v (see installed docker versions)
docker build .   (builds docker image using arbitrary name)
docker image ls   (see docker images)
docker image rm 67060ff1b5d1   (remove particular docker image)
docker build -t react-image .   (create docker image with particular name)
docker run -d -p 3000:3000 --name react-app react-image   (run docker image container on 3000 port inside docker and expose outside 3000 port, the container name is react-app, the app is now available on localhost:3000)
docker ps (see running docker container)
docker exec -it react-app bash (open the bash command promt of docker container "react-app")
docker rm react-app -f (remove running react-app container with force)