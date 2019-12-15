npm run build
echo "build static files"
docker build . -t keep-front
echo "build images" 
docker run --name keep-front -p 3000:3000 -d keep-front
echo "run docker container on port 3000"