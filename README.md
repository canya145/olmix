# Getting Started with Olmix project

# Run Redis docker images:
```shell
docker run -d -p 6379:6379 redis/redis-stack
```

```shell
docker run -d -v redisinsight:/db -p 8001:8001 redislabs/redisinsight:latest
```

### Run Backend
```shell
cd src/server
node app.js
```

### Run UI
```shell
yarn install
yarn start
```
