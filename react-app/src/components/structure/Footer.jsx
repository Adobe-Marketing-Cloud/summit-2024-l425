import './Footer.css';

const Footer = () => {
  return (
    <footer class="footer-wrapper">
      <div class="footer block" data-block-name="footer" data-block-status="loaded">
        <div>
          <div>
            <div class="columns">
              <div>
                <div data-valign="middle">
                  <p><a href="/"><span class="icon icon-securbank_logo"><svg xmlns="http://www.w3.org/2000/svg"><use href="#icons-sprite-securbank_logo"></use></svg></span></a></p>
                  <p>201 Sussex St,</p>
                  <p>Sydney, NSW, Australia</p>
                  <p>+61 97784100</p>
                  <p>Any reference to SecurBank, its logo and/or its products and services is for demonstration purposes only and is not intended to refer to any actual organisation, products or services.</p>
                </div>
                <div data-valign="middle">
                  <p><strong>Navigate</strong></p>
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/creditcards/">Credit Cards</a></li>
                    <li><a href="/insurance/">Insurances</a></li>
                    <li><a href="/accounts/">Accounts</a></li>
                    <li><a href="/loans/">Loans</a></li>
                  </ul>
                </div>
                <div data-valign="middle">
                  <p><strong>About Us</strong></p>
                  <ul>
                    <li>Company</li>
                    <li>What we do</li>
                    <li>Help center</li>
                    <li><a href="/blog/">News</a></li>
                    <li>Terms of service</li>
                    <li>Contact</li>
                  </ul>
                </div>
                <div data-valign="middle">
                  <p><strong>Help</strong></p>
                  <ul>
                    <li>Info</li>
                    <li>Careers</li>
                    <li>Education</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
