import React, { useState, useEffect } from 'react'
import SummaryApi from '../common/index'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from 'react-icons/md'
import ChangeUserRole from '../components/ChangeUserRole'

const AllUser = () => {

    const [allUser, setAllUser] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id : ""
    })


    const fetchAllUser = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })
        const dataResponse = await fetchData.json()
        if(dataResponse.success){
            setAllUser(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
        
        console.log("dataResponse", dataResponse)
    }

    useEffect(() => {
        fetchAllUser()
    }, [])
    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>คนที่</th>
                        <th>ชื่อ</th>
                        <th>อีเมล</th>
                        <th>ตำแหน่ง</th>
                        <th>สร้างเมื่อ</th>
                        <th>ดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUser.map((el, index) => {
                            return(
                                <tr key={el._id}>
                                    <td>{index + 1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format("LL")}</td>
                                    <td>
                                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                        onClick={() => {
                                            setUpdateUserDetails(el)
                                            setOpenUpdateRole(true)
                                        }}
                                        >
                                            <MdModeEdit />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            
            
            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={()=>setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUser}
                    />
                )
            }

        </div>
    )
}
export default AllUser