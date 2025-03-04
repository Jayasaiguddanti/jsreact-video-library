import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Addvideo(){
    const [Category, setCategory] = useState([{CategoryId:0, CategoryName:''}]);
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            VideoId:0,
            Title:'',
            Url:'',
            Description:'',
            Likes:0,
            Dislikes:0,
            Views:0,
            CategoryId:0,
            Comments:['']
        },
        onSubmit:(value)=>{
            axios.post(`http://127.0.0.1:2025/add-video`,value)
            .then(()=>{
                alert('Video Added Successfully');
            })
            navigate('/admin-dash');
        }
    });
    function Loadcategories(){
        axios.get('http://127.0.0.1:2025/get-categories')
            .then(response=>{
                response.data.unshift({
                    CategoryId:0,
                    CategoryName:'Select Category'
            })
            setCategory(response.data);
        })
    }
    useEffect(()=>{
        Loadcategories();
    },[]);
    return(
        <div className="d-flex justify-content-center align-items-center">
            <div className="w-50 m-3 p-3 rounded-4" style={{backgroundColor: 'rgb(169, 151, 207)'}}>
                <h3>Add Video</h3>
                <form onSubmit={formik.handleSubmit} style={{height:'400px'}} className="overflow-auto">   
                    <dl>
                        <dt>Video Id</dt>
                        <dd><input type="number" onChange={formik.handleChange} className="form-control" name="VideoId"></input></dd>
                        <dt>Title</dt>
                        <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Title" /></dd>
                        <dt>Url</dt>
                        <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Url" /></dd>
                        <dt>Description</dt>
                        <dd><textarea rows="2" cols="40" onChange={formik.handleChange} className="form-control" name="Description"></textarea></dd>
                        <dt>Likes</dt>
                        <dd><input type="number"onChange={formik.handleChange} className="form-control" name="Likes" /></dd>
                        <dt>Dislikes</dt>
                        <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Dislikes" /></dd>
                        <dt>Views</dt>
                        <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Views" /></dd>
                        <dt>Category</dt>
                        <dd>
                            <select onChange={formik.handleChange} name="CategoryId" className="form-select">
                                {
                                    Category.map(cat=>
                                        <option key={cat.CategoryId} value={cat.CategoryId}>{cat.CategoryName}</option>
                                    )
                                }
                            </select>
                        </dd>
                    </dl>
                    <button className="btn btn-primary">Add Video</button>
                    <Link to="/admin-dash" className="btn btn-danger ms-2">Cancel</Link>
                </form>
            </div>
        </div>
    );
}