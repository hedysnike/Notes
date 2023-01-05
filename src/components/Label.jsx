  import React from "react";
  import * as Popover from "@radix-ui/react-popover";
  import { Icon } from "@iconify/react";
  import * as Checkbox from "@radix-ui/react-checkbox";
  import { useItems } from "../useItems";

  export default function Label() {
    const { labels, updatesetLabel } = useItems();

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
                  {labels?.map((z) => (
                  <Checkbox.Root id="c2" className="w-full" key={z.id}>
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








// const [currentlyEditingId, setCurrentlyEditingId] = useState(null);

// {currentlyEditingId !== l.id ? (
//   <Icon
//     icon="fa-solid:pen"
//     color="white"
//     width="17"
//     height="17"
//     className="border border-solid border-transparent opacity-80"
//     style={{ display: labelEdit1 ? "block" : "none" }}
//     onClick={(e) => {
//       handleLabelEdit(l.id);
//       setCurrentlyEditingId(l.id);
//     }}
//   />
// ) : (
//   <>
//     <div
//       className="w-[220px] p-2 outline-none"
//       suppressContentEditableWarning={true}
//       contentEditable
//       value={labeltext}
//       onInput={(e) => setLabeltext(e.target.innerText)}
//       style={{ display: labelEdit ? "block" : "none" }}
//     >
//       {l.name}
//     </div>

//     <Icon
//       icon="ic:sharp-check"
//       color="white"
//       width="20"
//       height="20"
//       className="border border-solid border-transparent opacity-80"
//       style={{ display: labelEdit ? "block" : "none" }}
//       onClick={(e) => {
//         handleLabelEdit(l.id);
//         UpdateLabel(l.id, labeltext);
//       }}
//     />
//   </>
// )}
// </div>
// ))}
