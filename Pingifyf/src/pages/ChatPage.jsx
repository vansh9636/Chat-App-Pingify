import { React, useEffect, useRef, useState } from 'react'
import axios from 'axios'

const ChatPage = ({ receiverId }) => {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)

    const bottomRef = useRef(null)

    useEffect(() => {

        async function fetchChatData() {

            try {

                setLoading(true)

                const response = await axios.get(
                    `http://localhost:5000/message/get/${receiverId}`,
                    { withCredentials: true }
                )

                setMessages(response.data || [])

            } catch (error) {

                console.error('Error fetching chat data:', error)

            } finally {

                setLoading(false)

            }
        }

        if (receiverId) {
            fetchChatData()
        }

    }, [receiverId])

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        })

    }, [messages])

    async function sendMessage(e) {

        e.preventDefault()

        if (!message.trim()) return

        try {

            const response = await axios.post(
                `http://localhost:5000/message/send/${receiverId}`,
                { message },
                { withCredentials: true }
            )

            if (response.data.success) {

                setMessages((prev) => [
                    ...prev,
                    response.data.newMessage || response.data.newmessage
                ])

            }

            setMessage("")

        } catch (error) {

            console.error('Error sending message:', error)

        }
    }

    const isEmpty = messages.length === 0

    return (

        <div className='h-[calc(100%-3.25rem)] flex flex-col'>

            <div className='flex-1 overflow-y-auto flex flex-col p-2'>

                {loading ? (

                    <div className='w-full h-full flex justify-center items-center'>
                        <p>Loading...</p>
                    </div>

                ) : isEmpty ? (

                    <div
                        onClick={() => setMessage("Hi")}
                        className='w-full h-full flex justify-center items-center'
                    >

                        <div className='w-36 h-40 bg-[#dcfcb4] rounded-lg p-2'>

                            <h5 className='text-sm text-zinc-600 font-semibold'>
                                No messages yet
                            </h5>

                            <div className='flex flex-col items-center'>

                                <div className='w-20 h-24'>
                                    <img
                                        className='w-full h-full object-contain'
                                        src="../assets/Wumpus Hi.gif"
                                        alt=""
                                    />
                                </div>

                                <h3 className='text-sm font-semibold'>
                                    Say Hi
                                </h3>

                            </div>

                        </div>

                    </div>

                ) : (

                    messages.map((msg) => (

                        <div
                            key={msg._id}
                            className={`w-fit max-w-[75%] px-3 py-2 my-1 rounded-xl wrap-break-words ${msg.receiverId === receiverId
                                    ? 'bg-[#dcfcb4] self-end'
                                    : 'bg-white self-start'
                                }`}
                        >

                            <p className='text-sm'>
                                {msg.message}
                            </p>

                        </div>

                    ))

                )}

                <div ref={bottomRef}></div>

            </div>

            <form
                onSubmit={sendMessage}
                className='h-13 bg-[#dcfcb4] flex items-center gap-3 px-4'
            >

                <input
                    type="text"
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='flex-1 bg-transparent outline-none'
                />

                <button
                    type='submit'
                    className='text-[#7cca29] text-xl'
                >
                    <i className="ri-send-plane-2-fill"></i>
                </button>

            </form>

        </div>
    )
}

export default ChatPage