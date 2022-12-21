# CHAdmin

## UI for your clickhouse cluster

UI that allow you to check the state and status of your clickhouse cluster. The main feature is that you can monitoring and check configuration paramteres cluster-wide.

---

## Features

- Disks statuses ✅
- Run any query and get simple react table output ✅
- Checking and filtering logs ✅
- Get settings ✅
- Check data schemas and configuration ✅
- Check status of running queries and mutations ✅ 🚧
- Working with part and partitions 🚧
- Monitor your cluster status overall (parts health checks, user's quota) 🚧
- Query statistics. Can be helpful in slow query investigation 🚧
- Table's replication status 🚧
- Table's sharding status 🚧
- Running and monitoring migrations/mutations 🚧
- Adding and removing nodes from cluster (? possibly need configuration access to nodes) 🚧
- Creating and evaluating alerts which exposed like prometheus metrics 🚧
- Move data between clickhouse servers 🚧

---

## API Methods:
- POST /api/v1/connect - connects to clickhouse ✅
- GET /api/v1/ping - check that connection is alive ✅
- GET /api/v1/get_info - get default server - settings, databases, tables 🚧