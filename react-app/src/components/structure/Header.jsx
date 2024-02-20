import './Header.css';

const Header = () => {
  return (
    <header class="App-header">
      <div class="header-nav">
        <div>
          <img src="./securbank.svg" class="logo" alt="logo" />
          <ul>
            <li><strong>Dashboard</strong></li>
            <li><a href="#">Saving Account</a></li>
            <li><a href="#">Transactions</a></li>
            <li><a href="#">Cards</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
