import { React, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const ChatPage = ({ senderId }) => {
    const [showhibox, setshowhibox] = useState(false);
    const [chatdata, setchatdata] = useState(null);
    useEffect(() => {
        async function fetchChatData() {
            try {
                const response = await axios.get(`http://localhost:5000/message/get/${senderId}`, { withCredentials: true });
                const data = response.data;
                if (data == null) {
                    setshowhibox(true);
                }
                if (data) {
                    setchatdata(data);
                }

            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        }
        fetchChatData();
    }, [senderId]);

    return (
        <>
            <div className=' h-[calc(100%-3.25rem)] flex flex-col justify-end'>
                <div className='flex-1'>
                    {showhibox && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <div className='w-35 h-40 bg-[#dcfcb4] rounded-lg p-2 '>
                                <h5 className='text-sm text-zinc-600 font-semibold'>Here is no chat ..</h5>
                                <div className='  flex flex-col items-center'>
                                    <div className='w-20 h-25'>
                                        <img className='w-full h-full object-contain' src="../assets/Wumpus Hi.gif" alt="" /></div>
                                    <h3 className='text-sm font-semibold'>Say Hi...</h3>
                                </div>
                            </div>
                        </div>

                    )}
                    {chatdata && (
                        chatdata.messages.map((message) => {
                            return (
                                <div key={message._id} className={`w-fit max-w-xs p-2 m-2 rounded-lg ${message.senderId === senderId ? 'bg-[#dcfcb4] float-left' : 'bg-white float-right'}`}>
                                    <p>{message.message}</p>
                                </div>
                            )
                        })
                    )}

                </div>
                <div className='flex w-full h-13 bg-[#dcfcb4] items-center gap-3 px-4 '>
                    <input
                        type="text"
                        placeholder='Type a message...'
                        className=' py-2 border-[#7cca29] outline-none flex-1' />
                    <button className='text-[#7cca29] text-xl'><i class="ri-send-plane-2-fill"></i></button>
                </div>
            </div>
        </>
    )
}

export default ChatPage