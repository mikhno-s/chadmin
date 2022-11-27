
import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
function Configurator(props: any) {
  const [URL, setURL] = useState("")

  const setUrl = (url: string) => {
    fetch("/api/v1/connect",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "url": url })
      }
    )
  }

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setUrl(URL)
        }}>
        <Row xs={1}>
          <Col>
            <label>
              Enter clickouse URL:
            </label>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col className='col-lg-4'>
            <input
              placeholder='http://localhost:8123'
              type="text"
              value={URL}
              onChange={(e) => {
                setURL(e.target.value)
                props.setChURL(e.target.value)
              }}
              required
              className='form-control'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type='submit'>
              Connect
            </Button>
          </Col>
        </Row>
      </form>
    </Container >
  );
}

export default Configurator;
