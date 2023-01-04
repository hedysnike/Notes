import React from "react";
import * as Popover from '@radix-ui/react-popover';
import { Icon } from "@iconify/react";


export default function Label() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
      <Icon icon="material-symbols:bookmark-outline" color="white" width="22" height="20" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div> <div>
            
            
            
            
            
            </div>babeeeeeee
          </div>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// className={`${hovered ? "" : "hidden"} bottom-2 left-3`}

