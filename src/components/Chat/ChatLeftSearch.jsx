import { useEffect, useState } from "react";
import Plus from "../../assets/icons/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  chatActionLeft,
  userSearchText,
} from "../../Redux/Features/Chat/ChatLeft/ChatLeftSlice";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";
const ChatLeftSearch = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState("all");
  const [searchText, setSearchText] = useState("");
  const debounceSearch = useDebounce(searchText);
  const { chatActionValue } = useSelector((state) => state.chatLeft);
  useEffect(() => {
    dispatch(chatActionLeft(action));
  }, [action, dispatch]);

  useEffect(() => {
    dispatch(userSearchText(debounceSearch));
  }, [debounceSearch, dispatch]);
  return (
    <div className="shadow-xl">
      <div className="pt-2 flex basis-full sm:basis-2/6  p-3 justify-between">
        <div className="flex flex-grow items-center bg-gray-700 px-3 py-1.5 rounded-full shadow-lg ">
          <input
            type="text"
            placeholder="Type a FirstName..."
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 sticky top-4 bg-transparent border-none text-gray-300 text-base placeholder-gray-500 outline-none px-2"
          />
        </div>
        <div className="ml-2 flex-shrink-0">
          <Link to={"/add-friend"}>
            <img className="w-6 cursor-pointer mt-2 " src={Plus} alt="plus" />
          </Link>
        </div>
      </div>

      <div className="uppercase pt-2 flex basis-full text-sm sm:basis-2/6  p-3 justify-between">
        <h2
          className={`font-bold px-2 cursor-pointer ${
            chatActionValue === "all" && "text-blue-400"
          }`}
          onClick={() => setAction("all")}
        >
          All
        </h2>

        <h2
          className={`font-bold px-2 cursor-pointer ${
            chatActionValue === "active" && "text-blue-400"
          }`}
          onClick={() => setAction("active")}
        >
          Active Now
        </h2>
        <h2
          className={`font-bold px-2 cursor-pointer ${
            chatActionValue === "favourite" && "text-blue-400"
          }`}
          onClick={() => setAction("favourite")}
        >
          Favourite
        </h2>
      </div>
    </div>
  );
};

export default ChatLeftSearch;
