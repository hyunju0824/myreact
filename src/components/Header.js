import { Link } from 'react-router-dom';
import '../App.css';
export default function Header() {
    return (
        <div className='my-8 ml-8'>
                <Link to={`/header`}><div className='logo'></div></Link>
        </div>
    );
}