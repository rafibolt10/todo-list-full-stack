import { FaPencilAlt } from "react-icons/fa";
import './App.css';
import { RiDeleteBinFill } from "react-icons/ri";
import { useEffect, useState } from "react";

function App(){
  let [list,setList]=useState([]);
  let [status,setStatus]=useState(true);
let [details,setDetails]= useState({
  title:"",
  description:""
})

useEffect(()=>{
  fetch("https://todo-list-full-stack-five.vercel.app/showItem",{
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then(res => {
  if (res.ok) {
    return res.json()
  }
}).then(items => {
  setList(items.reverse());
}).catch(error => {
  console.log(error)
})
},[status])


const handleSubmit = (a) => {
  a.preventDefault();
  console.log(details);
// fetch () keyword is hotel waiter carry information between frontend and backend
fetch("https://todo-list-full-stack-five.vercel.app/createItem",{
  method: 'POST',
  headers: {'content-type':'application/json'},
  body:JSON.stringify(details)
}).then(res => {
  if (res.ok) {
    return res.json();
  }
  // then()promise when it error then it goes to catch.. when promise true it goes to next then()
}).then(task => {
  console.log(task);
  setStatus(!status);
   // this then()promise when it error then it goes to catch
   setDetails({
    title:"",
    description:""
   })
}).catch(error => {
  console.log(error);
})
}

const handleEdit = (j) => {
  console.log(j);
  setDetails(j);
}

// ---------- Edit panna data API la Send panni MongoDB la Store panna vekkano -----------

const updateItem = () => {
  fetch(`https://todo-list-full-stack-five.vercel.app/editItem/${details._id}`,{
  method: 'PUT',
  headers: {'content-type':'application/json'},
  body:JSON.stringify(details)
}).then(res => {
  if (res.ok) {
    return res.json();
  }
  // then()promise when it error then it goes to catch.. when promise true it goes to next then()
}).then(task => {
  console.log(task);
  setStatus(!status);
   // this then()promise when it error then it goes to catch
   setDetails({
    title:"",
    description:""
   })
}).catch(error => {
  console.log(error);
})
}

//---------------------- Deleting the TASK by id using click -----------------

const handleDelete = (itemId) => {
   fetch(`https://todo-list-full-stack-five.vercel.app/deleteItem/${itemId}`,{
  method: 'DELETE',
  headers: {'content-type':'application/json'}
}).then(task => {
alert("Deleted Successfully")
  setStatus(!status);
}).catch(error => {
  console.log(error);
})
}

  return(
    <>
    <div className='TodolistFrame'>
    <div className='createTaskContainer'>
      <h1>CreateTask</h1>
<form onSubmit={(z)=> handleSubmit(z)}>
  <label>Title</label><br/><br/>
  <input type="text" onChange={(e)=> setDetails({...details,title:e.target.value})} value={details.title} id="title" name="title" placeholder='Enter your Task Title' required/><br/><br/>
  <label>Description</label><br/><br/>
  <input type="text"  onChange={(e)=> setDetails({...details,description:e.target.value})} value={details.description} id="description" name="description" placeholder='Description  of your Task' required/><br/><br/>
 { details._id ? <input type="button" id="submit" onClick={updateItem} value="Update"/> : <input type="submit" id="submit" value="Submit"/>}
</form>
    </div>
    <div className='showtaskContainer'>
<h1>ShowTasks</h1>

{list.map((item)=>{
  return(
<div className='taskCard'>
  <div>
    <h2>{item.title}</h2>
    <p>{item.description}</p>
  </div>
  <div className="icons">
   <button className="FaPencilAlt" onClick={()=>handleEdit(item)}><FaPencilAlt /></button>
  <button className="RiDeleteBinFill" onClick={()=>handleDelete(item._id)}><RiDeleteBinFill /></button>
  </div>
</div>
  )
})}


    </div>
    </div>
    </>
  )

}
export default App;
