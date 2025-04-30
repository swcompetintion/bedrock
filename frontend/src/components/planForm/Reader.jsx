import React from "react";
import DataForm from "./DataForm";

const Reader = ({ content = "<p>읽어올 내용이 없습니다.</p>" }) => {
  return (
    <div>
      <h2>글 내용 읽기</h2>

      <DataForm
        value={content}
        onChange={() => {}}
        readOnly={true}
        style={{ height: "500px" }}
      />
    </div>
  );
};

export default Reader;
