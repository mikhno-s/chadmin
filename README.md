# CHADMIN
#### Video Demo:  https://youtu.be/ixucuufoTs8
#### Description: 
After spending some time managing clickhouse database instances I found out the lack of all-in-one tool that can show the database instance status, help you to do simple queries from the browser without installing `clickhouse client` locally, and check setting and logs. So I decided to start to work of something, that will help me in the same way as `cerebro` project does for elasticsearch.

Welcome Chadmin - UI that allows you to check the status of your clickhouse cluster. Currently it supports only few basic things:
- Shows the basic information regarding single node.
- Shows the logs and you are able to use regexp to filter log rows. (Useful to detect the problematic queries)
- Shows the current clickhouse session settings.
- You can list the database, tables and check the information per each table like data_path, amount of stored rows, bytes and so on.

Chadmin constists of two parts:
- Backend is a golang application, that can connect to clickhouse instance using tcp port and has some useful api.
- Fronend is a typescript + react as static files in disk folder that backed part serves.

You need to have an access to clickhouse tcp endpoint from the backend. Connection string must valid DSN uri.
![connect](./docs/1.png)

You can check the default metrics, like errors, amount of nodes in cluster or readonly replicas. 
![connect](./docs/2.png)

You can find useful to check the table schemas (create queries) and other information, like amount of parts, rows, size in byte. 
![connect](./docs/3.png)

You can see the query logs, check them for errors or just find the stats of the selected query. Filter works with regexp.
![connect](./docs/4.png)

Checkout the changed and default settings values
![connect](./docs/5.png)

You can select any data and run any queries that you want and get pretty enough output.
![connect](./docs/6.png)
##### Build and run
There are two options:
- Full local build in your environment: 
```shell
go build
npx yarn && npx yarn build
./chadmin
```
OR 
- Build and run using docker:
```shell
docker build -t chadmin -f build/Dockerfile . 
docker run -p 4000:4000 chadmin
```
Now you can open `http://localhost:4000`
---
## Features
- Disks statuses ???
- Run any query and get simple react table output ???
- Checking and filtering logs ???
- Get settings ???
- Check data schemas and configuration ???
- Check status of running queries and mutations ??? ????
- Working with part and partitions ????
- Monitor your cluster status overall (parts health checks, user's quota) ????
- Query statistics. Can be helpful in slow query investigation ????
- Table's replication status ????
- Table's sharding status ????
- Running and monitoring migrations/mutations ????
- Adding and removing nodes from cluster (? possibly need configuration access to nodes) ????
- Creating and evaluating alerts which exposed like prometheus metrics ????
- Move data between clickhouse servers ????