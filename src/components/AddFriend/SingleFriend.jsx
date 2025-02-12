import user from "../../assets/images/avatars/user1.jpeg";
import bellWhite from "../../assets/icons/bellWhite.svg";
import { useState } from "react";
import Toast from "../Toast/Toast";
const SingleFriend = () => {
  const [mess, setMess] = useState("");
  const handlerFollow = () => {
    setMess("does't not work yet.");
    setTimeout(() => {
      setMess("");
    }, 3000);
  };
  return (
    <div className="flex w-full sm:w-1/2 mt-2">
      {mess && <Toast message={mess} />}
      <img
        src={user}
        alt="user"
        className="w-16 h-16 border-cyan-100 border-2 rounded-full"
      />
      <div>
        <div className="flex">
          <h2 className="text-xl ml-4 mt-2 text-gray-400 cursor-pointer">
            Ariful Isalm
          </h2>
          <div className="flex">
            <img
              className="w-4 h-4 mt-4 ml-2 cursor-pointer"
              src={bellWhite}
              alt="bell"
            />
            <p
              onClick={handlerFollow}
              className="mt-3 text-blue-600 ml-1 cursor-pointer"
            >
              follow
            </p>
          </div>
        </div>
        <h2 className="text-md ml-4 text-gray-500">3 follower</h2>
      </div>
    </div>
  );
};

export default SingleFriend;
