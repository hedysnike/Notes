import { useSortable } from "@dnd-kit/sortable";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Label from "./Label";

export function Item(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ props: props.id });
  const [hovered, setHovered] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: hovered ? 10 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-[#100F0F] hover:bg-[#1b1919] text-white m-3 rounded-xl relative hover:shadow-md hover:shadow-[#1b1919] overflow-hidden max-h-96"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setHovered(false);
        }, 150)
      }
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="p-4 pb-7 text-zinc-300 whitespace-pre-wrap text-sm mb-8" onClick={props.onClick}>
        <div className="text-base text-white mb-3">
          {props.title} <br />
        </div>
        {props.description}
      </div>
      <Icon
        onClick={props.onToggle}
        icon="ic:outline-push-pin"
        color="white"
        width="22"
        height="20"
        className={`${hovered ? "" : "hidden"} absolute top-2 right-3`}
        cursor="pointer"
      />
      <Icon
        onClick={props.onComplete}
        icon="mdi:trash-can-outline"
        color="white"
        width="22"
        height="20"
        className={`${hovered ? "" : "hidden"} absolute bottom-2 right-3`}
        cursor="pointer"
      />
      <div className={`${hovered ? "" : "hidden"} absolute bottom-2 left-3`}>
        <Label cursor="pointer" />
      </div>
      <Icon
        icon="mdi:paint-outline"
        color="white"
        width="22"
        height="20"
        className={`${hovered ? "" : "hidden"} absolute bottom-2 left-10`}
        cursor="pointer"
      />
      <Icon
        icon="material-symbols:image"
        color="white"
        width="22"
        height="20"
        className={`${hovered ? "" : "hidden"} absolute bottom-2 left-[68px]`}
        cursor="pointer"
      />
      <Icon
        icon="mdi:format-list-checkbox"
        color="white"
        width="22"
        height="20"
        className={`${hovered ? "" : "hidden"} absolute bottom-2 left-[96px]`}
        cursor="pointer"
      />
      <Icon
        onClick={props.onArchive}
        icon="material-symbols:archive-outline"
        color="white"
        width="22"
        height="20"
        className={`${hovered ? "" : "hidden"} absolute bottom-2 left-[124px]`}
        cursor="pointer"
      />
    </div>
  );
}
