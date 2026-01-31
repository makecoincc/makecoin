import Link from 'next/link';

export default function AboutPage() {
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
        <h1 style={{color: '#333'}}>About MakeCoin</h1>
        <p style={{fontSize: '16px', lineHeight: '1.6', marginBottom: '30px'}}>
          MakeCoin is an innovative cryptocurrency platform currently under development. 
          We are building the next generation of digital financial solutions designed to be 
          accessible, secure, and user-friendly.
        </p>
        <p style={{fontSize: '16px', lineHeight: '1.6', marginBottom: '30px'}}>
          Our mission is to simplify cryptocurrency transactions and make digital finance 
          accessible to everyone around the world.
        </p>
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