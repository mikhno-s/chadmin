import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from 'react-bootstrap';




function Filter(props: any) {
  return (
    <Container fluid>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <InputGroup size='sm' className="mb-8 my-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Filter</InputGroup.Text>
          <Form.Control
            aria-label="Filter"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => { props.setFilter(e.target.value) }}
            value={props.filter}
          />
        </InputGroup>

      </Form>
    </Container>
  );
}

export default Filter;