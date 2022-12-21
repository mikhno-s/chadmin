package chadmin

import (
	"time"
)

type CHCluster struct {
	Cluster               string `ch:"cluster" json:"cluster"`
	ShardNum              uint32 `ch:"shard_num" json:"shard_num"`
	ShardWeight           uint32 `ch:"shard_weight" json:"shard_weight"`
	ReplicaNum            uint32 `ch:"replica_num" json:"replica_num"`
	HostName              string `ch:"host_name" json:"host_name"`
	HostAddress           string `ch:"host_address" json:"host_address"`
	Port                  uint16 `ch:"port" json:"port"`
	IsLocal               uint8  `ch:"is_local" json:"is_local"`
	User                  string `ch:"user" json:"user"`
	DefaultDatabase       string `ch:"default_database" json:"default_database"`
	ErrorsCount           uint32 `ch:"errors_count" json:"errors_count"`
	EstimatedRecoveryTime uint32 `ch:"estimated_recovery_time" json:"estimated_recovery_time"`
}

type CHDisk struct {
	Name          string `ch:"name" json:"name"`
	Path          string `ch:"path" json:"path"`
	FreeSpace     uint64 `ch:"free_space" json:"free_space"`
	TotalSpace    uint64 `ch:"total_space" json:"total_space"`
	KeepFreeSpace uint64 `ch:"keep_free_space" json:"keep_free_space"`
	Type          string `ch:"type" json:"type"`
}

type CHPart struct {
	Partition             string    `ch:"partition" json:"partition"`
	Name                  string    `ch:"name" json:"name"`
	Uuid                  string    `ch:"uuid" json:"uuid"`
	PartType              string    `ch:"part_type" json:"part_type"`
	Active                uint8     `ch:"active" json:"active"`
	Marks                 uint64    `ch:"marks" json:"marks"`
	Rows                  uint64    `ch:"rows" json:"rows"`
	BytesOnDisk           uint64    `ch:"bytes_on_disk" json:"bytes_on_disk"`
	DataCompressedBytes   uint64    `ch:"data_compressed_bytes" json:"data_compressed_bytes"`
	DataUncompressedBytes uint64    `ch:"data_uncompressed_bytes" json:"data_uncompressed_bytes"`
	MarksBytes            uint64    `ch:"marks_bytes" json:"marks_bytes"`
	ModificationTime      time.Time `ch:"modification_time" json:"modification_time"`
	RemoveTime            time.Time `ch:"remove_time" json:"remove_time"`
	Refcount              uint32    `ch:"refcount" json:"refcount"`
	// MinDate                           time.Time // don't need since we have Min/MaxTime `ch:"min_date" json:"min_date"`
	// MaxDate                           time.Time `ch:"max_date" json:"max_date"`
	MinTime                           time.Time   `ch:"min_time" json:"min_time"`
	MaxTime                           time.Time   `ch:"max_time" json:"max_time"`
	PartitionId                       string      `ch:"partition_id" json:"partition_id"`
	MinBlockNumber                    int64       `ch:"min_block_number" json:"min_block_number"`
	MaxBlockNumber                    int64       `ch:"max_block_number" json:"max_block_number"`
	Level                             uint32      `ch:"level" json:"level"`
	DataVersion                       uint64      `ch:"data_version" json:"data_version"`
	PrimaryKeyBytesInMemory           uint64      `ch:"primary_key_bytes_in_memory" json:"primary_key_bytes_in_memory"`
	PrimaryKeyBytesInMemoryAllocated  uint64      `ch:"primary_key_bytes_in_memory_allocated" json:"primary_key_bytes_in_memory_allocated"`
	IsFrozen                          uint8       `ch:"is_frozen" json:"is_frozen"`
	Database                          string      `ch:"database" json:"database"`
	Table                             string      `ch:"table" json:"table"`
	Engine                            string      `ch:"engine" json:"engine"`
	DiskName                          string      `ch:"disk_name" json:"disk_name"`
	Path                              string      `ch:"path" json:"path"`
	HashOfAllFiles                    string      `ch:"hash_of_all_files" json:"hash_of_all_files"`
	HashOfUncompressedFiles           string      `ch:"hash_of_uncompressed_files" json:"hash_of_uncompressed_files"`
	UncompressedHashOfCompressedFiles string      `ch:"uncompressed_hash_of_compressed_files" json:"uncompressed_hash_of_compressed_files"`
	DeleteTtlInfoMin                  time.Time   `ch:"delete_ttl_info_min" json:"delete_ttl_info_min"`
	DeleteTtlInfoMax                  time.Time   `ch:"delete_ttl_info_max" json:"delete_ttl_info_max"`
	MoveTtlInfo_expression            []string    `ch:"move_ttl_info.expression" json:"move_ttl_info.expression"`
	MoveTtlInfo_min                   []time.Time `ch:"move_ttl_info.min" json:"move_ttl_info.min"`
	MoveTtlInfo_max                   []time.Time `ch:"move_ttl_info.max" json:"move_ttl_info.max"`
	DefaultCompressionCodec           string      `ch:"default_compression_codec" json:"default_compression_codec"`
	RecompressionTtlInfo_expression   []string    `ch:"recompression_ttl_info.expression" json:"recompression_ttl_info.expression"`
	RecompressionTtlInfo_min          []time.Time `ch:"recompression_ttl_info.min" json:"recompression_ttl_info.min"`
	RecompressionTtlInfo_max          []time.Time `ch:"recompression_ttl_info.max" json:"recompression_ttl_info.max"`
	Bytes                             uint64      `ch:"bytes" json:"bytes"`
	MarksSize                         uint64      `ch:"marks_size" json:"marks_size"`
}

type CHColumn struct {
	Database              string `ch:"database" json:"database"`
	Table                 string `ch:"table" json:"table"`
	Name                  string `ch:"name" json:"name"`
	Type                  string `ch:"type" json:"type"`
	Position              uint64 `ch:"position" json:"position"`
	DefaultKind           string `ch:"default_kind" json:"default_kind"`
	DefaultExpression     string `ch:"default_expression" json:"default_expression"`
	DataCompressedBytes   uint64 `ch:"data_compressed_bytes" json:"data_compressed_bytes"`
	DataUncompressedBytes uint64 `ch:"data_uncompressed_bytes" json:"data_uncompressed_bytes"`
	MarksBytes            uint64 `ch:"marks_bytes" json:"marks_bytes"`
	Comment               string `ch:"comment" json:"comment"`
	IsInPartitionKey      uint8  `ch:"is_in_partition_key" json:"is_in_partition_key"`
	IsInSortingKey        uint8  `ch:"is_in_sorting_key" json:"is_in_sorting_key"`
	IsInPrimaryKey        uint8  `ch:"is_in_primary_key" json:"is_in_primary_key"`
	IsInSamplingKey       uint8  `ch:"is_in_sampling_key" json:"is_in_sampling_key"`
	CompressionCodec      string `ch:"compression_codec" json:"compression_codec"`
}

type CHTable struct {
	Name                     string    `ch:"name" json:"name"`
	Database                 string    `ch:"database" json:"database"`
	UUID                     string    `ch:"uuid" json:"uuid"`
	Engine                   string    `ch:"engine" json:"engine"`
	IsTemporary              uint8     `ch:"is_temporary" json:"is_temporary"`
	DataPaths                []string  `ch:"data_paths" json:"data_paths"`
	MetadataPath             string    `ch:"metadata_path" json:"metadata_path"`
	MetadataModificationTime time.Time `ch:"metadata_modification_time" json:"metadata_modification_time"`
	DependenciesDatabase     []string  `ch:"dependencies_database" json:"dependencies_database"`
	Dependencies_table       []string  `ch:"dependencies_table" json:"dependencies_table"`
	CreateTableQuery         string    `ch:"create_table_query" json:"create_table_query"`
	EngineFull               string    `ch:"engine_full" json:"engine_full"`
	PartitionKey             string    `ch:"partition_key" json:"partition_key"`
	SortingKey               string    `ch:"sorting_key" json:"sorting_key"`
	PrimaryKey               string    `ch:"primary_key" json:"primary_key"`
	SamplingKey              string    `ch:"sampling_key" json:"sampling_key"`
	StoragePolicy            string    `ch:"storage_policy" json:"storage_policy"`
	TotalRows                uint64    `ch:"total_rows" json:"total_rows"`
	TotalBytes               uint64    `ch:"total_bytes" json:"total_bytes"`
	LifetimeRows             uint64    `ch:"lifetime_rows" json:"lifetime_rows"`
	LifetimeBytes            uint64    `ch:"lifetime_bytes" json:"lifetime_bytes"`
	Columns                  []*CHColumn
}

type CHDatabase struct {
	Name         string `ch:"name" json:"name"`
	Engine       string `ch:"engine" json:"engine"`
	DataPath     string `ch:"data_path" json:"data_path"`
	MetadataPath string `ch:"metadata_path" json:"metadata_path"`
	UUID         string `ch:"uuid" json:"uuid"`
	Tables       map[string]*CHTable
}

type CHSetting struct {
	Name        string `ch:"name" json:"name"`
	Value       string `ch:"value" json:"value"`
	Changed     uint8  `ch:"changed" json:"changed"`
	Description string `ch:"description" json:"description"`
	Min         string `ch:"min" json:"min"`
	Max         string `ch:"max" json:"max"`
	Readonly    uint8  `ch:"readonly" json:"readonly"`
	Type        string `ch:"type" json:"type"`
}
type CHLog struct {
	Status          string    `ch:"status" json:"status"`
	EventTime       time.Time `ch:"event_time" json:"event_time"`
	QueryID         string    `ch:"query_id" json:"query_id"`
	QueryDurationMs uint64    `ch:"query_duration_ms" json:"query_duration_ms"`
	Query           string    `ch:"query" json:"query"`
	ReadRows        uint64    `ch:"read_rows" json:"read_rows"`
	ReadBytes       uint64    `ch:"read_bytes" json:"read_bytes"`
	ResultRows      uint64    `ch:"result_rows" json:"result_rows"`
	ResultBytes     uint64    `ch:"result_bytes" json:"result_bytes"`
	ExceptionCode   int32     `ch:"exception_code" json:"exception_code"`
	Exception       string    `ch:"exception" json:"exception"`
	StackTrace      string    `ch:"stack_trace" json:"stack_trace"`
}

type CHOverview struct {
	Nodes            uint64      `ch:"nodes" json:"nodes"`
	Clusters         uint64      `ch:"clusters" json:"clusters"`
	Parts            uint64      `ch:"parts" json:"parts"`
	ActiveParts      uint64      `ch:"active_parts" json:"active_parts"`
	Errors           uint64      `ch:"errors" json:"errors"`
	DistinctErrors   uint64      `ch:"distinct_errors" json:"distinct_errors"`
	Replicas         uint64      `ch:"replicas" json:"replicas"`
	ReadonlyReplicas uint64      `ch:"readonly_replicas" json:"readonly_replicas"`
	ServerVersion    interface{} `json:"version"`
}

type CHServer struct {
	Name      string
	Settings  map[string]CHSetting
	Databases map[string]CHDatabase
}
