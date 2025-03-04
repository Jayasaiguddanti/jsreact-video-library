import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToviewlater } from "../slicers/vid-slicer";



export function UserDashBoard(){

    const [cookies, setCookie, removeCookie] = useCookies(['username']);
    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:'', Comments:[''], CategoryId:0}]);
    const [SearchVal, setSearchVal] = useState("");

    let navigate = useNavigate();
    let dispatch = useDispatch();

    function handleSignout(){
        removeCookie('username');
        navigate('/user-login');
    }

    

    useEffect(()=>{

        axios.get(`http://127.0.0.1:2025/get-videos`)
        .then(response=>{
            setVideos(response.data);
        })

    },[])

    function HandleViewLater(video){
        alert('Video added to view later');
        dispatch(addToviewlater(video));
    }

    function Search(){
        axios.get(`http://127.0.0.1:2025/get-videos/${SearchVal}`)
        .then(response=>{
            setVideos(response.data);
        })
    }

    function Filtervideo(event) {
        const categoryId = event.target.value;
        
        if (categoryId !== "Select Category") {
            axios.get(`http://127.0.0.1:2025/filter-videos/${categoryId}`)
                .then(response => {
                    setVideos(response.data);
                })
                .catch(error => {
                    console.error("Error fetching filtered videos:", error);
                });
        } else {
            axios.get(`http://127.0.0.1:2025/get-videos`)
                .then(response => {
                    setVideos(response.data);
                })
                .catch(error => {
                    console.error("Error fetching videos:", error);
                });
        }
    }
    
    return(
        <div className="bg-light p-2 m-2">
            <h3 className="d-flex justify-content-between"><div><span>{cookies['username']}</span> <span>Dashboard</span></div> <div><button onClick={handleSignout} className="btn btn-link">Signout</button></div> </h3>
            <div className="row">
                <div className="col-2">
                    <div className="mb-3">
                    <label className="form-label fw-bold">Search Videos</label>
                    <div className="input-group">
                        <input type="text" value={SearchVal} onChange={(e)=> setSearchVal(e.target.value)} className="form-control" />
                        <button onClick={Search} className="bi bi-search btn btn-warning"></button>
                    </div>
                    </div>
                    <div>
                        <label className="form-label fw-bold">Select Category</label>
                        <div>
                            <select onChange={Filtervideo} className="form-control">
                                <option>Select Category</option>
                                <option value="1">Java</option>
                                <option value="2">Python</option>
                                <option value="3">Javascript</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                <section className="mt-4 d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div className="card m-2 p-2" style={{width:'250px'}}>
                            <div className="card-title" style={{height:'60px'}}>
                                <h5>{video.Title}</h5>
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} className="w-100" height="200"></iframe>
                            </div>
                            <div className="card-footer">
                                <span className="bi bi-eye-fill"> {video.Views} </span> 
                                <span className="bi mx-3 bi-hand-thumbs-up"> {video.Likes} </span>
                                <span className="bi bi-hand-thumbs-down"> {video.Dislikes} </span>
                                <button onClick={HandleViewLater} className="bi bi-download btn"> Watch Later </button>
                            </div>
                        </div>
                    )
                }
            </section>
                </div>
            </div>
        </div>
    )
}