import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function Editvideo(){
    const[categories, setcategories] = useState([]);
    const[videos, setvideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:'', Comments:[''], CategoryId:0}]);
    let params = useParams();
    let navigate = useNavigate();
    
    const formik = useFormik({
        initialValues:{
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            Url: videos[0].Url,
            Description: videos[0].Description,
            Likes: videos[0].Likes,
            Dislikes: videos[0].Dislikes,
            Views: videos[0].Views,
            CategoryId: videos[0].CategoryId
        },
        onSubmit:(values)=>{
            axios.put(`http://127.0.0.1:2025/edit-video/${params.id}`,values)
            alert('Video Updated Successfully');
            navigate('/admin-dash');

        },
        enableReinitialize:true
    });
    function Loadcategories(){
        axios.get(`http://127.0.0.1:2025/get-categories`)
       .then(response=>{
            response.data.unshift({CategoryId:-1, CategoryName:'Select Category'})
            setcategories(response.data);
        })
    }
    useEffect(()=>{
        Loadcategories();
        axios.get(`http://127.0.0.1:2025/get-videos/${params.id}`)
        .then(response=>{
            setvideos(response.data);
            console.log(response.data);
        })
    },[])
    return(
        <div className="d-flex justify-content-center align-items-center">
            <div className="w-50 m-3 p-3 rounded-4" style={{backgroundColor: 'rgb(169, 151, 207)'}}>
                <h3>Edit Video</h3>
                <form onSubmit={formik.handleSubmit} style={{height:'400px'}} className="overflow-auto">   
                    <dl>
                        <dt>Video Id</dt>
                        <dd><input type="number" value={formik.values.VideoId} onChange={formik.handleChange} className="form-control" name="VideoId"></input></dd>
                        <dt>Title</dt>
                        <dd><input type="text" value={formik.values.Title} onChange={formik.handleChange} className="form-control" name="Title" /></dd>
                        <dt>Url</dt>
                        <dd><input type="text" value={formik.values.Url} onChange={formik.handleChange} className="form-control" name="Url" /></dd>
                        <dt>Description</dt>
                        <dd><textarea rows="2" value={formik.values.Description} cols="40" onChange={formik.handleChange} className="form-control" name="Description"></textarea></dd>
                        <dt>Likes</dt>
                        <dd><input type="number" value={formik.values.Likes} onChange={formik.handleChange} className="form-control" name="Likes" /></dd>
                        <dt>Dislikes</dt>
                        <dd><input type="number" value={formik.values.Dislikes} onChange={formik.handleChange} className="form-control" name="Dislikes" /></dd>
                        <dt>Views</dt>
                        <dd><input type="number" value={formik.values.Views} onChange={formik.handleChange} className="form-control" name="Views" /></dd>
                        <dt>Category</dt>
                        <dd>
                            <select value={formik.values.CategoryId} onChange={formik.handleChange} name="CategoryId" className="form-select">
                                {
                                    categories.map(cat=>
                                        <option key={cat.CategoryId} value={cat.CategoryId}>{cat.CategoryName}</option>
                                    )
                                }
                            </select>
                        </dd>
                    </dl>
                    <button className="btn btn-primary">Save Video</button>
                    <Link to="/admin-dash" className="btn btn-danger ms-2">Cancel</Link>
                </form>
            </div>
        </div>
    )
}