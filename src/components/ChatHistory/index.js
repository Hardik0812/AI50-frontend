import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

import { formatDate } from "../../helpers/dateHelper";
import { setSelectedChatHistory } from "../../redux/slices/chatSlice";

import {
  ArchiveIcon,
  DeleteIcon,
  KababIcon,
  LogoutIcon,
  PenIcon,
} from "../../assets";
import { useDispatch, useSelector } from "react-redux";

const ChatHistory = ({
  icon: Icon,
  title,
  updated_at,
  is_pinned,
  isPinned = false,
  id,
}) => {
  const dispatch = useDispatch();

  const { selectedChatHistory } = useSelector((state) => state.chat);

  // const [showKababMenu, setShowKababMenu] = useState(false);
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement);

  const handleChatHistoryClick = () => {
    dispatch(
      setSelectedChatHistory({
        id,
        icon: Icon,
        title,
        updated_at,
        is_pinned,
      })
    );
  };
  return (
    <div className="relative" onClick={handleChatHistoryClick}>
      <div
        className={`my-4 flex text-left items-center gap-2 bg-customGray border border-[#E0E0E0] p-2 rounded-lg ${
          id === selectedChatHistory?.id
            ? "kababIconVisible"
            : "kababIconVisibleForNotSelected"
        } `}
      >
        <Icon className="start-icon" />
        <div className="font-medium">
          <p className="m-0 overflow-hidden overflow-ellipsis whitespace-nowrap text-[22px] max-w-[232px]">
            {title}
          </p>
          <label className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(updated_at)}
          </label>
        </div>
        <div className="absolute right-2 chat-icons bg-inherit flex">
          <Popover>
            <Popover.Button ref={setReferenceElement}>
              {" "}
              <KababIcon className="cursor-pointer" />
            </Popover.Button>

            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className={`bg-white poper-custom-kabab`}
            >
              <button className="group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-customGreen hover:text-white">
                Hide from Sidebar
              </button>
            </Popover.Panel>
          </Popover>
          {!isPinned && (
            <Popover>
              <Popover.Button ref={setReferenceElement}>
                {" "}
                <ArchiveIcon className="cursor-pointer ms-1" />
              </Popover.Button>

              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className={`bg-white poper-custom`}
              >
                <button className="group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-customGreen hover:text-white">
                  <LogoutIcon className="mr-2 h-5 w-5 !rotate-90" />
                  Share
                </button>

                <button className="group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-customGreen hover:text-white">
                  <PenIcon className="mr-2 h-5 w-5" />
                  Rename
                </button>
                <button
                  className={` group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-customGreen hover:text-white`}
                >
                  <DeleteIcon className="mr-2 h-5 w-5" />
                  Delete Chat
                </button>
              </Popover.Panel>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
