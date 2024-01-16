import { Link } from 'react-router-dom';
import '../App.css';
export default function Header() {
    return (
        <div className='my-8 ml-16'>
                <Link to={`/header`}><div className='logo'></div></Link>
        </div>
    );
}