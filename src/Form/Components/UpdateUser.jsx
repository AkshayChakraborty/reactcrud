import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {UpdateUserData, getEditUser} from '../Api/Api'
import { toast } from 'react-toastify'
import axios from 'axios'
import {Comment} from 'react-loader-spinner'
import './Spinner.css'

const initialValues = {
  name: '',
  email: '',
  phone: '',
  city: "", 
}
const UpdateUser = () => {
  const [user, setUser] = useState(initialValues)
  const [error, setError] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()
  const [spinner,setSpinner]=useState(true)
    //for validate form
    const validation = () => {
      let error = {}
      if (!user.name) {
          error.name = "Name is Required"
      }
      if (!user.email) {
          error.email = "Email is Required"
      } else if (
          !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
      ) {
          error.email = "Enter a valid Email"
      }
  
      if (!user.phone) {
          error.phone = "Phone is Required"
      }
  
      if (!user.city) {
          error.city = "City is Required"
      }
  
      return error
  }
  
  //onChange Validation
  let name, value
      const postUserData =(e)=> {
          name = e.target.name
          value = e.target.value
  
          setUser({ ...user, [name]: value })
  
          if (name === "name") {
              if (value.length === 0) {
                  setError({ ...error, name: "@Name is Required" })
                  setUser({ ...user, name: "" })
              } else {
                  setError({ ...error, name: "" })
                  setUser({ ...user, name: value })
              }
          }
  
          if (name === "email") {
              if (value.length === 0) {
                  setError({ ...error, email: "@Email is Required" })
                  setUser({ ...user, email: "" })
              } else {
                  setError({ ...error, email: "" })
                  setUser({ ...user, email: value })
              }
          }
  
          if (name === "phone") {
              if (value.length === 0) {
                  setError({ ...error, phone: "@Phone is Required" })
                  setUser({ ...user, phone: "" })
              } else {
                  setError({ ...error, phone: "" })
                  setUser({ ...user, phone: value })
              }
          }
  
          if (name === "city") {
              if (value.length === 0) {
                  setError({ ...error, city: "@City is Required" })
                  setUser({ ...user, city: "" })
              } else {
                  setError({ ...error, city: "" })
                  setUser({ ...user, city: value })
              }
          }
  
      }

      const SubmitInfo = e => {
        e.preventDefault()
        let ErrorList = validation()
        setError(validation())

        if (Object.keys(ErrorList).length === 0) {
            let reg = {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password,
                city: user.city,
                state: user.state,
                dob: user.dob
            }
            console.log(reg)
        }
    }

    //update post data
      const UpdatedUser=async()=>{
        await UpdateUserData(user,id)
        navigate('/')
        toast("Update User Details...")
   
      }

      //get edit user data
      const getData=async()=>{
        const responce= await getEditUser(id)
        setUser(responce?.data)
        setSpinner(false)
      }
      useEffect(()=>{
        getData()
      },[])
      if(spinner){
        return(
            <div className='comment'><Comment
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#F4442E"
          /></div>
        )
      }
  return (
    <>
    <form  onSubmit={SubmitInfo} className="container mt-5">
                <h1 style={{textAlign:"center", color:"rgb(161, 161, 46)"}}> Edit User Details</h1>
                <div>
                    <label > Name </label>
                    <input type="text" className="form-control" name="name" value={user.name} onChange={e => postUserData(e)} />
                    <span style={{ color: "red", marginLeft: "24px" }}> {error.name} </span>
                </div>
                <div>
                    <label> Email </label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={e => postUserData(e)} />
                    <span style={{ color: "red", marginLeft: "24px" }}> {error.email} </span>
                </div>
                <div>
                    <label> Phone </label>
                    <input type="number" className="form-control" name="phone" value={user.phone} onChange={e => postUserData(e)} />
                    <span style={{ color: "red", marginLeft: "24px" }}> {error.phone} </span>
                </div>
                
                <div>
                    <label> City </label>
                    <input type="text" className="form-control" name="city" value={user.city} onChange={e => postUserData(e)} />
                    <span style={{ color: "red", marginLeft: "24px" }}> {error.city} </span>
                </div>
                
               
                <div>
                    <button type="submit" className="btn btn-success px-4 py-2" onClick={() => UpdatedUser()}> Update User </button>
                </div>
            </form>

    </>
  )
}

export default UpdateUser