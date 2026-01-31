import Link from 'next/link';

export default function ContactPage() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{color: '#333'}}>Contact Us</h1>
        <div style={{fontSize: '16px', lineHeight: '1.6', marginBottom: '30px'}}>
          <p>For business inquiries, partnerships, or general questions:</p>
          <p style={{margin: '20px 0'}}>
            <a 
              href="https://t.me/rizzimped" 
              style={{
                color: '#0088cc',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                display: 'inline-block',
                padding: '10px 20px',
                border: '2px solid #0088cc',
                borderRadius: '5px',
                marginTop: '10px'
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram: @rizzimped
            </a>
          </p>
          <p>We aim to respond to all inquiries within 24 hours.</p>
        </div>
        <div>
          <Link href="/" style={{
            color: '#0088cc',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}