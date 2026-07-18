const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} OnamFest. All rights reserved.</p>
        <p>Celebrate the joy of Onam with us!</p>
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <h4 style={{ color: '#bef264', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontSize: '1.1rem' }}>REGISTRATION ENQUIRY</h4>
          <p style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>Facing any error on the website or registration form? Contact:</p>
          <p style={{ fontWeight: '600' }}>D MANIVANNAN</p>
          <p>
            <a href="tel:7603960719" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>7603960719</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
