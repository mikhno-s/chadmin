package chadmin

import (
	"database/sql"
	"time"

	"github.com/gofiber/fiber/v2"
)

type CHAdmin struct {
	Server *fiber.App
	// SessionStore *session.Store
	Config struct {
		CHURL string
	}
	CHConn *sql.DB
}

// API Entries
type ConnectRequestBody struct {
	URL string `json:"url" form:"url"`
}

type chpart struct {
}

type chpartition struct {
	ID    string
	Size  int
	Parts []chpart
}

type chtable struct {
	Name                     string    `ch:"name" json:"name"`
	Database                 string    `ch:"database" json:"database"`
	CreateQuery              string    `ch:"create_query" json:"create_query"`
	UUID                     string    `ch:"uuid" json:"uuid"`
	Engine                   string    `ch:"engine" json:"engine"`
	IsTemporary              uint8     `ch:"is_temporary" json:"is_temporary"`
	DataPath                 []string  `ch:"data_path" json:"data_path"`
	MetadataPath             []string  `ch:"metadata_path" json:"metadata_path"`
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
	Partitions               []chpartition
}

type chdatabase struct {
	Name         string `ch:"name" json:"name"`
	Engine       string `ch:"engine" json:"engine"`
	DataPath     string `ch:"data_path" json:"data_path"`
	MetadataPath string `ch:"metadata_path" json:"metadata_path"`
	UUID         string `ch:"uuid" json:"uuid"`
	Tables       []*chtable
}

type chserver struct {
}
