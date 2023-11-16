import { Link } from "react-router-dom";

function MobileMenu({ label, pathHighlight, to }) {
  const pathName = window.location.pathname.split("/")[1];

  return (
    <Link to={to}>
      <div
        className={`pl-6 py-4 text-lg bg-opacity-20 border-t-2 border-b-2 ${
          pathName === pathHighlight && "bg-secondary text-secondary"
        }`}
      >
        {label}
      </div>
    </Link>
  );
}

export default MobileMenu;
