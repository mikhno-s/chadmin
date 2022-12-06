
import { useEffect, useState } from 'react';
import { Row, Button, ButtonGroup, Col, Container } from 'react-bootstrap';
import './Menu.css'
function Menu(props: any) {
    const [currentNodeStatus, setCurrentNodeStatus] = useState("🟢")
    const [currentNode, setCurrentNode] = useState<any>()
    const [currentNodeVer, setCurrentNodeVer] = useState("v21.0.4")
    const [nodeName, setNodeName] = useState("default node")

    const variant = (id: string) => {
        if (props.selectedPage === id) {
            return "primary"
        }
        return "secondary"
    }

    const setActivePage = (e: any) => {
        props.setSelectedPage(e.currentTarget.id)
    }
    const routes: any = [
        <Button key={'overview'} id='overview' onClick={setActivePage} variant={variant('overview')}>Overview</Button >,
        <Button key={'partitions'} id='partitions' onClick={setActivePage} variant={variant('partitions')}>Partitions</Button>,
        <Button key={'logs'} id='logs' onClick={setActivePage} variant={variant('logs')}>Logs</Button>,
        <Button key={'settings'} id='settings' onClick={setActivePage} variant={variant('settings')}>⚙️ Settings</Button>,
        <Button key={'query'} id='query' onClick={setActivePage} variant={variant('query')}>🔍 Query</Button>,
    ];

    const getSelected = () => {
        return routes
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h3 className='mx-4 my-3'>
                        {currentNodeStatus} Cluster_name <span className='fs-4'>{nodeName}</span>  <span className='fs-6 fw-lighter'>{currentNodeVer}</span>
                    </h3>
                </Col>
                <Col>
                    < ButtonGroup id="menu" className="position-absolute end-0 mx-4 my-3" aria-label="Basic example" >
                        {getSelected()}
                    </ButtonGroup >
                </Col>
            </Row >
        </Container >
    )
}
export default Menu;