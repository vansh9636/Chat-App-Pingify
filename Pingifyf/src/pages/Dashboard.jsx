import { React, useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ChatPage from './ChatPage'
const Dashboard = () => {
  const { userdata } = useContext(Context)
  const [alluserdata, setalluserdata] = useState([])
  const [showsearch, setshowsearch] = useState(false)
  const [showchat, setshowchat] = useState(false)
  const [selectedchat, setselectedchat] = useState(null);
  let arr = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 0, 8, 7, 6];
  useEffect(() => {
    async function getAlluser() {
      try {
        const response = await axios.get("http://localhost:5000/user/getallusers", { withCredentials: true });
        if (response.data.success) {
          setalluserdata(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    }
    getAlluser();
  }, [])
  const selecteduser = (user) => {
    setshowchat(true);
    setselectedchat(user);
  }

  return (
    <div className='relative'>
      <div className='h-screen max-w-md flex flex-col'>
        <nav className='bg-[#dcfcb4] h-13 flex'>
          <div className='h-full w-40'>  <img className='w-full h-full object-cover' src="assets/pingify_vartical.png" alt="" /></div>
          <div className='flex-1 flex items-center justify-end gap-5 px-5'>
            <button className='text-xl' onClick={() => setshowsearch(true)}>
              <i class="ri-search-line"></i>
            </button>
            <div className='w-7 h-7 rounded-full border overflow-hidden'>
              <img src="assets/defaultAvatar.jpg" alt="Avatar" className='w-full h-full object-cover' />
            </div>
          </div>
        </nav>
        <div className=' w-full flex-1 overflow-hidden overflow-y-auto '>
          {alluserdata.map((user) => {
            return (
              <div key={user._id} onClick={() => selecteduser(user)} className='bg-[#dcfcb4] h-20 m-4 rounded-lg flex items-center justify-between px-5'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full border overflow-hidden'>
                    <img src="assets/defaultAvatar.jpg" alt="Avatar" className='w-full h-full object-cover' />
                  </div>
                  <div>
                    <h1 className='text-lg font-semibold'>{user.name}</h1>
                    <p className='text-sm text-gray-500'>Last seen 2 hours ago</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* //search page */}
      <div className={`w-full h-screen bg-zinc-100 absolute  right-0 ${showsearch ? 'top-0 block' : 'bottom-0 hidden'}`}>
        <div className='h-13 w-full flex px-2 gap-2 bg-[#dcfcb4] items-center'>
          <button onClick={() => setshowsearch(false)} className='text-3xl'><i class="ri-arrow-left-s-line"></i></button>
          <input type="text" placeholder='Search...' className='bg-transparent border-none focus:outline-none' />
        </div>
      </div>
      {/* // Chat page */}
      <div className={`w-full h-screen bg-zinc-100 absolute  right-0 ${showchat ? 'top-0 block' : 'bottom-0 hidden'}`}>
        <nav className='h-13 w-full flex px-2 gap-2 bg-[#dcfcb4] items-center'>
          <button onClick={() => setshowchat(false)} className='text-3xl'><i class="ri-arrow-left-s-line"></i></button>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 border rounded-full overflow-hidden'>
              <img className='w-full h-full object-cover' src="../assets/defaultAvatar.jpg" alt="" />
            </div>
            <h2>{selectedchat?.name}</h2>
          </div>
        </nav>
          {showchat && selectedchat && <ChatPage senderId={selectedchat._id} />}

      </div>
    </div>
  )
}

export default Dashboard