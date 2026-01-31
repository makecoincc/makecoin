import Link from 'next/link';

export default function AboutPage() {
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
          marginBottom: '30px',
          color: '#bb86fc',
          fontWeight: 'bold'
        }}>
          About MakeCoin
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          marginBottom: '30px',
          color: '#e0e0e0'
        }}>
          MakeCoin is an innovative cryptocurrency platform currently under development. 
          We are building the next generation of digital financial solutions designed to be 
          accessible, secure, and user-friendly.
        </p>
        
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          marginBottom: '50px',
          color: '#e0e0e0'
        }}>
          Our mission is to simplify cryptocurrency transactions and make digital finance 
          accessible to everyone around the world.
        </p>
        
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