
import { ReactElement, useState } from 'react';
import Menu from '../menu/Menu'
import { Card, Container, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';
import './Overview.css'
import { text } from 'stream/consumers';

const darkCardBig = (text: string, header: string): ReactElement => {
    return (
        <Card
            bg="dark"
            text="white"
            style={{ width: '18rem' }}
            className="mb-2 overviewCard"
        >
            <Card.Body>
                <Card.Text className="fs-3" style={{ textAlign: "center" }}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Header className="fs-4">{header}</Card.Header>
        </Card>
    )
}

const darkCardSmall = (text: string, header: string): ReactElement => {
    return (
        <Card
            bg="dark"
            text="white"
            style={{ width: '18rem' }}
            className="mt-3 overviewCard"
        >
            <Card.Body>
                <Card.Text style={{ textAlign: "center" }} className="fs-6">
                    {header}: {text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

function Overview(props: any) {
    return (
        <>
            <Container fluid className="bd-hihghligt align-items-center">
                <div className="my-3 mx-3 overview d-flex align-items-center">

                    <div>
                        {darkCardBig("5", "Nodes")}
                        {darkCardSmall("5", "Clusters")}
                    </div>
                    <div>
                        {darkCardBig("546456", "Parts")}
                        {darkCardSmall("234", "Active parts")}
                    </div>
                    <div>
                        {darkCardBig("345345", "Errors")}
                        {darkCardSmall("4", "Distinct errors")}
                    </div>
                    <div>
                        {darkCardBig("0", "Replicas")}
                        {darkCardSmall("0", "Readonly replicas")}
                    </div>

                </div>
                <div className="my-3 d-flex">
                    <ListGroup className="text-white mx-3 statusBars">
                        <ListGroupItem>
                            <h5>Disk space:</h5>
                        </ListGroupItem>
                        <ListGroupItem>
                            /mnt/slow_logs:<ProgressBar variant='info' label={'35/100GB'} now={35}></ProgressBar>
                        </ListGroupItem>
                        <ListGroupItem>
                            /mnt/slow_logs:<ProgressBar variant='info' label={'35/100GB'} now={35}></ProgressBar>
                        </ListGroupItem>
                        <ListGroupItem>
                            /mnt/slow_logs:<ProgressBar variant='info' label={'35/100GB'} now={35}></ProgressBar>
                        </ListGroupItem>
                    </ListGroup>
                </div>

            </Container>
        </>
    )
}
export default Overview;