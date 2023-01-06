export function Notifications({ notfOpen }) {
  if (!open) return null;

  return (
    <div className={`z-50 p-4 bottom-5 left-6 w-72 absolute text-white bg-[#313235] ${notfOpen ? "" : "hidden"}`}>
      Note Deleted
    </div>
  );
}

export function ArchiveNotification({ notfarc }) {
  if (!open) return null;

  return (
    <div className={`z-50 p-4 bottom-5 left-6 w-72 absolute text-white bg-[#313235] ${notfarc ? "" : "hidden"}`}>
      Note Archived
    </div>
  );
}

export function Labelnotifications({ notLab }) {
  if (!open) return null;

  return (
    <div className={`z-50 p-4 bottom-5 left-6 w-72 absolute text-white bg-[#313235] ${notLab ? "" : "hidden"}`}>
      Label Deleted
    </div>
  );
}

