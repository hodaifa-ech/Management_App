import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import axios from 'axios';
export default function AuthenticatedLayout({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(route('notifications.index'));
      setNotifications(response.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const markAsRead = async (id) => {
    try {
      await axios.post(route('notifications.markAsRead', { id }));
      // Optionally refetch notifications or update state to reflect changes
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };
  const unreadCount = notifications.filter(notification => notification.read_at === null).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
              </Link>
            </div>
            <div className="hidden sm:flex sm:items-center sm:space-x-8 mx-auto">
              <NavLink href={route("dashboard")} active={route().current("dashboard")}>
                <i className="fa-solid fa-bars mx-2"></i> Dashboard
              </NavLink>
              <NavLink href={route("project.index")} active={route().current("project.index")}>
                <i className="fa-solid fa-briefcase mx-2"></i> Projects
              </NavLink>
              {user.Role === 'admin' && (
                <NavLink href={route("task.index")} active={route().current("task.index")}>
                  <i className="fa-solid fa-list-check mx-2"></i> All Tasks
                </NavLink>
              )}
              {user.Role === 'admin' && (
                <NavLink href={route("user.index")} active={route().current("user.index")}>
                  <i className="fa-regular fa-user mx-2"></i> Users
                </NavLink>
              )}
              <NavLink href={route("task.myTasks")} active={route().current("task.myTasks")}>
                <i className="fa-solid fa-list mx-2"></i> My Tasks
              </NavLink>
            </div>
            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                        <div className="mx-2 relative">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.image_path ? `/storage/${user.image_path}` : 'default-avatar.png'} alt="" />
                        </div>
                        {user.name}
                        <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                    <Dropdown.Link href={route("logout")} method="post" as="button">Log Out</Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                      >
                        <i className="fa fa-bell"></i>
                        {notifications.length > 0 && notifications.some(notification => notification.read_at === null) && (
                          <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2 py-1">
                            {unreadCount}
                          </span>
                        )}
                      </button>
                    </span>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <Dropdown.Link
                          key={notification.id}
                          href={`/task/${notification.data.slug}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          {notification.data.title}
                        </Dropdown.Link>
                      ))
                    ) : (
                      <Dropdown.Link as="span">No notifications</Dropdown.Link>
                    )}
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
            <div className="-me-2 flex items-center sm:hidden">
              <button onClick={() => setShowingNavigationDropdown((previousState) => !previousState)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path className={!showingNavigationDropdown ? "inline-flex" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path className={showingNavigationDropdown ? "inline-flex" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route("dashboard")} active={route().current("dashboard")}>Dashboard</ResponsiveNavLink>
            <ResponsiveNavLink href={route("project.index")} active={route().current("project.index")}>Projects</ResponsiveNavLink>
            <ResponsiveNavLink href={route("task.index")} active={route().current("task.index")}>All Tasks</ResponsiveNavLink>
            {user.Role === 'admin' && (
              <>
                <ResponsiveNavLink href={route("user.index")} active={route().current("user.index")}>Users</ResponsiveNavLink>
                <ResponsiveNavLink href={route("task.myTasks")} active={route().current("task.myTasks")}>My Tasks</ResponsiveNavLink>
              </>
            )}
          </div>
          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
              <div className="font-medium text-sm text-gray-500">{user.email}</div>
            </div>
            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route("profile.edit")}>Profile</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route("logout")} as="button">Log Out</ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>
      {header && (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
}
