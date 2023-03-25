import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
//import TextEditor from './TextEditor';
//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRef } from 'react';
import {Editor} from '@tinymce/tinymce-react';
const Add_subject = () => {
  const editorRef = useRef();
  
  const [value, setValue] = useState('<p>this is 11HS</p>');
  const [text, setText] = useState('');
  const [inpval,setINP] = useState({
    department:"",
    subject:""
  })
  const setData = (e) =>{
    console.log(e.target.value);
    const {name,value} = e.target;
    setINP((preval)=>{
      return {
        ...preval,
        [name]:value
      }
    })
  }
  const addsubdata = async(e)=>{
    e.preventDefault();
    const {department, subject} = inpval;
    const content = editorRef.current.getContent();
    console.log(content);
    const res = await fetch("/Add_subject",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        department,subject,content
      })
    });
    const data= await res.json();
    console.log(data);

    if(res.status === 422 || !data){
      alert("error");
      console.log("error");
    }else{
      alert("data added");
      console.log("data added");
    }
  }
  return (
    <div className='container'>
        <NavLink to='/'>home</NavLink>
        <form className='mt-5'>
          <div className="row mb-5">
            <div className="col">
              <input type="text" value={inpval.department} onChange={setData} name="department" className="form-control" placeholder="Department" aria-label="Department" />
            </div>
            <div className="col">
              <input type="text" value={inpval.subject} onChange={setData} name="subject" className="form-control" placeholder="Subject" aria-label="Subject" />
            </div>
          </div>

          <div>
            <Editor
                value={value}
                textareaName='content'
                onInit={(evt, editor) => {
                  setText(editor.getContent({format: 'text'}));
                  editorRef.current = editor;
                }}
                onEditorChange={(newValue, editor) => {
                  setValue(newValue);
                  setText(editor.getContent({format: 'text'}));
                }}
              />
              <pre>{value}</pre>
          </div>
          <pre>{text}</pre>
          <button type="submit" onClick={addsubdata} className="btn btn-primary mt-5">Submit</button>
        </form>
    </div>
  )
}

export default Add_subject