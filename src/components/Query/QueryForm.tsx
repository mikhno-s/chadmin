import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

function QueryForm(props: any) {
  const [query, setQuery] = useState<string>()
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingButton, setLoadingButton] = useState(false)

  const execQuery = async () => {
    await fetch("/api/v1/query",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "query": query })
      }).then((res) => {
        if (res.status === 200) {
          res.json().then(e => { props.setResult(e.result) })
        } else {
          res.text().then(e => { setErrorMessage(e) })
        }
      })
    setLoadingButton(false)
  }

  useEffect(() => {

  }, [loadingButton])
  return (
    <>
      <Container fluid>
        <Form
          onSubmit={(e) => {
            setLoadingButton(true)
            e.preventDefault();
            execQuery();
          }}
        >
          <Form.Group className="mb-8">
            <Form.Label>Query:</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              as="textarea"
              value={query}
              onChange={(e) => { setQuery(e.target.value) }}
              placeholder='SELECT * FROM system.numbers LIMIT 1'
              rows={2}
              onKeyDown={(e) => {
                if (e.shiftKey && e.key === "Enter") {
                  e.preventDefault();
                  setLoadingButton(true)
                  execQuery();
                }
              }}
            />
          </Form.Group>
          {loadingButton &&
            <Button variant='primary' className="my-4" size='lg' disabled>
              <Spinner className='spinner-border-sm' /> Executing...
            </Button>
          }
          {loadingButton ||
            <Button variant="primary" className="my-4" size='lg' type="submit">
              Execute
            </Button>
          }
        </Form>
      </Container>
      {
        errorMessage &&
        <ErrorAlert
          className='errorAlert'
          alertMessage={errorMessage}
          setAlertMessage={setErrorMessage}
        />
      }
    </>
  );
}

export default QueryForm;