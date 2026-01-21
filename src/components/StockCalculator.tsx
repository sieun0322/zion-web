'use client';

import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import type { StockQuote } from '@/lib/stock';
import type { Stock } from '@/lib/d1';

interface StockEntry {
  id: number;
  symbol: string;
  buyPrice: number;
  quantity: number;
  sellingPrice: number | null;
  status: 'HOLDING' | 'SOLD';
  quote: StockQuote | null;
  loading: boolean;
  error: string | null;
  dbStock: Stock | null;
}

export default function StockCalculator() {
  const [entries, setEntries] = useState<StockEntry[]>([]);
  const [newSymbol, setNewSymbol] = useState('');
  const [newBuyPrice, setNewBuyPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [sellingId, setSellingId] = useState<number | null>(null);
  const [sellingPrice, setSellingPrice] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editSymbol, setEditSymbol] = useState('');
  const [editBuyPrice, setEditBuyPrice] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editSellingPrice, setEditSellingPrice] = useState('');

  const loadStocks = useCallback(async () => {
    try {
      const res = await fetch('/api/stocks');
      const data = await res.json();
      if (!res.ok) {
        console.error('API Error:', data);
        throw new Error(data.error || 'Failed to load stocks');
      }
      const stocks: Stock[] = data;

      setEntries(
        stocks.map((stock) => ({
          id: stock.id,
          symbol: stock.symbol,
          buyPrice: stock.purchase_price,
          quantity: stock.quantity,
          sellingPrice: stock.selling_price,
          status: stock.status,
          quote: null,
          loading: false,
          error: null,
          dbStock: stock,
        }))
      );
    } catch (error) {
      console.error('Failed to load stocks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStocks();
  }, [loadStocks]);

  const addEntry = async () => {
    if (!newSymbol || !newBuyPrice || !newQuantity) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/stocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: newSymbol.toUpperCase(),
          quantity: parseFloat(newQuantity),
          purchase_price: parseFloat(newBuyPrice),
        }),
      });

      if (!res.ok) throw new Error('Failed to add stock');

      const stock: Stock = await res.json();

      const entry: StockEntry = {
        id: stock.id,
        symbol: stock.symbol,
        buyPrice: stock.purchase_price,
        quantity: stock.quantity,
        sellingPrice: stock.selling_price,
        status: stock.status,
        quote: null,
        loading: false,
        error: null,
        dbStock: stock,
      };

      setEntries([entry, ...entries]);
      setNewSymbol('');
      setNewBuyPrice('');
      setNewQuantity('');
    } catch (error) {
      console.error('Failed to add stock:', error);
      alert('종목 추가에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const removeEntry = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/stocks?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete stock');

      setEntries(entries.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Failed to delete stock:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const sellEntry = async (id: number) => {
    if (!sellingPrice) return;

    try {
      const res = await fetch('/api/stocks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          selling_price: parseFloat(sellingPrice),
          status: 'SOLD',
        }),
      });

      if (!res.ok) throw new Error('Failed to sell stock');

      setEntries(
        entries.map((e) =>
          e.id === id
            ? { ...e, sellingPrice: parseFloat(sellingPrice), status: 'SOLD' as const }
            : e
        )
      );
      setSellingId(null);
      setSellingPrice('');
    } catch (error) {
      console.error('Failed to sell stock:', error);
      alert('판매 처리에 실패했습니다.');
    }
  };

  const startEdit = (entry: StockEntry) => {
    setEditingId(entry.id);
    setEditSymbol(entry.symbol);
    setEditBuyPrice(entry.buyPrice.toString());
    setEditQuantity(entry.quantity.toString());
    setEditSellingPrice(entry.sellingPrice?.toString() || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditSymbol('');
    setEditBuyPrice('');
    setEditQuantity('');
    setEditSellingPrice('');
  };

  const saveEdit = async (id: number, status: 'HOLDING' | 'SOLD') => {
    if (!editSymbol || !editBuyPrice || !editQuantity) return;

    try {
      const updateData: Record<string, unknown> = {
        id,
        symbol: editSymbol.toUpperCase(),
        purchase_price: parseFloat(editBuyPrice),
        quantity: parseFloat(editQuantity),
      };

      if (status === 'SOLD' && editSellingPrice) {
        updateData.selling_price = parseFloat(editSellingPrice);
      }

      const res = await fetch('/api/stocks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) throw new Error('Failed to update stock');

      setEntries(
        entries.map((e) =>
          e.id === id
            ? {
                ...e,
                symbol: editSymbol.toUpperCase(),
                buyPrice: parseFloat(editBuyPrice),
                quantity: parseFloat(editQuantity),
                sellingPrice: status === 'SOLD' && editSellingPrice ? parseFloat(editSellingPrice) : e.sellingPrice,
              }
            : e
        )
      );
      cancelEdit();
    } catch (error) {
      console.error('Failed to update stock:', error);
      alert('수정에 실패했습니다.');
    }
  };

  const fetchQuote = async (id: number) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;

    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, loading: true, error: null } : e
      )
    );

    try {
      const res = await fetch(`/api/stock?symbol=${encodeURIComponent(entry.symbol)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch quote');
      }

      setEntries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, loading: false, quote: data } : e
        )
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error';
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, loading: false, error: message } : e
        )
      );
    }
  };

  const fetchAllQuotes = async () => {
    const promises = entries.map((entry) => fetchQuote(entry.id));
    await Promise.all(promises);
  };

  const calculateReturn = (entry: StockEntry) => {
    const totalCost = entry.buyPrice; // buyPrice is total purchase amount
    const avgPrice = entry.buyPrice / entry.quantity; // per-share price

    // 판매 완료된 경우
    if (entry.status === 'SOLD' && entry.sellingPrice) {
      const currentValue = entry.sellingPrice;
      const profit = currentValue - totalCost;
      const returnPercent = ((entry.sellingPrice / entry.quantity - avgPrice) / avgPrice) * 100;
      return { totalCost, currentValue, profit, returnPercent, avgPrice };
    }

    // 보유 중인 경우
    if (!entry.quote) return null;
    const currentValue = entry.quote.price * entry.quantity;
    const profit = currentValue - totalCost;
    const returnPercent = ((entry.quote.price - avgPrice) / avgPrice) * 100;
    return { totalCost, currentValue, profit, returnPercent, avgPrice };
  };

  const holdingEntries = entries.filter((e) => e.status === 'HOLDING');
  const totalSummary = holdingEntries.reduce(
    (acc, entry) => {
      acc.totalCost += entry.buyPrice; // buyPrice is total purchase amount
      const calc = calculateReturn(entry);
      if (calc) {
        acc.currentValue += calc.currentValue;
        acc.profit += calc.profit;
      }
      return acc;
    },
    { totalCost: 0, currentValue: 0, profit: 0 }
  );

  const totalReturnPercent =
    totalSummary.totalCost > 0
      ? ((totalSummary.currentValue - totalSummary.totalCost) / totalSummary.totalCost) * 100
      : 0;

  const formatCurrency = (value: number, currency?: string) => {
    if (currency === 'KRW') {
      return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-light-accent dark:border-dark-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Entry Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
          종목 추가
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
              종목 코드
            </label>
            <input
              type="text"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              placeholder="AAPL, 005930.KS"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
              총 매수금액
            </label>
            <input
              type="number"
              value={newBuyPrice}
              onChange={(e) => setNewBuyPrice(e.target.value)}
              placeholder="총 투자금액"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
              수량
            </label>
            <input
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              placeholder="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addEntry}
              disabled={isSaving}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold disabled:opacity-50 shadow-md"
            >
              {isSaving ? '저장 중...' : '+ 추가'}
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          미국: AAPL, TSLA | 코스피: 005930.KS | 코스닥: 035720.KQ
        </p>
      </div>

      {/* Actions */}
      {entries.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={fetchAllQuotes}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            전체 시세 조회
          </button>
        </div>
      )}

      {/* Entries List */}
      {entries.length > 0 && (
        <div className="space-y-4">
          {entries.map((entry) => {
            const calc = calculateReturn(entry);
            return (
              <div
                key={entry.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                      {entry.quote &&entry.quote.name}
                    </h3>
                    {entry.symbol && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {entry.symbol}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {entry.status === 'HOLDING' && (
                      <>
                        <button
                          onClick={() => fetchQuote(entry.id)}
                          disabled={entry.loading}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {entry.loading ? '조회 중...' : '시세 조회'}
                        </button>
                        <button
                          onClick={() => setSellingId(entry.id)}
                          className="px-3 py-1 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          판매
                        </button>
                      </>
                    )}
                    {entry.status === 'SOLD' && (
                      <span className="px-3 py-1 text-sm bg-gray-500 text-white rounded-lg">
                        판매 완료
                      </span>
                    )}
                    <button
                      onClick={() => startEdit(entry)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>

                {entry.error && (
                  <p className="text-red-500 text-sm mb-4">{entry.error}</p>
                )}

                {/* 판매 입력 폼 */}
                {sellingId === entry.id && (
                  <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">총 판매금액 입력</p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        placeholder="총 판매금액"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-light-text dark:text-dark-text"
                      />
                      <button
                        onClick={() => sellEntry(entry.id)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      >
                        확인
                      </button>
                      <button
                        onClick={() => {
                          setSellingId(null);
                          setSellingPrice('');
                        }}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}

                {/* 수정 폼 */}
                {editingId === entry.id && (
                  <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">종목 정보 수정</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">종목 코드</label>
                        <input
                          type="text"
                          value={editSymbol}
                          onChange={(e) => setEditSymbol(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-light-text dark:text-dark-text text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">총 매수금액</label>
                        <input
                          type="number"
                          value={editBuyPrice}
                          onChange={(e) => setEditBuyPrice(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-light-text dark:text-dark-text text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">수량</label>
                        <input
                          type="number"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-light-text dark:text-dark-text text-sm"
                        />
                      </div>
                      {entry.status === 'SOLD' && (
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">총 판매금액</label>
                          <input
                            type="number"
                            value={editSellingPrice}
                            onChange={(e) => setEditSellingPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-light-text dark:text-dark-text text-sm"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(entry.id, entry.status)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                      >
                        저장
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">총 매수금액</p>
                    <p className="text-lg font-semibold text-light-text dark:text-dark-text">
                      {formatNumber(entry.buyPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">수량</p>
                    <p className="text-lg font-semibold text-light-text dark:text-dark-text">
                      {formatNumber(entry.quantity)}주
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">평단가</p>
                    <p className="text-lg font-semibold text-light-text dark:text-dark-text">
                      {formatNumber(Math.round(entry.buyPrice / entry.quantity))}
                    </p>
                  </div>
                  {entry.status === 'SOLD' ? (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">총 판매금액</p>
                      <p className="text-lg font-semibold text-light-text dark:text-dark-text">
                        {entry.sellingPrice ? formatNumber(entry.sellingPrice) : '-'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">현재가</p>
                        <p className="text-lg font-semibold text-light-text dark:text-dark-text">
                          {entry.quote
                            ? formatCurrency(entry.quote.price, entry.quote.currency)
                            : '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">당일 등락</p>
                        <p
                          className={clsx(
                            'text-lg font-semibold',
                            entry.quote && entry.quote.change >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          )}
                        >
                          {entry.quote
                            ? `${entry.quote.change >= 0 ? '+' : ''}${entry.quote.changePercent.toFixed(2)}%`
                            : '-'}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {calc && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {entry.status === 'HOLDING' && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">평가 금액</p>
                        <p className="text-lg font-semibold text-light-text dark:text-dark-text">
                          {formatCurrency(calc.currentValue, entry.quote?.currency)}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {entry.status === 'SOLD' ? '실현 손익' : '평가 손익'}
                      </p>
                      <p
                        className={clsx(
                          'text-lg font-semibold',
                          calc.profit >= 0 ? 'text-green-600' : 'text-red-600'
                        )}
                      >
                        {calc.profit >= 0 ? '+' : ''}
                        {formatNumber(Math.round(calc.profit))}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">수익률</p>
                      <p
                        className={clsx(
                          'text-lg font-semibold',
                          calc.returnPercent >= 0 ? 'text-green-600' : 'text-red-600'
                        )}
                      >
                        {calc.returnPercent >= 0 ? '+' : ''}
                        {calc.returnPercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Total Summary - 보유 중인 종목만 */}
      {holdingEntries.some((e) => e.quote) && (
        <div className="bg-gradient-to-r from-light-accent to-blue-600 dark:from-dark-accent dark:to-purple-600 rounded-xl p-6 shadow-lg text-white">
          <h2 className="text-lg font-semibold mb-4">포트폴리오 요약</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm opacity-80">총 매수 금액</p>
              <p className="text-xl font-bold">{formatNumber(Math.round(totalSummary.totalCost))}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">총 평가 금액</p>
              <p className="text-xl font-bold">{formatNumber(Math.round(totalSummary.currentValue))}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">총 평가 손익</p>
              <p className="text-xl font-bold">
                {totalSummary.profit >= 0 ? '+' : ''}
                {formatNumber(Math.round(totalSummary.profit))}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-80">총 수익률</p>
              <p className="text-xl font-bold">
                {totalReturnPercent >= 0 ? '+' : ''}
                {totalReturnPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          종목을 추가하여 수익률을 계산해보세요
        </div>
      )}
    </div>
  );
}
