
import { useEffect, useState, FC, ReactComponentElement } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { JsxAttribute } from 'typescript';
import Menu from '../menu/Menu'
import Overview from '../Overview/Overview'
import Settings from '../Settings/Settings'
import Query from '../Query/Query'


function Wrapper(props: any) {
    const [activePage, setactivePage] = useState()

    const [selectedPage, setSelectedPage] = useState("overview")

    const pages: any = {
        'overview': <Overview />,
        'settings': <Settings />,
        'query': <Query />,
    }

    useEffect(() => {
        console.log(selectedPage)
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