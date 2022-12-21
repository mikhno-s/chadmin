
import { ReactElement, useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import './Overview.css'
import { getOverview } from '../../Api/Api'
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

type overview = {
    nodes: string;
    clusters: string;
    parts: string;
    active_parts: string;
    errors: string;
    distinct_errors: string;
    replicas: string;
    readonly_replicas: string;
};

function OverviewCards(props: any) {
    const [result, setResult] = useState<overview>({
        nodes: '0',
        clusters: '0',
        parts: '0',
        active_parts: '0',
        errors: '0',
        distinct_errors: '0',
        replicas: '0',
        readonly_replicas: '0'
    });


    useEffect(() => {
        getOverview(setResult)
    }, [])

    return (
        <>
            <Container fluid className="bd-hihghligt align-items-center">
                <div className="my-3 mx-3 overview d-flex align-items-center">

                    <div>
                        {darkCardBig(result.nodes, "Nodes")}
                        {darkCardSmall(result.clusters, "Clusters")}
                    </div>
                    <div>
                        {darkCardBig(result.parts, "Parts")}
                        {darkCardSmall(result.active_parts, "Active parts")}
                    </div>
                    <div>
                        {darkCardBig(result.errors, "Errors")}
                        {darkCardSmall(result.distinct_errors, "Distinct errors")}
                    </div>
                    <div>
                        {darkCardBig(result.replicas, "Replicas")}
                        {darkCardSmall(result.readonly_replicas, "Readonly replicas")}
                    </div>

                </div>
            </Container>
        </>
    )
}
export default OverviewCards;