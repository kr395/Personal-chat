import { useEffect, useState } from "react";
import {
  databases,
  PROJECT_ID,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

const Room = () => {
  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES
    );
    console.log(response);
  };

  return <div>Room</div>;
};

export default Room;
