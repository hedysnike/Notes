import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useItems } from "../useItems";
import Label from "./Label";


export function Item(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const [hovered, setHovered] = useState(false);
  const { setItems } = useItems();

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
      <div className="p-3 pb-2 text-zinc-300 whitespace-pre-wrap text-sm" onClick={props.onClick}>
        <div className="text-base text-white mb-2">
          {props.title} <br />
        </div>
        {props.description}
      </div>
      <div className="p-2 flex gap-1 text-[#c2a2de] mb-7"> 
        {props?.labels?.map?.((c) => (
          <div key={c.id} className="outline-none text-xs p-[5px] py-[3px] border border-solid border-[#c2a2de] w-auto">
            {c.name}
         </div>
        ))}
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
      <div className="absolute bottom-2 left-3">
        <Label
          checked={props?.labels?.map?.((l) => l.id)}
          onCheckedChange={(c, l) => {
            setItems((prev) => {
              const item = prev.find((z) => z.id === props.id);
              if (c) {
                item.labels.push(l);
              } else {
                item.labels = item.labels.filter((z) => z !== l);
              }
              return [...prev];
            });
          }}
        />
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
