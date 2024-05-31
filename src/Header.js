function Header({ children }) {
  return (
    <div className="nav-bar">
      <h1> 🎬 CINE-MANIAC</h1>

      {children}
    </div>
  );
}

export default Header;
