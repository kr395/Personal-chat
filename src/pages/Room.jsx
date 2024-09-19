import { useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import {
  databases,
  PROJECT_ID,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";
import { ID, Query } from "appwrite";

const Room = () => {
  //useState Hooks
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  // This function is called when the component mounts
  useEffect(() => {
    getMessages();
  }, []);

  // This function is used for getting the messages from database using appwrite
  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    console.log(response);
    setMessages(response.documents);
  };

  //This function handles the chat submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      body: messageBody,
    };
    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );
    console.log("Msg Created : ", response);
    setMessages([...messages, response]);
    setMessageBody("");
  };
  // This Function deletes the message
  const deleteMessage = async (messageId) => {
    const response = await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      messageId
    );
    setMessages((prevMsg) =>
      messages.filter((message) => message.$id !== messageId)
    );
  };

  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form" action="">
          <div>
            <textarea
              required
              maxLength={1000}
              placeholder="Say Something..."
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="Send" />
          </div>
        </form>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message-timestamp">
                  {new Date(message.$createdAt).toLocaleString()}
                </small>

                <Trash2 
                className="delete--btn"
                onClick={() => deleteMessage(message.$id)} />
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
