import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function Admindashboard(){
    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    const [video, setVideo] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:'', Comments:[], CategoryId:0}]);
    let navigate = useNavigate();

    function HandleSignout(){
        removeCookie('userid');
        navigate('/admin-login');
    }
    useEffect(()=>{
        axios.get('http://127.0.0.1:2025/get-videos')
        .then(response=>{
            setVideo(response.data);
        })
    },[])
    return(
        <div className="bg-white p-3 m-3">
            <h3 className="d-flex justify-content-between"><div><span>{cookies['userid']}</span> <span>Admin Dashboard</span></div> <div><button onClick={HandleSignout} className="btn btn-link">Signout</button></div> </h3>
            <div className="mb-3">
                <Link to="/add-video" className="btn btn-success bi bi-camera-video"> Add Video</Link>
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            video.map(video=>
                                <tr key={video.VideoId}>
                                    <td>{video.Title}</td>
                                    <td>
                                        <iframe src={video.Url} width="300" height="200"></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/edit-video/${video.VideoId}`} className="bi bi-pen-fill btn btn-warning me-2"></Link>
                                        <Link to={`/delete-video/${video.VideoId}`} className="bi bi-trash-fill btn btn-danger"></Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}