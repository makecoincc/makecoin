import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tokenId = searchParams.get('id') || 'solana';
    const vsCurrency = searchParams.get('vs_currency') || 'usd';

    const apiKey = process.env.COINGECKO_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=${vsCurrency}&ids=${tokenId}`;
    
    const response = await fetch(url, {
      headers: {
        'x-cg-pro-api-key': apiKey,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch token price' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching token price:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
