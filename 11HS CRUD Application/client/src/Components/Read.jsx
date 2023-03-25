//import { parse } from 'path';
import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
const Read = () => {
  const [getsubdata, setsubdata] = useState([]); 
  const {id} = useParams("");
  const navigate = useNavigate();
  
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
      setsubdata(data)
      console.log("getdata");
      
    }
  }
  useEffect(()=>{
    getdata();
  },[])
  const deletesubject= async (id)=>{
    const res2 = await fetch(`/deletesubject/${id}`,{
      method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const deletedata = await res2.json();
    console.log(deletedata);
    if(res2.status === 422 || !deletedata){
      console.log("error");
    } else {
      console.log("subject deleted");
      navigate("/");
    }
  }
  //const yourHtmlString = getsubdata.content;
  return (
    <div className='container mt-3'>
      <div className='d-flex'>
        <NavLink to={`/Edit/${getsubdata._id}`}><button className='btn btn-primary me-3'>update</button></NavLink>
        <button className='btn btn-danger' onClick={() => deletesubject(getsubdata._id)}>delete</button>
      </div>
      <h1>{getsubdata.department}</h1>
        <h3 className='mt-5'>{getsubdata.subject}</h3>
        
        {/*<div dangerouslySetInnerHTML={{ __html: `${getsubdata.content}` }} />*/}
        <div>{parse(`${getsubdata.content}`)}</div>
    </div>
  )
}

export default Read