import React, { useEffect, useState } from "react";
import {
  LINK_CLASSES,
  menuItems,
  PRODUCTIVITY_CARD,
  SIDEBAR_CLASSES,
  TIP_CARD,
} from "../assets/dummy";
import { Lightbulb, Menu, Sparkles, X } from "lucide-react";
import { NavLink } from "react-router-dom";
function Sidebar({ user, tasks }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalTasks = tasks.length || 0;
  const completedTasks = tasks.filter((task) => task.completed).length || 0;
  const productivity =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const username = user?.name?.split(" ")[0] || "Guest";
  const initial = username.charAt(0).toUpperCase();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const renderMenuItems = (isMobile = false) => {
    return (
      <ul className="space-y-2">
        {menuItems.map(({ text, path, icon }) => (
          <li key={text}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                [
                  LINK_CLASSES.base,
                  isActive ? LINK_CLASSES.active : LINK_CLASSES.inactive,
                  isMobile ? "justify-start" : "lg:justify-start",
                ].join(" ")
              }
              onClick={() => setMobileOpen(false)}
            >
              <span className={LINK_CLASSES.icon}>{icon}</span>
              <span
                className={`${
                  isMobile ? "block" : "hidden lg:block"
                } ${LINK_CLASSES.text}`}
              >
                {text}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    //  Desktop Sidebar
    <>
      <div className={SIDEBAR_CLASSES.desktop}>
        <div className="p-5 border-b border-purple-100 lg:block hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              {initial}
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                hey , {username}
              </h1>
              <p className="text-sm text-purple-500 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> let's crush some tasks
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4  overflow-y-auto flex-1">
          <div className={PRODUCTIVITY_CARD.container}>
            <div className={PRODUCTIVITY_CARD.header}>
              <h3 className={PRODUCTIVITY_CARD.label}>Productivity</h3>
              <span className={PRODUCTIVITY_CARD.badge}>{productivity}%</span>
            </div>
            <div className={PRODUCTIVITY_CARD.barBg}>
              <div
                className={PRODUCTIVITY_CARD.barFg}
                style={{ width: `${productivity}%` }}
              />
            </div>
          </div>
          {renderMenuItems()}
          <div className="mt-auto pt-6 lg:block hidden">
            <div className={TIP_CARD.container}>
              <div className="flex items-center gap-2">
                <div className={TIP_CARD.iconWrapper}>
                  <Lightbulb className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className={TIP_CARD.title}>Pro Tip</h3>
                  <p className={TIP_CARD.text}>
                    Use Keyboard Shortcuts to boost your productivity
                    <a
                      href="https://www.linkedin.com/in/souryapriya-choudhury-940655284/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-500 block mt-2 text-sm hover:underline"
                    >
                      Visit my LinkedIn 
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu  */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className={SIDEBAR_CLASSES.mobileButton}
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
      {/* Mobile drawer  */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className={SIDEBAR_CLASSES.mobileDrawerBackdrop}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={SIDEBAR_CLASSES.mobileDrawer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold text-purple-600"> Menu</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-purple-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6 mt-3.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                {initial}
              </div>
              <div>
              <h1 className="text-lg font-bold text-gray-800">
                hey , {username}
              </h1>
              <p className="text-sm text-purple-500 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> let's crush some tasks
              </p>
            </div>
            </div>
            {renderMenuItems(true)}
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
