package chadmin

import (
	"time"

	"github.com/ClickHouse/clickhouse-go/v2"
)

func (cha *CHAdmin) chCheckPing() error {
	return cha.CHConn.Ping()
}

func (cha *CHAdmin) chConnect() error {
	dsn, err := clickhouse.ParseDSN(cha.Config.CHURL)
	if err != nil {
		return err
	}
	cha.CHConn = clickhouse.OpenDB(dsn)
	cha.CHConn.SetMaxIdleConns(5)
	cha.CHConn.SetMaxOpenConns(10)
	cha.CHConn.SetConnMaxLifetime(time.Hour)
	// check connect
	_, err = cha.CHConn.Query("SELECT 1 FORMAT Null")
	return err
}
