import { Link } from 'react-router-dom';

function MenuItem({ label, pathHighlight, to }) {
  const pathName = window.location.pathname.split("/")[1];

  return (
    <Link to={to}>
      <div>
        <p
          className={`${
            pathName === pathHighlight && "text-secondary font-bold"
          } cursor-pointer`}
        >
          {label}
        </p>
        {pathName === pathHighlight && (
          <div className="mt-0.5 border-t-4 border-secondary w-6 mx-auto"></div>
        )}
      </div>
    </Link>
  );
}

export default MenuItem