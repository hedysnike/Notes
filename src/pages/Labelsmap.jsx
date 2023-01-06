import Sidebar from "./Sidebar";
import { useLabels } from "../useLabels";
import { useItems } from "../useItems";
import { useState } from "react";
import Modal from "../components/Modal";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";

export default function Labelsmap({ props }) {
  const [openModal, setOpenModal] = useState(false);
  const [activeItem, setActiveItem] = useState();
  const { labels } = useLabels();
  const { items } = useItems();
  const { id } = useParams();


  return (
    <div className="bg-black min-h-screen h-auto flex w-full overflow-hidden">
      <div className="h-full w-[5%]"></div>
      <Sidebar setLabelPopup={props.setLabelPopup} />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
              placeholder="Title"
              contentEditable="true"
              className="outline-none whitespace-pre-wrap mb-3"
              onInput={(e) => props.updateTitle(activeItem.id, e.target.innerText)}
            >
              {activeItem?.title}
            </div>
            <div
              placeholder="Notes"
              contentEditable="true"
              className="outline-none whitespace-pre-wrap mb-6"
              onInput={(e) => props.updatedescription(activeItem.id, e.target.innerText)}
            >
              {activeItem?.description}
            </div>
            <div>
              <Icon
                icon="mdi:trash-can-outline"
                color="white"
                width="24"
                height="20"
                className="absolute bottom-2 right-3"
                cursor="pointer"
              />
              <Icon
                icon="material-symbols:bookmark-outline"
                color="white"
                width="24"
                height="20"
                className="absolute bottom-2 left-3"
                cursor="pointer"
              />
              <Icon
                icon="mdi:paint-outline"
                color="white"
                width="24"
                height="20"
                className="absolute bottom-2 left-10"
                cursor="pointer"
              />
              <Icon
                icon="material-symbols:image"
                color="white"
                width="24"
                height="20"
                className="absolute bottom-2 left-[68px]"
                cursor="pointer"
              />
              <Icon
                icon="mdi:format-list-checkbox"
                color="white"
                width="24"
                height="20"
                className="absolute bottom-2 left-[96px]"
                cursor="pointer"
              />
              <Icon
                icon="material-symbols:label-outline-sharp"
                color="white"
                width="24"
                height="20"
                className="absolute bottom-2 left-[152px]"
                cursor="pointer"
              />
              <Icon
                icon="material-symbols:archive-outline"
                color="white"
                width="24"
                height="20"
                className="absolute bottom-2 left-[124px]"
                cursor="pointer"
              />
            </div>
      </Modal>
      <div className="w-[95%]">
        {props.name}

      </div>
    </div>  );
}