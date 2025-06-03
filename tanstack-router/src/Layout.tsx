import "./Layout.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="Layout">
      <header className="Header">
        <h1>Header</h1>
      </header>
      <main className="Main">{children}</main>
      <footer className="Footer">Footer</footer>
    </div>
  );
};
