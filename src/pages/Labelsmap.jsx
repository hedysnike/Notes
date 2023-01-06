import Sidebar from "./Sidebar";
import { useLabels } from "../useLabels";
import { useItems } from "../useItems";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import LabelsModal from "../components/LabelsModal";
import { Item } from "../components/Item";

export default function Labelsmap() {
  const [labelEdit, setLabelEdit] = useState(false);
  const [labelEdit1, setLabelEdit1] = useState(true);
  const [labeltext, setLabeltext] = useState("");
  const [labelPopup, setLabelPopup] = useState(false);
  const [currentLabelValue, setCurrentLabelValue] = useState("");

  const { labels, updatesetLabel } = useLabels();
  const { items, setItems } = useItems();

  const { id } = useParams();

  const filteredLabel = labels.filter(label => label.id === id)[0];


  const filteredItems = items.filter(item =>
    item.labels.some(label => label.id === id)
  );
  

  function addLabel() {
    updatesetLabel([{ name: currentLabelValue, id: Math.random().toString(36).substr(2, 9) }, ...labels]);
    setCurrentLabelValue("");
  }

  function deleteLabel(id) {
    updatesetLabel((prev) => prev.filter((p) => p.id !== id));
    handleLabelEdit();
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function handleLabelEdit() {
    setLabelEdit((prev) => !prev);
    setLabelEdit1((prev) => !prev);
  }

  function UpdateLabel(id, name) {
    updatesetLabel(
      labels?.map((labels) => {
        if (labels.id === id) {
          return { ...labels, name };
        }
        return labels;
      })
    );
    setLabeltext("");
  }


  return (
    <div className="bg-black min-h-screen h-auto flex w-full overflow-hidden">
      <LabelsModal openPopup={labelPopup} closePopup={() => setLabelPopup(false)}>
        <div className="p-4">
          <div>
            <div className="mb-2 font-medium">
              <h1>Edit Labels</h1>
            </div>
            <div className="flex items-center">
              <Icon
                icon="ic:sharp-plus"
                color="white"
                width="18"
                height="18"
                className="border border-solid border-transparent opacity-80"
              />
              <input
                value={currentLabelValue}
                placeholder="Create a new Label"
                onChange={(e) => setCurrentLabelValue(e.target.value)}
                className="bg-[#313235] outline-none w-[220px] p-2"
              />
              <Icon
                onClick={() => {
                  addLabel(currentLabelValue);
                }}
                icon="ic:sharp-check"
                color="white"
                width="20"
                height="20"
                className="opacity-80"
                cursor="pointer"
              />
            </div>
            <div className="flex flex-col">
              {labels?.map((l) => (
                <div className="flex items-center" key={l.id}>
                  <Icon
                    icon="material-symbols:label"
                    color="white"
                    width="18"
                    height="18"
                    className="border border-solid border-transparent opacity-80"
                    style={{ display: labelEdit1 ? "block" : "none" }}
                  />
                  <Icon
                    icon="mdi:trash-can-outline"
                    color="white"
                    width="18"
                    height="18"
                    className="border border-solid border-transparent opacity-80"
                    style={{ display: labelEdit ? "block" : "none" }}
                    onClick={() => deleteLabel(l.id)}
                    cursor="pointer"
                  />
                  <div className="w-[220px] p-2" style={{ display: labelEdit1 ? "block" : "none" }}>
                    {l.name}
                  </div>
                  <div
                    className="w-[220px] p-2 outline-none"
                    suppressContentEditableWarning={true}
                    contentEditable
                    value={labeltext}
                    onInput={(e) => setLabeltext(e.target.innerText)}
                    style={{ display: labelEdit ? "block" : "none" }}
                  >
                    {l.name}
                  </div>
                  <Icon
                    icon="fa-solid:pen"
                    color="white"
                    width="17"
                    height="17"
                    className="border border-solid border-transparent opacity-80"
                    style={{ display: labelEdit1 ? "block" : "none" }}
                    onClick={() => {
                      handleLabelEdit(l.id);
                    }}
                  />
                  <Icon
                    icon="ic:sharp-check"
                    color="white"
                    width="20"
                    height="20"
                    className="border border-solid border-transparent opacity-80"
                    style={{ display: labelEdit ? "block" : "none" }}
                    onClick={() => {
                      handleLabelEdit(l.id);
                      UpdateLabel(l.id, labeltext);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </LabelsModal>

      <Sidebar setLabelPopup={setLabelPopup} />
      <div className="h-full w-[5%]"></div>
      <div className="flex-none w-[95%]">
        <div>
        </div>
        <div className="flex justify-center text-2xl text-white mb-10 mt-10">{filteredLabel.name}</div>
        <div className="grid md:grid grid-cols-2 md:grid-cols-5 mx-20 h-auto">
          {filteredItems.map((i) => (
            <Item {...i} key={i.id} onComplete={() => deleteItem(i.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}









{/* <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
</Modal> */}
