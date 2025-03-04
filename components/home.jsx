import { Link } from "react-router-dom";

export function Home(){
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height: '500px'}}>
            <Link className="btn btn-dark me-2" to={'/admin-login'}>Admin Login</Link>
            <Link className="btn btn-primary" to={'/user-login'}>User Login</Link>
        </div>
    )
}