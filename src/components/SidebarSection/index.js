import React from "react";

import SidebarAccordion from "../SidebarAccordion";
import ChatHistory from "../ChatHistory";

const SidebarSection = ({ title, items, isPinned }) => (
  <div className="mt-4">
    <SidebarAccordion
      title={title}
      answer={items.map((chat) => (
        <ChatHistory key={chat.id} {...chat} isPinned={isPinned} />
      ))}
    />
  </div>
);

export default React.memo(SidebarSection);
