import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {TextField} from '@material-ui/core'
import { toast } from 'react-toastify';



const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ]
};

const formats = [
    'font',
    'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'color', 'background'
];


const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id).then(response => {
            response.json().then(res => {
                setTitle(res.data.title)
                setContent(res.data.content)
                setSummary(res.data.summary)
            })
        })
    }, [])

    async function updatePost(ev) {

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id)
        if (files.length!==0)
            data.set('file', files);

        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });
        const result = await response.json();
        // alert(result.message)
        // if (result.success) {
        //     return navigate('/post/' + id)
        // }

        if (result.data) {
            toast.success("Post Edited Successfully !", {
                closeButton: false
            })
            return navigate('/post/' + id)
        } else {
            toast.error(result.message, {
                closeButton: false
            })
        }
    }

    const imageHandler =async (ev) =>{
        const pic = ev.target.files[0];

        console.log(pic);
 
        const set_pic = await convertBase64(pic);

        console.log(set_pic);
 
        await set_piccture(set_pic);
 
     //    console.log(files);
 
     }
 
     const set_piccture = set_pic => {
         setFiles(set_pic)
     }
 
     const convertBase64 = (file) => {
         return new Promise((resolve, reject) => {
           const fileReader = new FileReader();
           fileReader.readAsDataURL(file);
     
           fileReader.onload = () => {
             resolve(fileReader.result);
           };
     
           fileReader.onerror = (error) => {
             reject(error);
           };
         });
       };
 
 

    return (
        <form onSubmit={updatePost} encType="multipart/form-data" style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center"}}>
           <TextField type="text"
            required
                label={'Title'}
                variant="outlined"
             inputProps={{ style: { color: "white" } }}
             InputLabelProps={{className: "textfield__label"}}
             fullWidth
             value={title}
             onChange={ev => setTitle(ev.target.value)}/>
            <TextField type="text"
            required
                label={'Summary'}
                variant="outlined"
             inputProps={{ style: { color: "white" } }}
             InputLabelProps={{className: "textfield__label"}}
             fullWidth
             value={summary}
             onChange={ev => setSummary(ev.target.value)}/>
             <TextField type="file"
                variant="outlined"
                inputProps={{ accept:"image/*",style: { color: "white" } }}
             InputLabelProps={{className: "textfield__label"}}
             fullWidth
             onChange={imageHandler}
             />
            <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} required />
            <button style={{ marginTop: '5px' }}>Update post</button>
        </form>

    )
}

export default EditPost
