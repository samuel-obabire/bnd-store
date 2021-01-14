import { Link } from 'react-router-dom'

import './Footer.scss'

import { ReactComponent as Fb } from '../../asset/fb.svg'
import { ReactComponent as Wa } from '../../asset/wa-icon.svg'
import { ReactComponent as Ig } from '../../asset/ig-icon.svg'

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
        <div className="social-link">
          <a
            href="https://facebook.com/bndclothings"
            rel="noopener noreferrer"
            target="_blank">
            <Fb />
          </a>
          <a
            href="https://facebook.com"
            rel="noopener noreferrer"
            target="_blank">
            <Ig />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=23487570081&text=
            Hello%2C%20I%20want%20more%20info%20about%20a%20product"
            rel="noopener noreferrer"
            target="_blank">
            <Wa />
          </a>
        </div>
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
          <h4>Newsletter</h4>
        </header>
        <p>
          Be the first to know our latest deals; get discounts for early
          purchase
        </p>
        <input type="email" placeholder="email" />
        <button>Subscribe</button>
      </section>
    </footer>
  )
}

export default Footer
