
import { useEffect, useState } from 'react';
import Menu from '../menu/Menu'
import { Table, Container } from 'react-bootstrap';

interface setting {
    name: string;
    value: string;
    changed: number;
    description: string;
    min: string;
    max: string;
    readonly: string;
    type: string;
}

function Settings(props: any) {
    const [settingsList, setSettingsList] = useState<Array<setting>>([])

    const getSettings = async () => {
        await fetch("/api/v1/settings").then((res) => {
            res.json().then(e => { setSettingsList(e.settings) })
        })
    }

    useEffect(() => {
        getSettings()
    }, [])

    return (
        <>
            <Container fluid className="bd-hihghligt">
                <Table responsive bordered striped hover variant="dark">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>value</th>
                            <th>changed</th>
                            <th>description</th>
                            <th>readonly</th>
                            <th>type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {settingsList && settingsList.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td style={{ maxWidth: "24vw", overflow: "scroll" }}>{val.name}</td>
                                    <td>{val.value}</td>
                                    <td>{val.changed}</td>
                                    <td><p>{val.description}</p></td>
                                    <td>{val.readonly}</td>
                                    <td style={{ maxWidth: "10vw", overflow: "scroll" }}>{val.type}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default Settings;