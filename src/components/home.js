import { Link } from 'react-router-dom';

import SortableTable from './sortable-table'
import AppBar from './app-bar'

function Home() {
    return (
        <>
            <AppBar />
            <SortableTable />
        </>
    );
}

export default Home;