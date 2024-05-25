import React, { useState } from "react";

const TabComponent = ({
    activeTag
}) => {
  const [activeTabID, setActiveTabID] = useState(1);

  const onClickTab = (id, tag) => {
    setActiveTabID(id);
    activeTag(tag)
  };

  const tabName = [
    { id: 1, name: "Resources", tag: "resources" },
    { id: 2, name: "Requests", tag: "request" },
    { id: 3, name: "Users", tag: "user" },
  ];
  return (
    <>
      <div class="tabs">
        {tabName?.map((item) => (
          <button
            class={`tab ${activeTabID === item.id ? "active" : ""}`}
            onClick={() => onClickTab(item.id,item.tag)}
          >
            {item?.name || ""}
          </button>
        ))}
      </div>
    </>
  );
};

export default TabComponent;
