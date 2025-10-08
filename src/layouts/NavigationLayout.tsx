import { Outlet } from "react-router-dom";

const routes = [
  ["/", "Dashboard"],
  ["/match", "Match"],
  ["/ai", "AI"],
];

export const NavigationLayout = () => {
  const currentPath = window.location.pathname;
  return (
    <div>
      <header>
        <div className="navbar bg-primary text-primary-content">
          <div className="navbar-start">
            <a href="/" className="text-xl">
              <img
                src="https://genesysworks.org/wp-content/uploads/2024/05/GW-White-logo-adj.png"
                className="h-8"
              />
            </a>
          </div>
          <div className="navbar-end flex">
            <ul className="menu menu-horizontal px-1">
              {routes.map(([link, text]) => {
                if (link === "/") return;
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
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
