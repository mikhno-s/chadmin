
import { useEffect, useState } from 'react';
import { Table, Container, Modal, ModalHeader, ModalBody } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import './Logs.css';
import Filter from './Filter'

interface log {
    status: string;
    event_time: string;
    query_id: string;
    query_duration_ms: number;
    query: string;
    read_rows: number;
    read_bytes: number;
    result_rows: number;
    result_bytes: number;
    exception_code: number;
    exception: string;
    stack_trace: string;
}

function Logs(props: any) {
    const [logs, setLogs] = useState<Array<log>>([])
    const [filteredLogs, setFilteredLogs] = useState<Array<log>>(logs)
    const [filter, setFilter] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [seletedLog, setSelectedLogs] = useState<log>()

    const JSONPrettyMon = require('react-json-pretty/dist/monikai');


    const getLogs = () => {
        fetch("/api/v1/logs?limit=100").then((res) => {
            res.json().then(e => { setLogs(e.result) })
        })
    }

    useEffect(() => {
        getLogs()
    }, [])

    useEffect(() => {
        if (filter !== "") {
            setFilteredLogs(
                logs.filter((log) => {
                    return JSON.stringify(log).toLocaleLowerCase().search(filter.toLocaleLowerCase()) > 0
                }
                )
            )
        } else {
            setFilteredLogs(logs)
        }
    }, [logs, filter])

    useEffect(() => {

    }, [showModal])

    return (
        <>
            <Modal size='xl' show={showModal} onHide={() => { setShowModal(false) }}>
                <ModalHeader>Log:</ModalHeader>
                <ModalBody style={{ overflow: "scroll" }}>
                    <JSONPretty data={seletedLog} theme={JSONPrettyMon}></JSONPretty>
                </ModalBody>
            </Modal>
            <Container fluid className="bd-hihghligt">
                <Filter filter={filter} setFilter={setFilter} />
                <Table responsive bordered striped hover variant="dark" className="logsTable">
                    <thead>
                        <tr>
                            <th>status</th>
                            <th>event_time</th>
                            <th>query_id</th>
                            <th>query_duration_ms</th>
                            <th>query</th>
                            <th>read_rows</th>
                            <th>read_bytes</th>
                            <th>result_rows</th>
                            <th>result_bytes</th>
                            <th>exception_code</th>
                            <th>exception</th>
                            <th>stack_trace</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs && filteredLogs.map((val, key) => {
                            return (
                                <tr
                                    key={key}
                                    onClick={() => {
                                        setShowModal(true);
                                        setSelectedLogs(val);
                                    }}
                                >
                                    <td style={{ maxWidth: "24vw", overflow: "scroll" }}>{val.status}</td>
                                    <td>{val.event_time}</td>
                                    <td>{val.query_id}</td>
                                    <td>{val.query_duration_ms}</td>
                                    <td>
                                        <div className='overflow-scroll' style={{ overflowY: "scroll", maxHeight: "100px" }} >
                                            {val.query}
                                        </div>
                                    </td>
                                    <td>{val.read_bytes}</td>
                                    <td>{val.read_rows}</td>
                                    <td>{val.result_rows}</td>
                                    <td>{val.result_bytes}</td>
                                    <td>{val.exception_code}</td>
                                    <td>{val.exception}</td>
                                    <td>
                                        <div className='overflow-scroll' style={{ overflowY: "scroll", maxHeight: "100px" }} >
                                            {val.stack_trace}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default Logs;