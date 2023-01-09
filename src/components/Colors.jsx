import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Icon } from "@iconify/react";

const colors = [
  "bg-[#5C2B29]",
  "bg-[#614A19]",
  "bg-[#635D19]",
  "bg-[#345920]",
  "bg-[#16504B]",
  "bg-[#2D555E]",
  "bg-[#1E3A5F]",
  "bg-[#42275E]",
  "bg-[#5B2245]",
  "bg-[#442F19]",
  "bg-[#3C3F43]",
];

const color2 = "bg-[#100F0F]";

function ColorBall({ color, onClick }) {
  return <div onClick={onClick} className={`h-1 rounded-full w-1 ${color} p-[13px] cursor-pointer	`}></div>;
}

function ColorBlock({ onColorChange }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Icon icon="mdi:paint-outline" color="white" width="22" height="20" cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverColors" sideOffset={5}>
          <div>
            <div className="text-white p-2">Colors</div>
            <div className="p-1 flex mx-3 pb-3 gap-1 outline-none">
              <div
                onClick={() => onColorChange(color2)}
                className="p-1 border border-solid border-[#ffffff] rounded-full"
              >
                <Icon icon="mdi:image-off" color="white" width="white" height="17" cursor="pointer" />
              </div>
              {colors.map((color) => (
                <ColorBall onClick={() => onColorChange(color)} color={color} />
              ))}
            </div>
          </div>

          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ColorBlock;
