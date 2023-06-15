import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteUser, getAllUsers } from '../Api/Api'
import { toast } from 'react-toastify'
import { ColorRing } from 'react-loader-spinner'
import './Spinner.css'

const HomePage = () => {
    const [users, setUsers] = useState([])
    const [spinner,setSpinner]=useState(true)


    const getUsers = async () => {
        let response = await getAllUsers()
        setUsers(response?.data)
        setTimeout(()=>{
            setSpinner(false)
        })
    }
    useEffect(() => {
        getUsers()
        
    }, [])

    if(spinner){
        return(<div className="loader"><ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      /></div>)
    }

    //for delete user
  const deleteUserData=async(id)=>{
    await deleteUser(id)
    getUsers()
    toast.error('delete successfully')
    }
   
    
    console.log('d', users);

    if (users.data.length===0) {
        return (
          <>
            <div style={{ margin: "130px" }}>
            <h1 style={{textAlign:"center",color:"#800000"}}>User Details</h1>
            <br/>
                
              <h1 style={{color:"red", textAlign:"center"}}>Data Not Found....</h1>
            </div>
          </>
        );
      } else{
    return (
        <>
            <div className="container">
            <h1 style={{textAlign:"center", color:"#800000"}}>User Details</h1>
            <br/>
                {/* <Link to='/add' className='btn btn-primary'>Add User</Link> */}

                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">City</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.data?.map((item, index) => {
                            return (
                                <>
                                    <tr class="table-warning">
                                        <th scope="row">{index+1}</th>
                                        <th >{item.name}</th>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.city}</td>
                                        <td><Link to={`/update/${item._id}`} className='btn btn-success'>Update</Link></td>
                                        <td><Link onClick={()=>deleteUserData(item._id)} className='btn btn-danger'>Delete</Link></td>

                                    </tr>

                                </>
                            )
                        })}


                    </tbody>
                </table>
            </div>

        </>
    )
                    }
}

export default HomePage