import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <header>
          <h3>About</h3>
        </header>
        Beulah & Daniel Fashion Palace is an independent online retailer
        offering variety of products ranging from branded products, stock from
        other retailers to its own label.
      </section>
      <section>
        <header>
          <h4>Contact Us</h4>
        </header>
        <address>
          <div>easy but time waster</div>
          <a href="aProfessionalEmail@email.com">
            aProfessionalEmail@email.com
          </a>
          <br />
          <a href="tel:+23481">+234..number</a>
          <div>bndclothings.com</div>
        </address>
      </section>
      <section>
        <header>
          <h4>Help & Support</h4>
        </header>
        <div>
          <Link to="/">Frequently asked questions </Link>
        </div>
        <div>
          <Link to="/">delivery & returns </Link>
        </div>
        <div>
          <Link to="/">Size guide </Link>
        </div>
      </section>
      <section>
        <header>
          <h4>Subscribe</h4>
        </header>
        <input type="email" placeholder="email" />
      </section>
    </footer>
  )
}

export default Footer
