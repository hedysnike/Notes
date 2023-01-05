import React from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Icon } from "@iconify/react";
import { useLabels } from "../useLabels";

export default function LabelPopover({ checked, onCheckedChange }) {
  const { labels } = useLabels();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Icon icon="material-symbols:bookmark-outline" color="white" width="22" height="20" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div>
            <div className="text-white p-2">Label note</div>
            <div className="pb-2">
              {labels.map((z) => (
                <Checkbox.Root
                  key={z.id}
                  id="c2"
                  className="w-full"
                  defaultChecked={checked?.includes(z.id)}
                  onCheckedChange={(c) => {
                    onCheckedChange(c, z);
                  }}
                >
                  <div className="flex items-center px-[10px] pt-[5px] pb-[3px] w-full hover:bg-gray-600 hover:bg-opacity-10">
                    <div className="CheckboxRoot">
                      <Checkbox.Indicator>
                        <Icon icon="ic:sharp-check" color="white" width="14" height="14" />
                      </Checkbox.Indicator>
                    </div>
                    <div className="text-white p-[2px] ml-[7px] text-[13px]">{z.name}</div>
                  </div>
                </Checkbox.Root>
              ))}
            </div>
          </div>

          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
