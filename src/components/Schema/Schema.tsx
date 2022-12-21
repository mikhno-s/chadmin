
import { useEffect, useState } from 'react'
import { Container, Breadcrumb } from 'react-bootstrap';
import { getTables } from '../../Api/Api';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import './Schema.css'

import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';


const theme = {
  main: 'line-height:1.3;color:#66d9ef;background:transparent;overflow:auto;',
  error: 'line-height:1.3;color:#66d9ef;background:transparent;overflow:auto;',
  key: 'color:#f92672;',
  string: 'color:#fd971f;',
  value: 'color:#a6e22e;',
  boolean: 'color:#ac81fe;',
}


type table = {
  name: string;
  database: string;
  uuid: any;
  engine: any;
  is_temporary: any;
  data_paths: any;
  metadata_path: any;
  metadata_modification_time: any;
  dependencies_database: any;
  dependencies_table: any;
  create_table_query: any;
  engine_full: any;
  partition_key: any;
  sorting_key: any;
  primary_key: any;
  sampling_key: any;
  storage_policy: any;
  total_rows: any;
  total_bytes: any;
  lifetime_rows: any;
  lifetime_bytes: any;
}

type selected = {
  database: string;
  table: string;
}

function Schema(props: any) {
  const [currentPath, setCurrentPath] = useState(null)

  const [tables, setTables] = useState<Array<table>>([])
  const [databases, setDatabases] = useState<Array<string>>([...new Set(tables.map(table => table.database))])
  const [activeDatabase, setActiveDatabase] = useState("")

  const JSONPrettyMon = require('react-json-pretty/dist/monikai');

  useEffect(() => {
    getTables(setTables)
  }, [])

  useEffect(() => {
    setDatabases([...new Set(tables.map(table => table.database))])
    setActiveDatabase(databases[0])
  }, [tables])

  const setActiveDB = (e: any) => {
    setActiveDatabase(e.currentTarget.id)
  }


  return <>
    <Container fluid>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={4}>
            <Nav variant="pills" as={'ul'} className="flex-column">
              {databases.map((database) => {
                return (
                  <>
                    <Nav.Item
                      key={database}>
                      <Nav.Link
                        active
                        disabled
                        eventKey={database}
                        style={{ backgroundColor: "dimgrey" }}>
                        {database}
                      </Nav.Link>

                    </Nav.Item>
                    {tables.filter(e => {
                      return e.database === database
                    }).map(t => {
                      return (<Nav.Item>
                        <Nav.Link
                          key={database + "_" + t.name}
                          eventKey={database + "_" + t.name}
                          className='ms-3 my-1'
                          style={{ color: "white" }}
                        >
                          {t.name}
                        </Nav.Link>
                      </Nav.Item>)
                    })}

                  </>
                )
              })}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {databases.map((database) => {
                return (
                  <>
                    {tables.filter(e => {
                      return e.database === database
                    }).map(t => {
                      return (
                        <Tab.Pane eventKey={database + "_" + t.name}>
                          <JSONPretty style={{ backgroundColor: "transparent" }} data={t} theme={theme} />
                        </Tab.Pane>
                      )
                    })}
                  </>
                )
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  </>

}

export default Schema;
