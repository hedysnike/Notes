import Sidebar from "./Sidebar";
import { ArchiveItem } from "../components/ArchiveItem";
import { useItems } from "../useItems";
import { useState } from "react";
import Modal from "../components/Modal";
import { Icon } from "@iconify/react";

export default function Archive({ toggleArchived, deleteItem, updatedescription, updateTitle, setLabelPopup }) {
  const [openModal, setOpenModal] = useState(false);
  const [activeItem, setActiveItem] = useState();
  const { items } = useItems();

  return (
    <div className="bg-black min-h-screen h-auto flex w-full overflow-hidden">
      <Sidebar setLabelPopup={setLabelPopup} />
      <div className="h-full w-[5%]"></div>
      <div className="flex-none w-[95%]">
        <div>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div
              placeholder="Title"
              contentEditable="true"
              className="outline-none whitespace-pre-wrap mb-3"
              onInput={(e) => updateTitle(activeItem.id, e.target.innerText)}
            >
              {activeItem?.title}
            </div>
            <div
              placeholder="Notes"
              contentEditable="true"
              className="outline-none whitespace-pre-wrap mb-6"
              onInput={(e) => updatedescription(activeItem.id, e.target.innerText)}
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
        </div>
        <div className="flex justify-center text-white mt-10 text-4xl">Archived</div>
        <div className="grid md:grid grid-cols-2 md:grid-cols-5 mx-20 h-auto mb-16 mt-24">
          {items
            .map((a) => (
              <ArchiveItem
                id={a.id}
                key={a.id}
                title={a.title}
                description={a.description}
                onClick={() => {
                  setOpenModal(true);
                  setActiveItem(a);
                }}
                onComplete={() => deleteItem(a.id)}
                archive={a.archive}
                onArchive={() => toggleArchived(a)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
