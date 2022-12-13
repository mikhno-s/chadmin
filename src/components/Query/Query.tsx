
import { useEffect, useState } from 'react';
import Menu from '../menu/Menu'
import QueryForm from './Form'
import { Table, Container } from 'react-bootstrap';
import ResultTable from './ResultTable';

interface queryResult {
    result: {
        column_types: string[];
        column_names: string[];
        rows: any[];
    }
}

function Query(props: any) {
    const [result, setResult] = useState<any>()

    useEffect(() => {
        console.log(result)
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