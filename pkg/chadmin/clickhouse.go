package chadmin

import (
	"context"
	"fmt"

	"github.com/ClickHouse/clickhouse-go/v2"
)

func (cha *CHAdmin) chGetSettings() ([]*CHSettings, error) {
	err := cha.chCheckPing()
	if err != nil {
		return nil, err
	}

	res, err := cha.CHConn.Query(context.TODO(), "SELECT * FROM system.settings")
	if err != nil {
		return nil, err
	}

	settings := make([]*CHSettings, 0)

	for res.Next() {
		setting := CHSettings{}
		err = res.ScanStruct(&setting)
		if err != nil {
			return nil, err
		}
		settings = append(settings, &setting)
	}

	return settings, err
}

func (cha *CHAdmin) chCheckPing() error {
	if cha.Config.CHURL == "" || cha.CHConn == nil {
		return fmt.Errorf("clickhouse connection is not configured")
	}
	return cha.CHConn.Ping(context.TODO())
}

func (cha *CHAdmin) chConnect() error {
	dsn, err := clickhouse.ParseDSN(cha.Config.CHURL)
	if err != nil {
		return err
	}
	cha.CHConn, err = clickhouse.Open(dsn)
	if err != nil {
		return err
	}

	// check connect
	_, err = cha.CHConn.Query(context.TODO(), "SELECT 1 FORMAT Null")
	return err
}

func (cha *CHAdmin) chClose() error {
	// Close connect
	return cha.CHConn.Close()
}
