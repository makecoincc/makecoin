import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#121212',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '20px',
        color: '#bb86fc',
        fontWeight: 'bold'
      }}>MakeCoin</h1>
      
      <p style={{
        fontSize: '1.5rem',
        marginBottom: '40px',
        color: '#e0e0e0'
      }}>
        Website Under Development
      </p>
      
      <div style={{
        marginTop: '40px',
        padding: '20px'
      }}>
        <p style={{fontSize: '1.2rem', marginBottom: '20px'}}>Contact us:</p>
        <p>
          <a 
            href="https://t.me/rizzimped" 
            style={{
              color: '#03dac6',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.3rem',
              padding: '10px 20px',
              border: '2px solid #03dac6',
              borderRadius: '30px',
              transition: 'all 0.3s ease'
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            @rizzimped
          </a>
        </p>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '30px',
        display: 'flex',
        gap: '30px'
      }}>
        <Link href="/about" style={{
          color: '#bb86fc',
          textDecoration: 'none',
          fontSize: '1rem',
          transition: 'color 0.3s ease'
        }}>
          About
        </Link>
        <Link href="/contact" style={{
          color: '#bb86fc',
          textDecoration: 'none',
          fontSize: '1rem',
          transition: 'color 0.3s ease'
        }}>
          Contact
        </Link>
      </div>
    </div>
  );
}