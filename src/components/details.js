import { useParams } from 'react-router';


function Details() {
    let { companyId } = useParams();

    return (
        <h1>Details: {companyId}</h1>
    );
}

export default Details;
