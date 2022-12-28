import { useState } from "react";
import "./index.css";
import { Input } from "antd";
import Modal from "./Modal";
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

const { TextArea } = Input;



export default function App() {
  const [currentItemValue, setCurrentItemValue] = useState("");
  const [items, setItems] = useState([]);


  function addItem() {
    setItems([
      {
        id: Math.random().toString(36).substr(2, 9),
        description: currentItemValue,
      },
      ...items,
    ]);
    setCurrentItemValue("");
  }

  function updateItem(id, description) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, description };
        }
        return item;
      })
    );
  }

  return (
    <div>
      <div className="bg-black h-screen">
        <div className="flex justify-center mb-10">
          <TextArea
            value={currentItemValue}
            autoSize={{
              minRows: 2,
              maxRows: 18,
            }}          
            className="mt-16 w-96 py-2 shadow-green-900 shadow-md rounded-lg bg-white text-black"
            placeholder="Take a note..."
            onChange={(e) => {
              setCurrentItemValue(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              addItem(currentItemValue);
            }}
            className="text-white ml-4 mt-16"
          >
            Add
          </button>
        </div>
        <Items items={items} setItems={setItems} updateItem={updateItem} />
      </div>
    </div>
  );
}

export function Item(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="p-4 bg-[#100F0F] m-3 pb-7 rounded-xl text-white whitespace-pre-wrap"
      onClick={props.onClick}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.description}
    </div>
  );
}

function Items({ items, setItems, updateItem }) {
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
            className="outline-none whitespace-pre-wrap"
            onInput={(e) => updateItem(activeItem.id, e.target.innerText)}
          >
            {activeItem?.description}
          </div>
        </Modal>
        <div className="grid md:grid grid-cols-2 md:grid-cols-5">
          {items.map((i) => (
            <Item
              id={i.id}
              key={i.id}
              description={i.description}
              onClick={() => {
                console.log("clicked", i);
                setOpenModal(true);
                setActiveItem(i);
              }}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
