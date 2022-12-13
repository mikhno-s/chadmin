package chadmin

import (
	"context"
	"fmt"
	"reflect"

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

		// rowValues = make([]interface{}, len(columnTypes))
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
	return cha.CHConn.Close()
}
