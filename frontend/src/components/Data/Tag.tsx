import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { Item } from "./Item";

interface TagProps {
  id: number;
  name: string;
}

const Tag: React.FC<TagProps> = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Item.TAG,
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const tagRef = useRef<HTMLDivElement | null>(null);

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
