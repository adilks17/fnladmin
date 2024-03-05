import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './Chat.css';

const ReceiverChatWindow = ({ onClose, userId, Pid }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const uid = userId.toString();
    const pid = Pid.toString();

    useEffect(() => {
        axios.get('http://localhost:3005/prevmessages')
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    const filteredMessages = messages.filter((message) => {
        return (
            (message.sender === uid && message.receiver === pid) ||
            (message.sender === pid && message.receiver === uid)
        );
    });

    const handleSendMessage = () => {
        if (newMessage.trim() === '') {
            return;
        }

        const message = {
            text: newMessage,
            receiver: uid,
            timestamp: new Date().toLocaleTimeString(),
            sender: pid,
            sent: false,
            seen: false,
        };

        axios.post('http://localhost:3005/messages', message)
            .then((response) => {
                const sentMessage = { ...response.data, sent: true };
                setMessages([...messages, sentMessage]);
                setNewMessage('');
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });
    };

    const handleSeenUpdate = (messageId) => {
        const messageToUpdate = messages.find((msg) => msg._id === messageId);
        if (!messageToUpdate.seen) {
            axios.put(`http://localhost:3005/messages/${messageId}`, { seen: true })
                .then((response) => {
                    const updatedMessages = messages.map((msg) =>
                        msg._id === messageId ? { ...msg, seen: true } : msg
                    );
                    setMessages(updatedMessages);
                })
                .catch((error) => {
                    console.error('Error updating message:', error);
                });
        }
    };
    return (
        <div>
            <div className="chat-window">
                <div className="chat-header">
                    <span>Chat</span>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="chat-container">
                    {filteredMessages.map((message, index) => {
                        const mainClass = message.sender === uid ? "reply" : "message";
                        const textClass = message.sender === uid ? "reply-text" : "message-text";
                        const timeClass = message.sender === uid ? "reply-time" : "message-time";
                        let statusIcon;

                        if (message.sender === uid && message.receiver === pid) {
                            statusIcon = message.seen ?  <DoneAllIcon fontSize='small'/>: <CheckIcon  fontSize='small'/>;
                            handleSeenUpdate(message._id); // Mark message as seen
                        } else {
                            statusIcon = <CheckIcon  fontSize='small'/>;
                        }

                        return (
                            <div key={index} className={mainClass}>
                                <div className={`${textClass} message-text-container`}>
                                    {message.text}
                                    <div className="message-status">{statusIcon}</div>
                                </div>
                                <div className={timeClass}>{message.timestamp}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="chat-text-input">
                    <textarea className="message-input" placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}></textarea>
                    <IconButton color="primary" aria-label="send" fontSize='small' onClick={handleSendMessage}>
                        <SendIcon fontSize='small'/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ReceiverChatWindow;
