import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export function Adminlogin(){
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            UserId:'',
            password:''
        },
        onSubmit: (admin)=>{
            axios.get('http://127.0.0.1:2025/get-admin')
            .then(response=>{
                var user = response.data.find(item=> item.UserId===admin.UserId);
                if(user){
                    if(admin.password===user.Password){
                        navigate("/admin-dash");
                    }
                    else{
                        alert("invalid Password");
                    }
                }
                else{
                    alert("Invalid Admin Id");
                }
            })
        }
    });

    return(
        <div className="d-flex justify-content-center align-items-center">
            <div className="p-4 m-4 w-25 rounded-4" style={{backgroundColor: 'rgb(169, 151, 207)'}}>
                <h3>Admin Login</h3>
                <form onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>Admin Id</dt>
                        <dl><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dl>
                        <dt>Password</dt>
                        <dl><input type="password" name="password" onChange={formik.handleChange} className="form-control" /></dl>
                    </dl>
                    <button className="btn btn-warning w-100">Login</button>
                    <Link to="/" className="mt-4">Back To Home</Link>
                </form>
            </div>
        </div>
    );
}