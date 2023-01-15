import { Icon } from "@iconify/react";
import { useState } from "react";
import { useItems } from "../useItems";
import Label from "./LabelPopover";
import ColorBlock from "./Colors";

export function ArchiveItem(props) {
  const [hovered, setHovered] = useState(false);
  const { setItems } = useItems();

  return (
    <div
      className="bg-[#100F0F] hover:bg-[#1b1919] text-white m-3 rounded-xl relative hover:shadow-md hover:shadow-[#1b1919] overflow-hidden max-h-96"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setHovered(false);
        }, 150)
      }
    >
      <div className="p-3 pb-2 text-zinc-300 whitespace-pre-wrap text-sm" onClick={props.onClick}>
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
        onClick={props.onComplete}
        icon="mdi:trash-can-outline"
        color="white"
        width="22"
        height="20"
        className={`${hovered ? "" : "hidden"} absolute bottom-2 right-3 cursor-pointer`}
      />
      <div className="absolute bottom-2 left-3 cursor-pointer">
        <Label
          checked={props?.labels?.map?.((l) => l.id)}
          onCheckedChange={(c, l) => {
            setItems((prev) => {
              const ArchiveItem = prev.find((z) => z.id === props.id);
              if (c) {
                ArchiveItem.labels.push(l);
              } else {
                ArchiveItem.labels = ArchiveItem.labels.filter((z) => z !== l);
              }
              return [...prev];
            });
          }}
        />
      </div>
      <div className={`${hovered ? "" : "hidden"} absolute bottom-2 left-10 cursor-pointer`}>
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
      <Icon
        onClick={props.onArchive}
        icon="ic:outline-unarchive"
        color="white"
        width="22"
        height="20"
        className={`${hovered ? "" : "hidden"} absolute bottom-2 left-[68px] cursor-pointer`}
      />
    </div>
  );
}
