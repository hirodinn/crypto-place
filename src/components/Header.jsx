import "./Header.css";
export function Header({ currency, setCurrency }) {
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
        <select
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
          value={currency}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <div className="sign-up">
          Sign up <img src="/header-icons/arrow.png" />
        </div>
      </div>
    </header>
  );
}
