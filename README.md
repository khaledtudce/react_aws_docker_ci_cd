# Docker and CI/CD Pipeline

# Created Docker file and .dockerignore file

### Used following command to manage docker file,

### docker -v (see installed docker versions)

### docker build . (builds docker image using arbitrary name)

### docker image ls (see docker images)

### docker image rm 67060ff1b5d1 (remove particular docker image)

### docker build -t react-image . (create docker image with particular name)

### docker run -d -p 3000:3000 --name react-app react-image (run docker image container on 3000 port inside docker and expose outside 3000 port, the container name is react-app, the app is now available on localhost:3000)

### docker ps (see running docker container)

### docker exec -it react-app bash (open the bash command promt of docker container "react-app")

### exit (exit from bash command promt of container "react-app")

### docker run -v ${pwd}\src:/app/src -d -p 3000:3000 --name react-app react-image (moves current working directory's (pwd for powershell's current directory) changes to container's src folder(/app/src). However at the localhost:3000, we cannot see the changes immediately)

### docker run -e CHOKIDAR_USEPOLLING=true -v ${pwd}\src:/app/src -d -p 3000:3000 --name react-app react-image (now changes will be visible imediately on localhost:3000)

### docker run -v ${pwd}\src:/app/src:ro -d -p 3000:3000 --name react-app react-image (the problem was, if I would created any file inside the src folder of docker container, it also created a folder in my vscode project directory of my windows machine. So using this command, not it will be not be possible to create any folder in container there using "touch hello.js" command, we made it read only)

touch: cannot touch 'hello': Read-only file system

### docker run --env-file ./.env -v ${pwd}\src:/app/src -d -p 3000:3000 --name react-app react-image (how to provide environment variable into docker container)

### docker rm react-app -f (remove running react-app container with force)

### docker-compose up -d (after adding docker-compose.yml file which contains all the manual command we have done so far. This command will run docker-compose.yml file and will generate an image and create a network and deploy container using Dockerfile contents for that image)

### docker-compose up -d --build (it will rebuild the image and create a network and deploy container containing that image)

### docker-compose down (stop and remove the container)
