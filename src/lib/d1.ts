export interface Stock {
  id: number;
  symbol: string;
  quantity: number;
  purchase_price: number;
  selling_price: number | null;
  status: 'HOLDING' | 'SOLD';
  updated_at: string;
}

interface D1Response<T> {
  success: boolean;
  result: Array<{
    results: T[];
    success: boolean;
    meta: {
      changes: number;
      last_row_id: number;
      duration: number;
    };
  }>;
  errors: Array<{ message: string }>;
}

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;
const D1_DATABASE_ID = process.env.D1_DATABASE_ID!;

async function executeQuery<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${D1_DATABASE_ID}/query`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sql,
      params,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`D1 API error: ${error}`);
  }

  const data: D1Response<T> = await response.json();

  if (!data.success) {
    throw new Error(`D1 query error: ${data.errors.map(e => e.message).join(', ')}`);
  }

  return data.result[0]?.results || [];
}

export async function getStocks(): Promise<Stock[]> {
  return executeQuery<Stock>(
    'SELECT * FROM stocks ORDER BY status ASC, updated_at DESC',
    []
  );
}

export async function getStockById(id: number): Promise<Stock | null> {
  const results = await executeQuery<Stock>(
    'SELECT * FROM stocks WHERE id = ?',
    [id]
  );
  return results[0] || null;
}

export async function createStock(
  symbol: string,
  quantity: number,
  purchasePrice: number
): Promise<Stock> {
  await executeQuery(
    'INSERT INTO stocks (symbol, quantity, purchase_price) VALUES (?, ?, ?)',
    [symbol.toUpperCase(), quantity, purchasePrice]
  );

  const results = await executeQuery<Stock>(
    'SELECT * FROM stocks WHERE symbol = ? AND quantity = ? AND purchase_price = ? ORDER BY id DESC LIMIT 1',
    [symbol.toUpperCase(), quantity, purchasePrice]
  );

  return results[0];
}

export async function updateStock(
  id: number,
  data: Partial<Pick<Stock, 'symbol' | 'quantity' | 'purchase_price' | 'selling_price' | 'status'>>
): Promise<Stock | null> {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.symbol !== undefined) {
    fields.push('symbol = ?');
    values.push(data.symbol.toUpperCase());
  }
  if (data.quantity !== undefined) {
    fields.push('quantity = ?');
    values.push(data.quantity);
  }
  if (data.purchase_price !== undefined) {
    fields.push('purchase_price = ?');
    values.push(data.purchase_price);
  }
  if (data.selling_price !== undefined) {
    fields.push('selling_price = ?');
    values.push(data.selling_price);
  }
  if (data.status !== undefined) {
    fields.push('status = ?');
    values.push(data.status);
  }

  if (fields.length === 0) return getStockById(id);

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await executeQuery(
    `UPDATE stocks SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  return getStockById(id);
}

export async function deleteStock(id: number): Promise<boolean> {
  await executeQuery('DELETE FROM stocks WHERE id = ?', [id]);
  return true;
}
