export function Footer() {
  return (
    <footer className="mt-20 border-t border-fuchsia-100 bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Valdemaria Personalizados.</p>
        <div className="flex gap-4">
          <a href="https://instagram.com/valdemaria_personalizados" className="hover:text-fuchsia-600">Instagram</a>
          <a href="https://wa.me/573001112233" className="hover:text-fuchsia-600">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
