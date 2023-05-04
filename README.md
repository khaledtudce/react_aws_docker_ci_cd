# Docker and CI/CD Pipeline for react_aws_docker_ci_cd
Here I worked with CI/CD pipeline and githhub action runner 

## Created Docker file and .dockerignore file

### 1. Used following command to manage docker file,

```sh
docker -v # see installed docker versions
```

```sh
docker build . # builds docker image using arbitrary name
```

```sh
docker image ls # see docker images
```

```sh
docker image rm 67060ff1b5d1 # remove particular docker image
```

```sh
docker build -t react-image . # create docker image with particular name
```

```sh
docker run -d -p 3000:3000 --name react-app react-image # run docker image container on 3000 port inside docker and expose outside 3000 port, the container name is react-app, the app is now available on localhost:3000
```

```sh
docker ps # see running docker container
```

### 2. Accessing inside container

```sh
docker exec -it react-app bash # open the bash command promt of docker container "react-app"
```

```sh
exit # exit from bash command promt of container "react-app"
```


### 3. Bind mount to Sync source code

```sh
docker run -v ${pwd}\src:/app/src -d -p 3000:3000 --name react-app react-image # moves current working directory's (pwd for powershell's current directory) changes to container's src folder(/app/src). However at the localhost:3000, we cannot see the changes immediately
```

```sh
docker run -e CHOKIDAR_USEPOLLING=true -v ${pwd}\src:/app/src -d -p 3000:3000 --name react-app react-image # now changes will be visible imediately on localhost:3000
```

```sh
docker run -v ${pwd}\src:/app/src:ro -d -p 3000:3000 --name react-app react-image # the problem was, if I would created any file inside the src folder of docker container, it also created a folder in my vscode project directory of my windows machine. So using this command, not it will be not be possible to create any folder in container there using "touch hello.js" command, we made it read only.

touch: cannot touch 'hello': Read-only file system
```

### 4. Docker .env variables
```sh
docker run --env-file ./.env -v ${pwd}\src:/app/src -d -p 3000:3000 --name react-app react-image # how to provide environment variable into docker container
```

```sh
docker rm react-app -f # remove running react-app container with force
```

### 5. Docker compose

```sh
docker-compose up -d # after adding docker-compose.yml file which contains all the manual command we have done so far. This command will run docker-compose.yml file and will generate an image and create a network and deploy container using Dockerfile contents for that image
```

```sh
docker-compose up -d --build # it will rebuild the image and create a network and deploy container containing that image
```

```sh
docker-compose down # stop and remove the container
```

### 6. Multi Stage build for dev and prod

```sh
docker build -f .\Dockerfile.dev . # if provided Dockerfile.dev, in that case we have to provide file info
```

```sh
docker build -f Dockerfile.prod -t docker-image-prod . # creating image of prod version named docker-image-prod
```

```sh
docker run --env-file ./.env -d -p 8080:80 --name react-app-prod docker-image-prod # creating container and deploying react-app-prod on port 8080
```


### 7. docker-compose-dev.yml and docker-compose-prod.yml

```sh
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build # it deploys container using development .yml files (order maters, if docker-compose.yml has something same, from later file it will be overwritten) which point to Dockerfile.dev --build flag generate new image
```

```sh
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build # It will deploy the container of prod version of the project, --build flag generate new image
```

```sh
docker build --target build -f Dockerfile.prod -t multi-stage-example . # --target 'build' name is the final stage from Dockerfile.prod file of target until where it will run
```

```sh
docker build --target deploy -f Dockerfile.prod -t multi-stage-example .
```

### 8. Basic commands

```sh
pwd # copy the path
ps aus | grep -i apt # see running process
sudo kill 1756
ps -aux # to see all running services
sudo systemctl status nginx
sudo npm i -g pm2
cat run.sh # to see file contents
sudo nano run.sh # to edit file
sudo rm * # remove all files inside a folder
sudo rm -r * # remove all folder and files
```

### 9. Needed to install 18.x version of nodejs in ubuntu

```sh
sudo apt-get remove nodejs npm
curl -sL https://deb.nodesource.com/setup_18.x | sudo bash -
sudo apt install -y nodejs
sudo dpkg -i --force-overwrite /var/cache/apt/archives/nodejs_18.12.1-deb-1nodesource1_amd64.deb
sudo apt -f install
```

### 10. Connect with githhub and AWS

```sh
sudo mkdir react_aws && cd react_aws
sudo curl -o actions-runner-linux-x64-2.299.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.299.1/actions-runner-linux-x64-2.299.1.tar.gz # downloading this file 
sudo echo "147c14700c6cb997421b9a239c012197f11ea9854cd901ee88ead6fe73a72c74  actions-runner-linux-x64-2.299.1.tar.gz" | shasum -a 256 -c # to see if file is valid
sudo tar xzf ./actions-runner-linux-x64-2.299.1.tar.gz # extracting zipped file
sudo RUNNER_ALLOW_RUNASROOT="1" ./config.sh --url https://github.com/khaledtudce/react_aws_docker_ci_cd --token AMRF7CXAKXZD4YUXLQWRVDTDPENJ2 # using that flag config was possible
sudo ./run.sh install
sudo ./run.sh start # service started but did not made any connection with githhub: problem
sudo RUNNER_ALLOW_RUNASROOT="1" ./run.sh # using that flag running run.sh was possible and it connected githhub: this way worked
```


### 10. Configure Nginx for Automatic Deploy

```sh
cd /etc/nginx
cd sites-available/
sudo nano default
```

#### 10.1 Add following part 

```sh
root /frontend/_work/react_aws_docker_ci_cd/react_aws_docker_ci_cd/build; # now it will load file from _work-> build folder where new files will be generated after every build from pipeline

location /api/ {
         proxy_pass  http://localhost:3000/;
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
```

#### 10.2 Restart nginx to take the changes
```sh
sudo systemctl restart nginx
```




