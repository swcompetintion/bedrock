import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { Item } from "./Item";

interface TagProps {
  id: number;
  name: string;
}

const Tag: React.FC<TagProps> = ({ id, name }) => { // 외부에서 받을 props의 타입은 <TagProps>
  const [{ isDragging }, drag] = useDrag(() => ({ // 이 컴포넌트가 드래그 가능한 대상이 되도록 설정
    type: Item.TAG, // 타입이 태그면 드래그 가능
    item: { id, name },
    collect: (monitor) => ({  //  매 랜더링마다 드래그 상태를 읽어서 값을 반환함
      isDragging: monitor.isDragging(),
    }),
  }));

  const tagRef = useRef<HTMLDivElement | null>(null); // 리랜더링돼도 해당 참조가 div를 가리킴 초깃값은 null

  drag(tagRef);

  const style: React.CSSProperties = {
    padding: "8px",
    margin: "4px",
    border: "1px solid gray",
    backgroundColor: "#a8dadc",
    cursor: "move",
    opacity: isDragging ? 0.5 : 1,
    display: "inline-block",
    borderRadius: "4px",
  };

  return (
    <div ref={tagRef} style={style}> 
      {name}
    </div>
  );
};

export default Tag;
