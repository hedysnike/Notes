import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useItems } from "../useItems";
import Label from "./LabelPopover";
import ColorBlock from "./Colors";

export function PinnedItem(props) {
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
      className={`${props.color} hover:brightness-125 text-white m-3 rounded-xl relative hover:shadow-lg hover:shadow-[#0f0f0f] overflow-hidden max-h-96`}
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
      <div className="p-3 pb-2 text-zinc-300 whitespace-pre-wrap text-sm">
        <div className="text-base text-white mb-2">
          {props.title} <br />
        </div>
        {props.description}
      </div>
      <div className="p-2 pl-[12px] flex gap-1 text-[#c2a2de] mb-7">
        {props?.labels?.map?.((c) => (
          <div
            key={c.id}
            className="outline-none text-[0.65rem] px-[6px] py-[2px] rounded-xl border border-solid border-[#c2a2de] w-auto"
          >
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
        className={`${hovered ? "" : "hidden"} absolute top-2 right-3 cursor-pointer`}
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
      <div className={`${hovered ? "" : "hidden"} absolute bottom-2 left-10`}>
      <ColorBlock
        onColorChange={(color) => {
          setItems((prev) => {
            const item = prev.find((z) => z.id === props.id);

            item.color = color;

            return [...prev];
          });
        }}
      />
      </div>
    </div>
  );
}
