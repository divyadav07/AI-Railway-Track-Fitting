import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";
import Button from "./Button.jsx";

const links = [
  { label: "Home", href: "#top" },
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#workflow" },
  { label: "For teams", href: "#roles" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.92rem] text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button as={Link} to="/login" variant="ghost" size="sm">
            Log in
          </Button>
          <Button as={Link} to="/signup" variant="primary" size="sm">
            Sign up
          </Button>
        </div>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-ink px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/70"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Button as={Link} to="/login" variant="outlineLight" className="flex-1">
              Log in
            </Button>
            <Button as={Link} to="/signup" variant="primary" className="flex-1">
              Sign up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
