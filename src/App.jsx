import { useState } from "react";
import "./index.css";
import Modal from "./components/Modal";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BookmarkIcon from "@heroicons/react/24/solid/BookOpenIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function App() {
  const [currentItemValue, setCurrentItemValue] = useState("");
  const [items, setItems] = useState([]);
  const [labelValue, setLabelValue] = useState([]);
  const [labelz, setLabelz] = useState([]);
  const [currentItemTitle, setCurrentItemTitle] = useState("");
  const [makeVisible, setMakeVisible] = useState(false);

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

  function deleteItem(id) {
    console.log(items, id);
    setItems((prev) => prev.filter((p) => p.id !== id));
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

  function addlabelz() {
    setLabelz([{ ...labelz, labelValue }]);
    setLabelValue("");
  }

  return (
    <div>
      <div className="bg-black min-h-screen h-auto ">
        <div className="flex justify-center mb-10">
          <div className="flex flex-col bg-[#100F0F] mt-16 rounded-xl shadow-md shadow-[#100F0F]">
            <input
              value={currentItemTitle}
              placeholder="Title"
              style={{ display: makeVisible ? "block" : "none" }}
              className="md:w-96 w-60 text-sm p-2 m-1 bg-[#100F0F] text-white placeholder-gray-300 outline-none border-none"
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
        />
      </div>
    </div>
  );
}

export function Item(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const [hovered, setHovered] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-[#100F0F] hover:bg-[#1b1919] text-white m-3 rounded-xl relative hover:shadow-md hover:shadow-[#1b1919] overflow-hidden max-h-96"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setHovered(false);
        }, 250)
      }
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        className="p-4 pb-7 text-zinc-300 whitespace-pre-wrap text-sm mb-4"
        onClick={props.onClick}
      >
        <div className="text-base text-white mb-3">
          {props.title} <br />
        </div>
        {props.description}
      </div>
      <BookmarkIcon
        width={20}
        className={`${hovered ? "" : "hidden"} absolute bottom-2 left-3`}
        cursor="pointer"
      />
      <TrashIcon
        width={20}
        onClick={props.onComplete}
        className={`${hovered ? "" : "hidden"} absolute bottom-2 right-3`}
        cursor="pointer"
      />
    </div>
  );
}

function Items({
  items,
  setItems,
  updatedescription,
  updateTitle,
  deleteItem,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [activeItem, setActiveItem] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div
            spellcheck="true"
            contenteditable="true"
            className="outline-none whitespace-pre-wrap mb-3"
            onInput={(e) => updateTitle(activeItem.id, e.target.innerText)}
          >
            {activeItem?.title}
          </div>
          <div
            spellcheck="true"
            contenteditable="true"
            className="outline-none whitespace-pre-wrap"
            onInput={(e) =>
              updatedescription(activeItem.id, e.target.innerText)
            }
          >
            {activeItem?.description}
          </div>
        </Modal>
        <div className="grid md:grid grid-cols-2 md:grid-cols-5 mx-20 h-auto">
          {items.map((i) => (
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
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
