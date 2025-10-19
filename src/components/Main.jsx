import "./Main.css";

export function Main() {
  return (
    <main>
      <h1>
        Largest <br /> Crypto Marketplace
      </h1>
      <p>
        Welcome to the world's largest cryptocurrency marketplace.
        <br /> Sign up to explore more about cryptos.
      </p>
      <div className="input-container">
        <input type="text" placeholder="Search crypto ..." />
        <button>Search</button>
      </div>
    </main>
  );
}
