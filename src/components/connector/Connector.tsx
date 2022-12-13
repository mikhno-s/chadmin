import { useEffect, useCallback, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Col, FormLabel, Row, Spinner, Form } from 'react-bootstrap';
import './Connector.css';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

function Connector(props: any) {
  const [URL, setURL] = useState("")
  const [loadingButton, setLoadingButton] = useState(false)
  const [alertMessage, setAlertMessage] = useState("");


  const connect = async (url: string) => {
    await fetch("/api/v1/connect",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "url": url })
      }
    ).then((res) => {
      if (res.status === 200) {
        props.setCHDisconnected(false)
      } else {
        props.setCHDisconnected(true)
        res.text().then(e => { setAlertMessage(e) })
      }
    }

    )
    setLoadingButton(false)
  }

  const ping = useCallback(async () => {
    await fetch("/api/v1/ping").then((res) => {
      // Need to parse response
      if (res.status === 200) {
        res.json().then((value) => {
          if (value.message === "pong") {
            props.setCHDisconnected(false);
          } else {
            props.setCHDisconnected(true);
          }
        });
      } else {
        props.setCHDisconnected(true);
      }
      props.setShowLoader(false)
    }
    );
  }, [props]);

  // check connection
  useEffect(() => {
    ping()
  }, [props.CHDisconnected, ping])


  const connectContainer = (e: any) => {
    return (
      <>
        <Container>
          <Row className="justify-content-center" >
            <Col align="center" className='align-items-center'>
              {e}
            </Col>
          </Row>
        </Container >
        {
          alertMessage &&
          <ErrorAlert
            className='errorAlert'
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
        }
      </>
    )

  }


  if (props.showLoader) {
    return connectContainer(
      <Spinner className='connectorSpinner mx-auto' />
    )
  }

  if (props.CHDisconnected) {
    return connectContainer(

      <Form
        onSubmit={(e) => {
          setLoadingButton(true)
          e.preventDefault();
          connect(URL);
        }}
        id='connectorForm'>
        <Form.Group>
          <FormLabel htmlFor="url_input">
            Enter clickouse URL:
          </FormLabel>
          <Form.Control
            placeholder='http://localhost:8123'
            type="text"
            value={URL}
            onChange={(e) => {
              setURL(e.target.value);
              props.setChURL(e.target.value);
            }}
            required
            id="url_input"
          />

        </Form.Group>
        {loadingButton &&
          <Button variant='primary' className='connectButton' disabled>
            <Spinner className='spinner-border-sm' /> Connecting..
          </Button>
        }

        {loadingButton ||
          <Button variant='primary' className='connectButton' type='submit'>Connect</Button>
        }
      </Form>
    );
  } else {
    return <></>
  }

}

export default Connector;
