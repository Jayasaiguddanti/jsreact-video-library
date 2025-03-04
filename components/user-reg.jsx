import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";


export function UserRegister(){

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''
        },
        onSubmit: (user) => {
            axios.post(`http://127.0.0.1:2025/register-user`, user);
            alert('User Registered Successfully..');
            navigate('/user-login');
        }
    })

    return(
        <div className="d-flex justify-content-center align-items-center">
            <div className="m-3 p-3 w-25 rounded-4" style={{backgroundColor: 'rgb(187, 217, 100)'}}>
                <h3>Register User</h3>
                <form onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>User Id</dt>
                        <dd><input type="text" onChange={formik.handleChange} name="UserId" /></dd>
                        <dt>User Name</dt>
                        <dd><input type="text" onChange={formik.handleChange} name="UserName" /></dd>
                        <dt>Password</dt>
                        <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                        <dt>Email</dt>
                        <dd><input type="email" onChange={formik.handleChange} name="Email" /></dd>
                        <dt>Mobile</dt>
                        <dd><input type="text" onChange={formik.handleChange} name="Mobile" /></dd>
                    </dl>
                    <button className="btn btn-warning">Register</button>
                    <div className="my-2">
                        <Link to="/user-login"> Existing User Login </Link>
                    </div>
                    <div className="my-2">
                        <Link to="/admin-login"> Admin Login </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}