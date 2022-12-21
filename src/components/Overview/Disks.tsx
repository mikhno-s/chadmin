
import { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';
import './Overview.css'

type disk = {
    name: string,
    path: string,
    free_space: number,
    total_space: number,
    type: string,
};

// https://programanddesign.com/js/human-readable-file-size-in-javascript/
function readableFileSize(size: number) {
    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = 0;
    while (size >= 1024 && i < units.length - 1) {
        size /= 1024;
        ++i;
    }
    return size.toFixed(1) + ' ' + units[i];
}

function Disks() {
    const [disks, setDisks] = useState<Array<disk>>([]);

    useEffect(() => {
        const getDisks = async () => {
            if (!stop) {
                await fetch("/api/v1/disks").then((res) => {
                    if (res.status === 200) {
                        if (!stop) {
                            res.json().then(e => {
                                setDisks(e.result)
                            })
                        }
                    }
                })
            }
        }
        let stop = false;
        getDisks()
        return (() => {
            stop = true;
        })
    }, [])

    return (
        <Container fluid className="bd-hihghligt align-items-center">
            <div className="my-3 d-flex">
                <ListGroup className="text-white mx-3 statusBars">
                    <ListGroupItem key={'header'}>
                        <h5>Disks:</h5>
                    </ListGroupItem>
                    {
                        disks.length > 0 && disks.map((disk, i) => {
                            return (
                                <ListGroupItem key={i}>
                                    {disk.path}:<ProgressBar
                                        variant='info'
                                        label={readableFileSize(disk.total_space - disk.free_space) + '/' + readableFileSize(disk.total_space)}
                                        now={disk.free_space / disk.total_space * 100}
                                    />

                                </ListGroupItem>
                            )
                        })
                    }
                </ListGroup>
            </div>

        </Container>
    )
}
export default Disks;