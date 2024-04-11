import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ChatIcon,
  InputSearchIcon,
  MemberIcon,
  PinIcon,
  PlusIcon,
  SideBarLogo,
  WorkspaceIcon,
} from "../../assets";
import InputWithIcon from "../InputWithIcon";
import SidebarSection from "../SidebarSection";
import SidebarButton from "../SidebarButton";
import {
  chatHistory,
  clearSelectedChatHistory,
} from "../../redux/slices/chatSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { chatHistory: chats, isHistoryLoaded } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    if (!isHistoryLoaded) {
      dispatch(chatHistory());
    }
  }, [dispatch, isHistoryLoaded]);

  const { pinnedChats, historyChats } = useMemo(
    () => ({
      pinnedChats: chats
        .filter((chat) => chat.is_pinned)
        .map((chat) => ({ ...chat, icon: PinIcon })),
      historyChats: chats
        .filter((chat) => !chat.is_pinned)
        .map((chat) => ({ ...chat, icon: ChatIcon })),
    }),
    [chats]
  );

  const handleNewChat = () => {
    dispatch(clearSelectedChatHistory());
  };

  return (
    <div className="sidebar ">
      <div className="sidebar-inner">
        <div className="sticky top-0  flex justify-center py-3 b w-full side-bar-logo h-[72px]">
          <SideBarLogo className="" />
        </div>
        <div className="px-4 chat-inner">
          <SidebarButton
            icon={PlusIcon}
            text={<span className="text-white ml-3">New Chat</span>}
            onClick={handleNewChat}
          />
          <hr className="my-4" />
          <InputWithIcon
            customClass="border-0"
            bgColor="bg-customGray"
            icon={InputSearchIcon}
            placeholder="Search"
            type="text"
          />
          {pinnedChats.length > 0 && (
            <SidebarSection
              title="Pinned"
              items={pinnedChats}
              isPinned={true}
            />
          )}
          {historyChats.length > 0 && (
            <SidebarSection
              title="History"
              items={historyChats}
              isPinned={false}
            />
          )}
        </div>

        <div className="mx-4 pt-4  bottom-5 bg-white">
          <SidebarButton
            className=" text-xl  px-2  mb-7 rounded inline-flex  items-center w-full  "
            icon={MemberIcon}
            text={<span className="ml-3">Invite Member</span>}
            onClick={() => console.log("New Chat")}
          />
          <SidebarButton
            className=" text-xl  px-2 mb-4 rounded inline-flex  items-center w-full  "
            icon={WorkspaceIcon}
            text={
              <>
                <div className="flex flex-col">
                  <span className="ml-3">Add Team workspace</span>
                  <label className="text-sm text-gray-500 dark:text-gray-400">
                    Collaborate on a Team plan
                  </label>
                </div>
              </>
            }
            onClick={() => console.log("Add Team Workspace")}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
