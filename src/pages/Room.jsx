import { useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import client, {
  databases,
  PROJECT_ID,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";
import { ID, Query, Role, Permission } from "appwrite";
import Header from "../Components/Header";
import { useAuth } from "../utils/AuthContext";

const Room = () => {
  //useState Hooks
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const  {user} = useAuth();
  const kr_id = "66ee8a83000b33956b45";
  // This function is called when the component mounts
  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        console.log("REALTIME RES", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          // console.log("REALTIME ITEM CREATED");
          setMessages((prevState) => [response.payload, ...prevState]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          // console.log("REALTIME ITEM DELETED");
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.id)
          );
          getMessages();
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          // console.log("REALTIME ITEM UPDATED");
        }
      }
    );

    return () => {
      // console.log("unsubscribe called");
      unsubscribe();
    };
  }, []);

  // This function is used for getting the messages from database using appwrite
  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    // console.log("getMessages Called");
    setMessages(response.documents);
    // console.log(response);
  };

  //This function handles the chat submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id : user.$id,
      username : user.name,
      body: messageBody,
    };
    let permissions = [
      Permission.write(Role.user(user.$id)),
    ];

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions
    );
    console.log("Msg Created : ", response);
    // setMessages([...messages, response]);
    setMessageBody("");
  };
  // This Function deletes the message
  const deleteMessage = async (id) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
    //setMessages(prevState => prevState.filter(message => message.$id !== message_id))
  };

  return (
    <main className="container">
      <Header />
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
            <div key={message.$id} className={`message--wrapper`}>
              <div className="message--header">
                <p>
                  {message?.username? (
                    <span>{message.username}</span>
                  ) : (
                    <span>Anonymous User</span>
                  )}
                </p>
                <small className="message-timestamp">
                  {new Date(message.$createdAt).toLocaleString()}
                </small>
                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (

                <Trash2
                  className="delete--btn"
                  onClick={() => {
                    deleteMessage(message.$id);
                  }}
                />
                )}
              </div>
              <div className="message--body" style={ message.user_id === kr_id ? { backgroundColor: 'steelblue' } : {  }}>
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
