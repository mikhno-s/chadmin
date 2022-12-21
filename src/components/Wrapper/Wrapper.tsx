
import { useEffect, useState } from 'react';
import Menu from '../menu/Menu'
import Overview from '../Overview/Overview'
import Settings from '../Settings/Settings'
import Query from '../Query/Query'
import Logs from '../Logs/Logs';
import Schema from '../Schema/Schema';


function Wrapper(props: any) {
    const [activePage, setactivePage] = useState()

    const [selectedPage, setSelectedPage] = useState("overview")

    const pages: any = {
        'overview': <Overview />,
        'schema': <Schema />,
        'settings': <Settings />,
        'query': <Query />,
        'logs': <Logs />,
    }

    useEffect(() => {
        setactivePage(pages[Object.keys(pages).filter((k) => k === selectedPage)[0]]);
    }, [selectedPage])


    return (
        <>
            <Menu selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            {activePage}
        </>
    )
}
export default Wrapper;