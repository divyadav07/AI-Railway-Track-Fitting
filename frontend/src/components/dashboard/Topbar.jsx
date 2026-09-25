import { Bell, Menu } from "lucide-react";

export default function Topbar({
  user = { name: "Admin", role: "Administrator", initials: "AD" },
  onMenuClick = () => {},
}) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-5 border-b border-brand-border bg-white px-4 sm:px-6 lg:justify-end lg:px-8">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-text lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-5">
      <button
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-brand-sub transition-colors hover:bg-brand-off"
        aria-label="Notifications"
      >
        <Bell size={18} strokeWidth={1.9} />
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-crit px-1 text-[0.62rem] font-medium text-white">
          3
        </span>
      </button>

      <button className="flex items-center gap-2.5 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-brand-off">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-bg text-[0.72rem] font-medium text-brand-mint">
          {user.initials}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-[0.82rem] font-medium leading-tight text-brand-text">
            {user.name}
          </span>
          <span className="block text-[0.72rem] leading-tight text-brand-sub">{user.role}</span>
        </span>
      </button>
      </div>
    </header>
  );
}
