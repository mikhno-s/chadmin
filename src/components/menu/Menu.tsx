
import { useEffect, useState } from 'react';
import { Row, Button, ButtonGroup, Col, Container } from 'react-bootstrap';
import './Menu.css'
import { getOverview } from '../../Api/Api'

function Menu(props: any) {
    const [overview, setOverview] = useState<any>()

    useEffect(() => {
        getOverview(setOverview)
    }, [])

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
        <Button key={'schema'} id='schema' onClick={setActivePage} variant={variant('schema')}>Schema</Button>,
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
                        <span className='fs-4'>{overview?.version.DisplayName}</span>  <span className='fs-6 fw-lighter'>v{overview?.version.Version.Major}.{overview?.version.Version.Minor}.{overview?.version.Version.Patch}</span>
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