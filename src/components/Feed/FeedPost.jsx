/* eslint-disable react/prop-types */
import TimeIcon from "../../assets/icons/time.svg";
import bellWhite from "../../assets/icons/bellWhite.svg";
import redBell from "../../assets/icons/redbell.svg";
import bellBlue from "../../assets/icons/bellBlue.svg";
import Share from "../../assets/icons/share.svg";
import FeedComments from "./FeedComments";
import CommentBox from "./CommentBox";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShareButton from "../Modals/ShareUrl";
import { timeDifference } from "../utils/timeDirrerence";
import Like from "./Like";
import { usePostNotificationMutation } from "../../Redux/Features/Notification/notificationAPI";
import EditPost from "./EditPost";
import { useUserFollowerMutation } from "../../Redux/Features/Post/postAPI";
import Shadaw from "../Loader/Shadaw";
import { useState } from "react";

const FeedPost = ({ post }) => {
  const { poster, description, createdAt, comments, likes, _id } = post || {};
  const {
    firstName,
    lastName,
    profile,
    _id: userId,
    followers,
  } = post?.creatorId || {};

  const [share, setShare] = useState(false);
  const [url, setUrl] = useState("");

  const { user } = useSelector((state) => state.loginUser);

  const loginUserId = user._id;
  const [userFollower, { isLoading }] = useUserFollowerMutation();
  const [postNotification] = usePostNotificationMutation();

  const handlerSharre = (id) => {
    setShare(true);
    let baseUrl = window.location.origin + `/post/${id}`;
    setUrl(baseUrl);
  };

  const isExistsUserFollower = followers.some(
    (follower) => follower.followerUserId === loginUserId
  );
  const followerStatusCheck = followers.some(
    (follower) =>
      follower.followerUserId === loginUserId &&
      follower.followStatus === "success"
  );
  const handlerFollower = async (userId) => {
    try {
      await userFollower({
        data: { userId, follwerId: user._id, postId: _id },
      });
      if (!isExistsUserFollower) {
        await postNotification({
          data: { postCreatorId: userId, postId: _id, action: "Follow" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="card mt-6 lg:mt-8">
      {/* <!-- post header --> */}
      <header className="flex items-center justify-between gap-4">
        {/* <!-- author info --> */}
        <div className="flex items-center gap-3">
          <Link to={`/profile/${userId}?name=${firstName}${lastName}`}>
            <img
              className="max-w-10 border border-blue-500 w-44 h-44 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={profile}
              alt="avatar"
            />
          </Link>
          <div className="flex">
            <div>
              <Link to={`/profile/${userId}?name=${firstName}${lastName}`}>
                <h6 className="text-lg lg:text-xl">
                  {firstName} {lastName}{" "}
                </h6>
              </Link>

              <div className="flex items-center gap-0.5 -ml-1">
                <img src={TimeIcon} alt="time" />
                <span className="text-sm text-gray-400 lg:text-base">
                  {timeDifference(createdAt)}
                </span>
              </div>
            </div>
            {isLoading && <Shadaw />}
            {user._id !== userId && (
              <div className="ml-1.5 mt-[5px]">
                <button
                  disabled={isLoading}
                  className="flex cursor-pointer"
                  onClick={() => handlerFollower(userId)}
                >
                  <img
                    width={15}
                    src={
                      isExistsUserFollower
                        ? followerStatusCheck
                          ? bellBlue
                          : redBell
                        : bellWhite
                    }
                    alt="bell"
                    className="mt-0.5"
                  />
                  <span className="text-sm ml-1">
                    {isExistsUserFollower ? (
                      followerStatusCheck ? (
                        <p className="text-blue-400">following</p>
                      ) : (
                        <p className="text-red-400 -mt-0.5">pending</p>
                      )
                    ) : (
                      "follow"
                    )}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
        {/* <!-- author info ends --> */}
        {/* Modal post Edit  */}

        {/* <!-- action dot --> */}
        {/* edit post  start */}
        {userId === user._id && <EditPost userId={userId} post={post} />}

        {/* edit post  end */}

        {/* <!-- action dot ends --> */}
      </header>
      {/* <!-- post header ends --> */}

      {/* <!-- post body --> */}
      <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
        {/* <!-- If Post has Image, Render this block --> */}
        <div className="flex items-center justify-center overflow-hidden ">
          <img
            draggable={false}
            className="max-w-full w-[560px] h-80  shadow-2xl lg:h-[470px] object-fill rounded-sm mb-2"
            src={poster}
            alt="poster"
          />
        </div>
        <p className="indent-5 text-justify ">{description}</p>
      </div>
      {/* <!-- post body ends --> */}

      {/* <!-- post actions --> */}
      <div className="flex items-center justify-between py-4 lg:px-10 ">
        {/* <!-- Like Button --> */}
        <Like Likes={likes} id={_id} userId={userId} loginUserId={user?._id} />

        {/* <!-- Comment Button --> */}
        <CommentBox id={_id} comments={comments} />
        {/* <!-- Share Button --> */}

        {/* <!-- Like Button --> */}
        <button
          onClick={() => handlerSharre(_id)}
          className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
        >
          <img src={Share} alt="Share" />
          <span>Share</span>
        </button>

        {/* Chad Cn Dialog Start */}

        {share && <ShareButton url={url} setShare={setShare} />}

        {/* Chad Cn Dialog  End */}
      </div>
      {/* <!-- post actions  --> */}

      <FeedComments
        post={post}
        id={_id}
        comments={comments}
        postCreatorId={userId}
      />
    </article>
  );
};

export default FeedPost;
