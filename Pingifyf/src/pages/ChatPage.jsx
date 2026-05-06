import { React, useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = ({ senderId }) => {
    const [chatdata, setchatdata] = useState(null);
    const [message, setmessage] = useState("")

    useEffect(() => {
        async function fetchChatData() {
            try {
                const response = await axios.get(
                    `http://localhost:5000/message/get/${senderId}`,
                    { withCredentials: true }
                );

                const data = response.data;

                
                setchatdata({
                    ...data,
                    messages: data.messages || []
                });

            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        }

        fetchChatData();
    }, [senderId]);

    async function sendMessage(e) {
        try {
            e.preventDefault();
            if (message.trim() === "") return;

            const response = await axios.post(
                `http://localhost:5000/message/send/${senderId}`,
                { message },
                { withCredentials: true }
            );

            if (response.data.success) {
                setchatdata((prev) => ({
                    ...prev,
                    messages: [...(prev?.messages || []), response.data.newmessage],
                }));
            }

            setmessage("");
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    const isEmpty = !chatdata || chatdata.messages.length === 0;

    return (
        <>
            <div className=' h-[calc(100%-3.25rem)] flex flex-col justify-end'>
                <div className='flex-1 flex flex-col overflow-y-auto'>

                    {isEmpty && (
                        <div onClick={() => setmessage("hi")} className='w-full h-full flex justify-center items-center'>
                            <div className='w-35 h-40 bg-[#dcfcb4] rounded-lg p-2 '>
                                <h5 className='text-sm text-zinc-600 font-semibold'>Here is no chat ..</h5>
                                <div className='flex flex-col items-center'>
                                    <div className='w-20 h-25'>
                                        <img className='w-full h-full object-contain' src="../assets/Wumpus Hi.gif" alt="" />
                                    </div>
                                    <h3 className='text-sm font-semibold'>Say Hi...</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isEmpty && chatdata.messages.map((msg) => (
                        <div key={msg._id} className={`w-fit max-w-xs p-2 m-2 rounded-lg ${msg.senderId === senderId ? 'bg-[#dcfcb4] self-start' : 'bg-white self-end'}`}>
                            <p>{msg.message}</p>
                        </div>
                    ))}

                </div>

                <form onSubmit={sendMessage}>
                    <div className='flex w-full h-13 bg-[#dcfcb4] items-center gap-3 px-4 '>
                        <input
                            type="text"
                            placeholder='Type a message...'
                            value={message}
                            onChange={(e) => setmessage(e.target.value)}
                            className='py-2 border-[#7cca29] outline-none flex-1'
                        />
                        <button type='submit' className='text-[#7cca29] text-xl'>
                            <i className="ri-send-plane-2-fill"></i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChatPage