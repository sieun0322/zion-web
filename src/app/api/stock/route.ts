import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getStockQuote } from '@/lib/stock';

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const symbol = request.nextUrl.searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const quote = await getStockQuote(symbol);
    return NextResponse.json(quote);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch stock data';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
