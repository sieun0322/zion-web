import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getStocks, createStock, updateStock, deleteStock } from '@/lib/d1';

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stocks = await getStocks();
    return NextResponse.json(stocks);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch stocks';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { symbol, quantity, purchase_price } = body;

    if (!symbol || quantity === undefined || purchase_price === undefined) {
      return NextResponse.json(
        { error: 'symbol, quantity, and purchase_price are required' },
        { status: 400 }
      );
    }

    const stock = await createStock(symbol, quantity, purchase_price);
    return NextResponse.json(stock, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create stock';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const stock = await updateStock(id, data);
    if (!stock) {
      return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
    }

    return NextResponse.json(stock);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update stock';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    await deleteStock(parseInt(id, 10));
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete stock';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
