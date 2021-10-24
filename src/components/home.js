import React from 'react'
import SortableTable from './sortable-table'
import AppBar from './app-bar'

function Home() {
    const [search, setSearch] = React.useState('');

    return (
        <>
            <AppBar setSearch={setSearch} />
            <SortableTable search={search} />
        </>
    );
}

export default Home;