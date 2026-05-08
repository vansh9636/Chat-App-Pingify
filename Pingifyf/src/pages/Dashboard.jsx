import { React, useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import axios from 'axios'
import ChatPage from './ChatPage'

const Dashboard = () => {

  const { userdata } = useContext(Context)

  const [alluserdata, setAlluserdata] = useState([])
  const [showsearch, setShowsearch] = useState(false)
  const [showchat, setShowchat] = useState(false)
  const [selectedchat, setSelectedchat] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function getAlluser() {

      try {

        const response = await axios.get(
          "http://localhost:5000/user/getallusers",
          { withCredentials: true }
        )

        if (response.data.success) {
          setAlluserdata(response.data.users)
        }

      } catch (error) {

        console.error("Error fetching all users:", error)

      } finally {

        setLoading(false)

      }
    }

    getAlluser()

  }, [])

  const selectUser = (user) => {
    setSelectedchat(user)
    setShowchat(true)
  }

  return (

    <div className='relative'>

      {/* Dashboard */}
      <div className='h-screen max-w-md flex flex-col bg-white'>

        {/* Navbar */}
        <nav className='bg-[#dcfcb4] h-13 flex items-center'>

          <div className='h-full w-40'>
            <img
              className='w-full h-full object-cover'
              src="assets/pingify_vartical.png"
              alt=""
            />
          </div>

          <div className='flex-1 flex items-center justify-end gap-5 px-5'>

            <button
              className='text-xl'
              onClick={() => setShowsearch(true)}
            >
              <i className="ri-search-line"></i>
            </button>

            <div className='w-8 h-8 rounded-full border overflow-hidden'>
              <img
                src="assets/defaultAvatar.jpg"
                alt="Avatar"
                className='w-full h-full object-cover'
              />
            </div>

          </div>

        </nav>

        {/* Users */}
        <div className='flex-1 overflow-y-auto'>

          {loading ? (

            <div className='h-full flex justify-center items-center'>
              <p>Loading...</p>
            </div>

          ) : alluserdata.length === 0 ? (

            <div className='h-full flex justify-center items-center'>
              <p>No users found</p>
            </div>

          ) : (

            alluserdata.map((user) => {

              return (

                <div
                  key={user._id}
                  onClick={() => selectUser(user)}
                  className='bg-[#dcfcb4] h-20 m-4 rounded-lg flex items-center justify-between px-5 cursor-pointer active:scale-[0.98] transition'
                >

                  <div className='flex items-center gap-3'>

                    <div className='w-11 h-11 rounded-full border overflow-hidden'>
                      <img
                        src="assets/defaultAvatar.jpg"
                        alt="Avatar"
                        className='w-full h-full object-cover'
                      />
                    </div>

                    <div>

                      <h1 className='text-lg font-semibold'>
                        {user.name}
                      </h1>

                      <p className='text-sm text-gray-500'>
                        Tap to chat
                      </p>

                    </div>

                  </div>

                </div>

              )

            })

          )}

        </div>

      </div>

      {/* Search Page */}
      <div
        className={`w-full h-screen bg-zinc-100 absolute right-0 transition-all duration-300 z-20 ${showsearch ? 'top-0' : '-top-full'
          }`}
      >

        <div className='h-13 w-full flex px-2 gap-2 bg-[#dcfcb4] items-center'>

          <button
            onClick={() => setShowsearch(false)}
            className='text-3xl'
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>

          <input
            type="text"
            placeholder='Search...'
            className='bg-transparent border-none focus:outline-none w-full'
          />

        </div>

      </div>

      {/* Chat Page */}
      <div
        className={`w-full h-screen bg-zinc-100 absolute right-0 transition-all duration-300 z-30 ${showchat ? 'top-0' : 'top-full'
          }`}
      >

        {/* Chat Navbar */}
        <nav className='h-13 w-full flex px-2 gap-2 bg-[#dcfcb4] items-center'>

          <button
            onClick={() => setShowchat(false)}
            className='text-3xl'
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>

          <div className='flex items-center gap-3'>

            <div className='w-8 h-8 border rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src="assets/defaultAvatar.jpg"
                alt=""
              />
            </div>

            <h2 className='font-medium'>
              {selectedchat?.name}
            </h2>

          </div>

        </nav>

        {/* Chat Component */}
        {selectedchat && (
          <ChatPage receiverId={selectedchat._id} />
        )}

      </div>

    </div>
  )
}

export default Dashboard