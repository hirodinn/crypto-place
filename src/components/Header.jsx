import "./Header.css";
export function Header() {
  return (
    <header>
      <div className="left">
        <img src="/header-icons/logo.png" />
      </div>
      <ul className="middle">
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="right">
        <select>
          <option>USD</option>
          <option>EUR</option>
          <option>INR</option>
        </select>
        <div className="sign-up">
          Sign up <img src="/header-icons/arrow.png" />
        </div>
      </div>
    </header>
  );
}
