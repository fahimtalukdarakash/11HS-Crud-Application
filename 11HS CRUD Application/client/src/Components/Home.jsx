import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
const Home = () => {
    const [getsubdata, setsubdata] = useState([]);
    console.log(getsubdata);

    const getdata = async(e)=>{
        
        const res = await fetch("/getdata",{
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
          getdata();
        }
      }
  return (
    <div className='mt-5'>
        <div className="container">
            <div className="add_btn mt-2">
                <NavLink to="/Add_subject" className='btn btn-primary'>Add Subject</NavLink>
            </div>
            <table className="table mt-5">
                <thead>
                    <tr className='table-dark'>
                    <th scope="col">id</th>
                    <th scope="col">Department</th>
                    <th scope="col">Subject</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getsubdata.map((element,id)=>{
                            return(
                                <>
                                    <tr>
                                        <th scope="row">{id+1}</th>
                                        <td>{element.department}</td>
                                        <td>{element.subject}</td>
                                        <td className='d-flex justify-content-between'>
                                            <NavLink to={`Read/${element._id}`}><button className='btn btn-success'>read</button></NavLink>
                                            <NavLink to={`Edit/${element._id}`}><button className='btn btn-primary'>update</button></NavLink>
                                            <button className='btn btn-danger' onClick={() => deletesubject(element._id)}>delete</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home