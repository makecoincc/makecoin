import Link from 'next/link';

export default function ContactPage() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#121212',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        paddingTop: '100px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '40px',
          color: '#bb86fc',
          fontWeight: 'bold'
        }}>
          Contact Us
        </h1>
        
        <div style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          marginBottom: '40px',
          color: '#e0e0e0'
        }}>
          <p style={{marginBottom: '30px'}}>For business inquiries, partnerships, or general questions:</p>
          
          <p>
            <a 
              href="https://t.me/rizzimped" 
              style={{
                color: '#03dac6',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                display: 'inline-block',
                padding: '15px 30px',
                border: '2px solid #03dac6',
                borderRadius: '30px',
                transition: 'all 0.3s ease',
                marginTop: '20px'
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram: @rizzimped
            </a>
          </p>
          
          <p style={{marginTop: '30px'}}>We aim to respond to all inquiries within 24 hours.</p>
        </div>
        
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '30px'
        }}>
          <Link href="/" style={{
            color: '#03dac6',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}