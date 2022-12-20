
import { useEffect, useState } from 'react';
import QueryForm from './QueryForm'
import { Container } from 'react-bootstrap';
import ResultTable from './ResultTable';

function Query(props: any) {
    const [result, setResult] = useState<any>()

    useEffect(() => {

    }, [result])

    return (
        <>
            <Container fluid className="bd-hihghligt">
                <QueryForm
                    setResult={setResult}
                />
                <ResultTable
                    column_names={result?.column_names}
                    rows={result?.rows}
                />
            </Container>
        </>
    )
}
export default Query;