import { Outlet } from "react-router-dom";

const routes = [
  ["/", "Dashboard"],
  ["/match", "Match"],
  ["/ai", "AI"],
];

type MenuProps = {
  currentPath: string;
};

const DesktopMenu = ({ currentPath }: MenuProps) => (
  <ul className="menu menu-horizontal px-1">
    {routes.map(([link, text]) => {
      const isSelected = link === currentPath;
      return (
        <li>
          <a
            href={isSelected ? "#" : link}
            className={isSelected ? "font-bold" : ""}
          >
            {text}
          </a>
        </li>
      );
    })}
  </ul>
);

const MobileMenu = ({ currentPath }: MenuProps) => (
  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-primary m-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 text-black rounded-box z-1 w-52 p-2 shadow-sm"
    >
      {routes.map(([link, text]) => {
        const isSelected = link === currentPath;
        return (
          <li>
            <a
              href={isSelected ? "#" : link}
              className={isSelected ? "font-bold" : ""}
            >
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);

export const NavigationLayout = () => {
  const currentPath = window.location.pathname;
  return (
    <div>
      <header>
        <div className="navbar bg-primary text-primary-content">
          <div className="navbar-start">
            <a href="/" className="text-xl flex-shrink-0">
              <img
                src="https://genesysworks.org/wp-content/uploads/2024/05/GW-White-logo-adj.png"
                className="h-8"
              />
            </a>
          </div>
          <div className="navbar-end hidden md:flex">
            <DesktopMenu currentPath={currentPath} />
          </div>
          <div className="navbar-end flex md:hidden">
            <MobileMenu currentPath={currentPath} />
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
