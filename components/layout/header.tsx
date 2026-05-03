import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/studio", label: "Studio 3D" },
  { href: "/tienda", label: "Tienda" },
  { href: "/cursos", label: "Cursos" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-fuchsia-100/50 bg-white/75 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xl font-bold gradient-text">Valdemaria Personalizados</p>
          <p className="text-xs text-neutral-600">@valdemaria_personalizados</p>
        </div>
        <div className="hidden gap-5 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-neutral-700 hover:text-fuchsia-600">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
