import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
//import TextEditor from './TextEditor';
//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import {Editor} from '@tinymce/tinymce-react';
const Edit = () => {
  //const [getsubdata, setsubdata] = useState([]); 
  
  const editorRef = useRef();
  
  const [value, setValue] = useState('<p>The quick brown fox jumps over the lazy dog</p>');
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
  const {id} = useParams("");
  
  const getdata = async()=>{
        
    const res = await fetch(`/getsubject/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data= await res.json();
    console.log(data);

    if(res.status === 422 || !data){
      alert("error");
      console.log("error");
    }else{
      setINP(data)
      setValue(data.content)
      //setText(data.content)
      console.log("getdata");
    }
  }
  useEffect(()=>{
    getdata();
  },[])

  const updatesubject = async(e)=>{
    e.preventDefault();
    const {department, subject} = inpval;
    //const content = editorRef.current.getContent();
    //var content = editorRef.activeEditor.getContent();
    if (editorRef.current) {
      setValue(editorRef.current.getContent());
    }
    console.log(value);
    const content=value;
    const res2 = await fetch(`/updatesubject/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        department,subject,content
      })
    });
    const data2= await res2.json();
    console.log(data2);

    if(res2.status === 422 || !data2){
      alert("error");
      console.log("error");
    }else{
      alert("data updated");
      console.log("data updated");
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
                }}
                onEditorChange={(newValue, editor) => {
                  setValue(newValue);
                  setText(editor.getContent({format: 'text'}));
                }}
              />
              <pre>{value}</pre>
          </div>
          <pre>{text}</pre>
          <button type="submit" onClick={updatesubject} className="btn btn-primary mt-5">Submit</button>
        </form>
    </div>
  )
}

export default Edit