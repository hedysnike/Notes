import { useState, useEffect } from "react";
import "./index.css";
import Modal from "./components/Modal";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Icon } from "@iconify/react";
import { Notifications } from "./components/Notifications";
import { Pinnotifications } from "./components/Notifications";
import LabelsModal from "./components/LabelsModal";

export default function App() {
  const [currentItemValue, setCurrentItemValue] = useState("");
  const [items, setItems] = useState([]);
  const [currentItemTitle, setCurrentItemTitle] = useState("");
  const [makeVisible, setMakeVisible] = useState(false);
  const [pinned, setPinned] = useState([]);
  const [notfOpen, setNotfOpen] = useState(false);
  const [notfpin, setNotfpin] = useState(false);
  const [labelPopup, setLabelPopup] = useState(false);
  const [label, setLabel] = useState([]);
  const [currentLabelValue, setCurrentLabelValue] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("Items"));
    if (storedNotes) {
      setItems(storedNotes);
    }
  }, []);

  useEffect(() => {
    const storedPinns = JSON.parse(localStorage.getItem("pinned"));
    if (storedPinns) {
      setPinned(storedPinns);
    }
  }, []);

  useEffect(() => {
    if (!items.length) {
      return;
    }

    localStorage.setItem("Items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!pinned.length) {
      return;
    }

    localStorage.setItem("pinned", JSON.stringify(pinned));
  }, [pinned]);

  function showInputField() {
    setMakeVisible(true);
  }

  function hideInputField() {
    setMakeVisible(false);
  }

  function addItem() {
    setItems([
      {
        id: Math.random().toString(36).substr(2, 9),
        title: currentItemTitle,
        description: currentItemValue,
      },
      ...items,
    ]);
    setCurrentItemValue("");
    setCurrentItemTitle("");
  }

  function addLabel() {
    setLabel([currentLabelValue, ...label]);
    setCurrentLabelValue("");
  }

  function deleteItem(id) {
    console.log(items, id);
    setItems((prev) => prev.filter((p) => p.id !== id));
    setNotfOpen(true);
    setTimeout(() => {
      setNotfOpen(false);
    }, 2500);
  }

  function togglePinned(i) {
    if (pinned.includes(i)) {
      setPinned(pinned.filter((p) => p !== i));
    } else {
      setPinned([...pinned, i]);
      setNotfpin(true);
      setTimeout(() => {
        setNotfpin(false);
      }, 2500);
    }
  }

  function updatedescription(id, description) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, description };
        }
        return item;
      })
    );
  }

  function updateTitle(id, title) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, title };
        }
        return item;
      })
    );
  }

  return (
    <div>
      <div className="bg-black min-h-screen h-auto flex w-full overflow-hidden">
        <div className="bg-[#100F0F] h-full fixed w-[5%] text-white ]">
          <Notifications notfOpen={notfOpen} />
          <Pinnotifications notfpin={notfpin} />
          <div className="relative">
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
                      onClick={(e) => {
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
                    {label.map((l) => (
                        <div className="flex items-center">
                          <Icon
                            icon="material-symbols:label"
                            color="white"
                            width="18"
                            height="18"
                            className="border border-solid border-transparent opacity-80"
                          />
                          <div className="w-[220px] p-2">{l}</div>
                          <Icon
                            icon="fa-solid:pen"
                            color="white"
                            width="17"
                            height="17"
                            className="border border-solid border-transparent opacity-80"
                          />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </LabelsModal>
            <Icon className="absolute top-64 left-6" icon="ph:notebook-light" color="white" width="25" height="25" />
            <Icon
              className="absolute top-72 left-6"
              icon="material-symbols:label-outline"
              color="white"
              width="25"
              height="25"
              onClick={() => {
                setLabelPopup(true);
              }}
              cursor="pointer"
            />
            <Icon
              className="absolute top-80 left-6"
              icon="material-symbols:archive-outline"
              color="white"
              width="25"
              height="25"
            />
          </div>
        </div>
        <div className="h-full w-[5%]"></div>
        <div className="flex-none w-[95%]">
          <div className="flex justify-center mb-10">
            <div className="flex flex-col bg-[#100F0F] mt-16 rounded-xl shadow-md shadow-[#100F0F]">
              <input
                value={currentItemTitle}
                placeholder="Title"
                style={{ display: makeVisible ? "block" : "none" }}
                className="md:w-96 w-60 text-base p-2 m-1 bg-[#100F0F] text-white placeholder-gray-300 outline-none border-none"
                onChange={(e) => setCurrentItemTitle(e.target.value)}
              />
              <TextareaAutosize
                value={currentItemValue}
                multiline
                className="sm:w-96 w-60 text-sm py-2 px-3 m-1 border-none resize-none bg-[#100F0F] placeholder-gray-300 text-white outline-none"
                placeholder="Take a note..."
                onChange={(e) => {
                  setCurrentItemValue(e.target.value);
                }}
                onClick={showInputField}
              />
            </div>
            <button
              onClick={(e) => {
                hideInputField();
                addItem(currentItemValue, currentItemTitle);
              }}
              className="text-white ml-4 mt-16"
            >
              Add
            </button>
          </div>
          <Items
            items={items}
            setItems={setItems}
            updatedescription={updatedescription}
            updateTitle={updateTitle}
            deleteItem={deleteItem}
            togglePinned={togglePinned}
            pinned={pinned}
          />
        </div>
      </div>
    </div>
  );
}

export function Item(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const [hovered, setHovered] = useState(false);

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
      <div className="p-4 pb-7 text-zinc-300 whitespace-pre-wrap text-sm mb-8" onClick={props.onClick}>
        <div className="text-base text-white mb-3">
          {props.title} <br />
        </div>
        {props.description}
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
      <Icon
        icon="material-symbols:bookmark-outline"
        color="white"
        width="22"
        height="20"
        className={`${hovered ? "" : "hidden"} absolute bottom-2 left-3`}
        cursor="pointer"
      />
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

function Items({ items, setItems, updatedescription, updateTitle, deleteItem, togglePinned, pinned }) {
  const [openModal, setOpenModal] = useState(false);
  const [activeItem, setActiveItem] = useState();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        const newArr = arrayMove(items, oldIndex, newIndex);

        return newArr;
      });
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy} className="z-20">
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div
            placeholder="Title"
            contenteditable="true"
            className="outline-none whitespace-pre-wrap mb-3"
            onInput={(e) => updateTitle(activeItem.id, e.target.innerText)}
          >
            {activeItem?.title}
          </div>
          <div
            placeholder="Notes"
            contenteditable="true"
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
        <div className="grid md:grid grid-cols-2 md:grid-cols-5 mx-20 h-auto mb-20">
          {pinned.map((b) => (
            <Item
              id={b.id}
              key={b.id}
              title={b.title}
              description={b.description}
              onClick={() => {
                setOpenModal(true);
                setActiveItem(b);
              }}
              onComplete={(e) => deleteItem(b.id)}
              onToggle={(e) => togglePinned(b)}
              pinned={b.pinned}
            />
          ))}
        </div>
        <div className="grid md:grid grid-cols-2 md:grid-cols-5 mx-20 h-auto">
          {items
            .filter((item) => !pinned.includes(item))
            .map((i) => (
              <Item
                id={i.id}
                key={i.id}
                title={i.title}
                description={i.description}
                onClick={() => {
                  console.log("clicked", i);
                  setOpenModal(true);
                  setActiveItem(i);
                }}
                onComplete={(e) => deleteItem(i.id)}
                onToggle={(e) => togglePinned(i)}
                pinned={i.pinned}
              />
            ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
