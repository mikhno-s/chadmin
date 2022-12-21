package chadmin

import (
	"context"
	"fmt"
	"reflect"

	"github.com/ClickHouse/clickhouse-go/v2"
)

func (cha *CHAdmin) chGetSettings() ([]*CHSetting, error) {
	err := cha.chCheckPing()
	if err != nil {
		return nil, err
	}

	res, err := cha.CHConn.Query(context.TODO(), settingsQuery)
	if err != nil {
		return nil, err
	}

	settings := make([]*CHSetting, 0)

	for res.Next() {
		setting := CHSetting{}
		err = res.ScanStruct(&setting)
		if err != nil {
			return nil, err
		}
		settings = append(settings, &setting)
	}

	return settings, err
}

func (cha *CHAdmin) chGetQueryLog(limit int) ([]*CHLog, error) {

	if limit == 0 {
		limit = 100
	}

	res, err := cha.CHConn.Query(context.TODO(), logsQuery, limit)
	if err != nil {
		return nil, err
	}

	logs := make([]*CHLog, 0)

	for res.Next() {
		log := CHLog{}
		err = res.ScanStruct(&log)
		if err != nil {
			return nil, err
		}
		logs = append(logs, &log)
	}
	return logs, err
}

func (cha *CHAdmin) chGetTables() ([]CHTable, error) {
	var result []CHTable
	err := cha.CHConn.Select(context.Background(), &result, tablesQuery)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (cha *CHAdmin) chGetOverview() (*CHOverview, error) {

	var result []CHOverview

	err := cha.CHConn.Select(context.Background(), &result, overviewQuery)

	if err != nil {
		return nil, err
	}
	result[0].ServerVersion, err = cha.CHConn.ServerVersion()
	if err != nil {
		return nil, err
	}
	return &result[0], nil
}

func (cha *CHAdmin) chGetDisks() ([]CHDisk, error) {

	var result []CHDisk
	err := cha.CHConn.Select(context.Background(), &result, disksQuery)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (cha *CHAdmin) chQuery(query string) (*QueryResult, error) {
	result := &QueryResult{}

	// Executing query
	rows, err := cha.CHConn.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}
	var (
		// Get column types
		columnTypes = rows.ColumnTypes()
	)

	for i := range columnTypes {
		result.ColumnsTypes = append(result.ColumnsTypes, columnTypes[i].DatabaseTypeName())
		result.ColumnsNames = append(result.ColumnsNames, columnTypes[i].Name())
	}

	// CHECK ORDER BY
	for rows.Next() {

		// Represent the row values
		rowValues := make([]interface{}, len(columnTypes))
		// Fill the rowValues by the pointers to future values of given type
		for i := range columnTypes {
			rowValues[i] = reflect.New(columnTypes[i].ScanType()).Interface()
		}

		// Place the row values to the slice
		if err := rows.Scan(rowValues...); err != nil {
			return nil, err
		}
		row := make(map[string]interface{})

		for i, v := range rowValues {
			row[result.ColumnsNames[i]] = v
		}
		result.Rows = append(result.Rows, row)
	}

	return result, nil
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
	err := cha.CHConn.Close()
	cha.CHConn = nil
	return err
}
