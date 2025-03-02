const { Link, NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/">
        <img
          className="gb_Od"
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
          srcSet="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png 2x"
          alt=""
          aria-hidden="true"
          role="presentation"
          style={{ width: "109px", height: "40px" }}
        />
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        {/* <NavLink to="/note">Note</NavLink> */}
      </nav>
    </header>
  );
}
