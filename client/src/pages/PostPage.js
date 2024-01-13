import { useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';


export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(res => {
          setPostInfo(res.data);
        });
      });
  }, []);

  const deletePost =async () =>{
    const response =await fetch(`http://localhost:4000/delete/${id}`)
    const result = await response.json();
    
    // alert(result.message)

    // if(result.success){
    //   navigate('/')
    // }

    if (result.success) {
      toast.success("Post Deleted Successfully !", {
          closeButton: false
      })
     return navigate('/')
  } else {
      toast.error(result.message, {
          closeButton: false
      })
  }

  }

  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {localStorage.getItem('user') === postInfo.author.username && (
        <div className="edit-row" style={{display:"flex",gap:"10px",justifyContent:"center"}}>
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
          <Link className="edit-btn" to={`/delete/${postInfo._id}` } style={{background:"red"}} onClick={deletePost}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Delete this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`${postInfo.cover}`} alt=""/>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  );
}