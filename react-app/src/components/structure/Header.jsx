import "./Header.css";

const Header = () => {
  return (
    <header className="App-header">
      <div className="header-nav">
        <div>
          <img src="./securbank.svg" className="logo" alt="logo" />
          <ul className="menu">
            <li>
              <a href={`/`}>Home</a>
            </li>
            <li>
              <a href={`/services${window.location.search}`}>Services</a>
            </li>
            <li>
              <a href={`/articles${window.location.search}`}>Articles</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
