import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from '@material-ui/core'
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


const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState("");

    const navigate = useNavigate();

    async function createNewPost(ev) {

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files);
        data.set('user', localStorage.getItem("user"))

        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });
        const result = await response.json();
        
        if (result.data) {
            toast.success("Post Created Successfully !", {
                closeButton: false
            })
           return navigate('/')
        } else {
            toast.error(result.message, {
                closeButton: false
            })
        }

    }

    const imageHandler = async (ev) => {
        const pic = ev.target.files[0];

        const set_pic = await convertBase64(pic);

        await set_piccture(set_pic);


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
        <form onSubmit={createNewPost} encType="multipart/form-data" style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            <TextField type="text"
                required
                label={'Title'}
                variant="outlined"
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ className: "textfield__label" }}
                fullWidth
                value={title}
                onChange={ev => setTitle(ev.target.value)} />
            <TextField type="text"
                required
                label={'Summary'}
                variant="outlined"
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ className: "textfield__label" }}
                fullWidth
                value={summary}
                onChange={ev => setSummary(ev.target.value)} />
            <TextField type="file"
                required
                variant="outlined"
                // inputProps={{accept:"image/*"}}
                inputProps={{ accept:"image/*",style: { color: "white" } }}
                InputLabelProps={{ className: "textfield__label" }}
                fullWidth
                onChange={imageHandler}
            />

            <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} required fullWidth />
            <button style={{ marginTop: '5px' }}>Create post</button>
        </form>

    )
}

export default CreatePost
