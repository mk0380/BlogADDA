import React from 'react'
import { formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom'

const Post = ({_id, title, summary, cover, content, createdAt, author }) => {

  return (
    <>
      <div className="post" >
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={cover} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <p  style={{fontFamily:"cursive",fontSize:"1rem",color:"#00538C",background:"#B0C4DE",padding:"3px"}} className='author'>{author.username}</p>
            <time style={{fontFamily:"cursive",fontSize:"1rem",color:"#00538C",background:"#B0C4DE",padding:"3px"}}>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
      </div>
    </>
  )
}

export default Post




