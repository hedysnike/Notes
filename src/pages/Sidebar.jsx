import { useLabels } from "../useLabels";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function Sidebar({ setLabelPopup }) {
  const { labels } = useLabels();



  return (
    <div className="bg-[#100F0F] h-full fixed w-[5%] text-white ]">
      <div className="flex flex-col items-center">
        <div className="mb-16"></div>

        <Link to={"/"}>
        <Icon className="my-3" icon="ph:notebook-light" color="white" width="25" height="25" />
        </Link>
        {labels?.map((l) => (
          <div key={l.id}>
            <Link to={`/labels/${l.id}`}>
            <Icon
              className="my-3 "
              icon="material-symbols:label-outline"
              color="white"
              width="25"
              height="25"
              cursor="pointer"
            />
            </Link>
            </div>
        ))}
        <Icon
          className="my-3"
          icon="mdi:pencil-outline"
          color="white"
          width="25"
          height="25"
          onClick={() => {
            setLabelPopup(true);
          }}
          cursor="pointer"
        />
        <Link to="./archive">
          <Icon className="my-3" icon="material-symbols:archive-outline" color="white" width="25" height="25" />
        </Link>
      </div>
    </div>
  );
}
