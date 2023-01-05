
export default function Archive() {

  
  
    return (
    <div className="bg-black h-screen w-full flex text-white">
      <div>
        <div>rame</div>
      </div>
    </div>
  );
}






// {archive.map((a) => (
//     <Item
//       id={a.id}
//       key={a.id}
//       title={a.title}
//       description={a.description}
//       onClick={() => {
//         setOpenModal(true);
//         setActiveItem(b);
//       }}
//       onComplete={(e) => deleteItem(a.id)}
//       onToggle={(e) => togglePinned(a)}
//       pinned={a.pinned}
//       archive={a.archive}
//       onArchive={(e) => toggleArchived(a)}
//     />
//   ))}




{/* <div className="grid md:grid grid-cols-2 md:grid-cols-5 mx-20 h-auto mb-20">
{archive.map((a) => (
  <Item
    {...a}
    key={a.id}
    onClick={() => {
      setOpenModal(true);
      setActiveItem(a.id);
    }}
    onComplete={() => deleteItem(a.id)}
    onToggle={() => togglePinned(a)}
    onArchive={() => toggleArchived(a)}
  />
))}
</div> */}
