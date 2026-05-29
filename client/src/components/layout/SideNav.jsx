import { NavLink } from "react-router-dom";

const items = [
  {
    to: "/caminhoes",
    label: "Caminhoes",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7.75A2.75 2.75 0 0 1 5.75 5h9.5A2.75 2.75 0 0 1 18 7.75v5.5A2.75 2.75 0 0 1 15.25 16H15a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0h-.25A1.75 1.75 0 0 1 3 14.25Zm16.2-.75h1.14c.69 0 1.32.4 1.61 1.03l.82 1.78c.15.32.23.67.23 1.02v3.42A1.75 1.75 0 0 1 21.25 16H21a2 2 0 1 1-4 0h-.25a3.7 3.7 0 0 0 .45-1.75Z" />
      </svg>
    ),
  },
  {
    to: "/mecanicos",
    label: "Mecanicos",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 1 1 14 0Z" />
      </svg>
    ),
  },
  {
    to: "/ordens-servico",
    label: "Ordens de Servico",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.75 3h8.5A2.75 2.75 0 0 1 19 5.75v12.5A2.75 2.75 0 0 1 16.25 21h-8.5A2.75 2.75 0 0 1 5 18.25V5.75A2.75 2.75 0 0 1 7.75 3ZM8 8h8M8 12h8m-8 4h5" />
      </svg>
    ),
  },
];

export default function SideNav({ isOpen, onNavigate }) {
  return (
    <aside className={isOpen ? "sidebar sidebar--open" : "sidebar"} aria-hidden={!isOpen}>
      <div className="sidebar__top">
        <span className="sidebar__eyebrow">Menu</span>
        <strong className="sidebar__title">Navegacao</strong>
      </div>

      <nav className="sidebar__nav" aria-label="Menu lateral">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "sidebar-link sidebar-link--active" : "sidebar-link"
            }
            onClick={onNavigate}
          >
            <span className="sidebar-link__icon">{item.icon}</span>
            <span className="sidebar-link__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
