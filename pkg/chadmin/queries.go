package chadmin

const settingsQuery = `select * 
from system.settings 
order by changed desc
`

const tablesQuery = `select 
    name,
    database,
    uuid,
    engine,
    is_temporary,
    data_paths,
    metadata_path,
    metadata_modification_time,
    dependencies_database,
    dependencies_table,
    create_table_query,
    engine_full,
    partition_key,
    sorting_key,
    primary_key,
    sampling_key,
    storage_policy,
    total_rows,
    total_bytes,
    lifetime_rows,
    lifetime_bytes
from system.tables
`

const disksQuery = `select name,
    path,
    free_space,
    total_space,
    keep_free_space,
    type
from system.disks
`

const overviewQuery = `select 
    count(distinct(host_name)) as nodes,
    count(distinct(cluster)) as clusters,
    (select count() from system.parts) as parts,
    (select count() from system.parts where active = 1) as active_parts,
    (select sum(value) from system.errors) as errors,
    (select count() from system.errors) as distinct_errors,
    (select count() from system.replicas) as replicas,
    (select count() from system.replicas where is_readonly = 1) as readonly_replicas
from system.clusters
`

const logsQuery = `select
    type as status,
    event_time,
    query_id,
    query_duration_ms,
    query,
    read_rows,
    read_bytes,
    result_rows,
    result_bytes,
    exception_code,
    exception,
    stack_trace
from
    system.query_log
WHERE
    -- if query failed before start
    (type = 3)
    -- if query finished or failed
    OR (type in [2,4])
    -- if query started and not finished or failed
    OR (
        type = 1
        AND query_id not in (
            SELECT
                query_id
            from
                system.query_log
            WHERE
                type not in [2, 4]
        )
    )
ORDER BY event_time DESC limit ?`
