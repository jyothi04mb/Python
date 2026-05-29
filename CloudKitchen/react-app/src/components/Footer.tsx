export function Footer() {
  return (
    <footer id="hours" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3 sm:px-6">
        <div>
          <h3 className="text-lg font-semibold">Ember & Crumb</h3>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            A cloud kitchen serving handcrafted comfort food from a single, focused menu.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Hours</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>Mon – Thu · 11:00 – 22:00</li>
            <li>Fri – Sat · 11:00 – 23:30</li>
            <li>Sun · 12:00 – 21:00</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>hello@emberandcrumb.co</li>
            <li>+1 (555) 012-3344</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ember & Crumb · Cloud Kitchen
      </div>
    </footer>
  );
}
