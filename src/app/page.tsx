import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0
    }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{color: '#333'}}>MakeCoin</h1>
        <p style={{fontSize: '18px', marginBottom: '20px'}}>Website Under Development</p>
        <div style={{marginTop: '20px'}}>
          <p>Contact us:</p>
          <p>
            <a 
              href="https://t.me/rizzimped" 
              style={{
                color: '#0088cc',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              @rizzimped
            </a>
          </p>
        </div>
        <div style={{marginTop: '30px'}}>
          <Link href="/about" style={{
            color: '#666',
            textDecoration: 'none',
            marginRight: '20px',
            fontSize: '14px'
          }}>
            About
          </Link>
          <Link href="/contact" style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}