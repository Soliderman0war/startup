const Header = () => {
    return (
      <header>
        <div className="logo">Logo</div>
        <nav className={styles.nav}>
        <a href="/" className={styles.navLink}>
          Home
        </a>
        <a href="/login" className={styles.navLink}>
          Login
        </a>
        <a href="/signup" className={styles.navLink}>
          Signup
        </a>
        <a href="/about" className={styles.navLink}>
          About
        </a>
      </nav>
        <div className="dark-mode-toggle">
          <label htmlFor="darkMode">Dark Mode</label>
          <input type="checkbox" id="darkMode" />
        </div>
      </header>
    );
  };
  
export default Header;
  