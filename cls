[1mdiff --git a/src/components/Chat/ChatLeftHead.jsx b/src/components/Chat/ChatLeftHead.jsx[m
[1mindex a100f49..59e642f 100644[m
[1m--- a/src/components/Chat/ChatLeftHead.jsx[m
[1m+++ b/src/components/Chat/ChatLeftHead.jsx[m
[36m@@ -13,9 +13,7 @@[m [mimport { useEffect, useState } from "react";[m
 import Shadaw from "../Loader/Shadaw";[m
 import NoFollowers from "./NoFollowers";[m
 import NoActiveUser from "./NoActiveUser";[m
[31m-[m
[31m-import { useGetFavouritesQuery } from "../../Redux/Features/Favourite/favouriteApi";[m
[31m-[m
[32m+[m[32mimport { useGetFavouritesQuery } from "../../Redux/Features/Favourite/favouriteApi.js";[m
 import NoFavourite from "./NoFavourite";[m
 import NotificationToolTip from "../Notifications/NotificationToolTip.jsx";[m
 [m
[36m@@ -23,7 +21,6 @@[m [mconst ChatLeftHead = () => {[m
   const { chatActionValue, searchText } = useSelector([m
     (state) => state.chatLeft[m
   );[m
[31m-  const { data: favouriteUser } = useGetFavouritesQuery();[m
   const { loginUserBySocket } = useSelector((state) => state.socketLoginUser);[m
   const { user } = useSelector((state) => state.loginUser);[m
   const { notification } = useSelector((state) => state.getNotification);[m
[36m@@ -36,7 +33,7 @@[m [mconst ChatLeftHead = () => {[m
     isSuccess,[m
     isLoading,[m
   } = useGetAllFollowerChatListQuery(id);[m
[31m-[m
[32m+[m[32m  const { data: favouriteUser } = useGetFavouritesQuery();[m
   const [chatUpdateUserList, setChatUpdateUserList] = useState([]);[m
   const [activeUser, setActiveUser] = useState(false);[m
   useEffect(() => {[m
[36m@@ -79,8 +76,8 @@[m [mconst ChatLeftHead = () => {[m
         }[m
       });[m
     }[m
[32m+[m[32m    // console.log(loginUserBySocket, activeUser);[m
   }, [loginUserBySocket, chatUpdateUserList, id, chatActionValue, activeUser]);[m
[31m-[m
   const handlerNotification = () => {[m
     Cookies.set("Notification", notification?.length, { expires: 365 });[m
   };[m
