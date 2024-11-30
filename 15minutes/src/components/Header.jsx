const Header = () => {
    return (
      <header>
        <div className="logo">Logo</div>
        <nav>
          <a href="/">Home</a>
          <a href="/login">Login</a>
        </nav>
        <div className="dark-mode-toggle">
          <label htmlFor="darkMode">Dark Mode</label>
          <input type="checkbox" id="darkMode" />
        </div>
      </header>
    );
  };
  
export default Header;
  