import { useState, useEffect } from "react";
import "../index.css";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Icon } from "@iconify/react";
import { Notifications, Labelnotifications, ArchiveNotification } from "../components/Notifications";
import LabelsModal from "../components/LabelsModal";
import { Item } from "../components/Item";
import Modal from "../components/Modal";
import { useLabels } from "../useLabels";
import { useItems } from "../useItems";
import Sidebar from "./Sidebar";
import { PinnedItem } from "../components/pinneditem";

export default function Home() {
  const { items, setItems, pinned, setPinned } = useItems();
  const [currentItemValue, setCurrentItemValue] = useState("");
  const [currentItemTitle, setCurrentItemTitle] = useState("");
  const [makeVisible, setMakeVisible] = useState(false);
  const [notfOpen, setNotfOpen] = useState(false);
  const [notfarc, setNotfarc] = useState(false);
  const [labelPopup, setLabelPopup] = useState(false);
  const [currentLabelValue, setCurrentLabelValue] = useState("");
  const [labelEdit, setLabelEdit] = useState(false);
  const [labelEdit1, setLabelEdit1] = useState(true);
  const [notLab, setNotLab] = useState(false);
  const [labeltext, setLabeltext] = useState("");
  const [archive, setArchive] = useState([]);

  const { labels, updatesetLabel } = useLabels();

  useEffect(() => {}, [labels]);

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

  function handleLabelEdit() {
    setLabelEdit((prev) => !prev);
    setLabelEdit1((prev) => !prev);
  }

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
        labels: [],
        color: "bg-[#100F0F]",
        pinned: false,
      },
      ...items,
    ]);
    setCurrentItemValue("");
    setCurrentItemTitle("");
  }

  function addLabel() {
    updatesetLabel([{ name: currentLabelValue, id: Math.random().toString(36).substr(2, 9) }, ...labels]);
    setCurrentLabelValue("");
  }

  function deleteLabel(id) {
    updatesetLabel((prev) => prev.filter((p) => p.id !== id));
    setNotLab(true);
    setTimeout(() => {
      setNotLab(false);
    }, 2500);
    handleLabelEdit();
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
    setItems((prev) => {
      return prev.map(item => {
        if (item.id === i) {
          return { ...item, pinned: !item.pinned };
        } else {
          return item;
        }
      });
    });
  }

  function toggleArchived(i) {
    setItems((prev) => {
      const item = prev.find((p) => p.id === i);
      if (item) {
        item.archived = !item.archived;
      }
      setNotfarc(true);
      setTimeout(() => {
        setNotfarc(false);
      }, 2500);

      return [...prev];
    });

    if (archive.includes(i)) {
      setArchive(archive.filter((p) => p !== i));
    } else {
      setArchive([...archive, i]);
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
    <div>
      <Notifications notfOpen={notfOpen} />
      <ArchiveNotification notfarc={notfarc} />
      <Labelnotifications notLab={notLab} />
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
      <div className="bg-black min-h-screen h-auto flex w-full overflow-hidden">
        <Sidebar setLabelPopup={setLabelPopup} />
        <div className="h-full hidden lg:block lg:w-[5%]"></div>
    
        {/* Sidebar Above Content Below */}
     
        <div className="lg:flex-none w-full lg:w-[95%]">
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
                multiline="true"
                className="sm:w-96 w-60 text-sm py-2 px-3 m-1 border-none resize-none bg-[#100F0F] placeholder-gray-300 text-white outline-none"
                placeholder="Take a note..."
                onChange={(e) => {
                  setCurrentItemValue(e.target.value);
                }}
                onClick={showInputField}
              />
            </div>
            <button
              onClick={() => {
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
            archive={archive}
            toggleArchived={toggleArchived}
          />
        </div>
      </div>
    </div>
  );
}

function Items({ items, setItems, updatedescription, updateTitle, deleteItem, togglePinned, pinned, toggleArchived }) {
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
        </Modal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 mx-10 h-auto mb-16">
  {items
    .filter((item) => item.pinned)
    .map((b) => (
      <PinnedItem
        {...b}
        key={b.id}
        onComplete={() => deleteItem(b.id)}
        onToggle={() => togglePinned(b.id)}
        pinned={b.pinned} 
      />
    ))}
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 mx-10 h-auto mb-16">
  {items
  .filter((item) => {
    if (item.archived) {
      return false;
    } else if (item.pinned) {
      return false;
    }
    return true;
  })
    .map((i) => (
      <Item
        {...i}
        key={i.id}
        onClick={() => {
          console.log("clicked", i);
          setOpenModal(true);
          setActiveItem(i);
        }}
        onComplete={() => deleteItem(i.id)}
        onToggle={() => togglePinned(i.id)}
        onArchive={() => toggleArchived(i.id)}
      />
    ))}
</div>
      </SortableContext>
    </DndContext>
  );
}
