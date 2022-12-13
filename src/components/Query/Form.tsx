import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Container } from 'react-bootstrap';




function QueryForm(props: any) {
  const [query, setQuery] = useState<string>()

  const execQuery = () => {
    fetch("/api/v1/query",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "query": query })
      }).then((res) => {
        res.json().then(e => { props.setResult(e.result) })
      })
  }

  return (
    <Container fluid>
      <Form
        onSubmit={(e) => {
          // setLoadingButton(true)
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
          />
        </Form.Group>
        <Button className="my-4" size='lg' variant="primary" type="submit">
          Execute
        </Button>
      </Form>
    </Container>
  );
}

export default QueryForm;