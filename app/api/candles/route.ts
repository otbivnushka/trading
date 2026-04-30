import { Timeframe } from '@/@types/types';
import { generateMockCandles } from '@/shared/lib/generate-candles';
import { getPercent } from '@/shared/lib/get-percent';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const timeframe = searchParams.get('timeframe') as Timeframe;
    if (!timeframe) {
      return NextResponse.json({ message: 'No timeframe' }, { status: 400 });
    }

    const instrument = searchParams.get('instrument');
    if (!instrument) {
      return NextResponse.json({ message: 'No instrument' }, { status: 400 });
    }

    const candles = generateMockCandles(500, timeframe, instrument);
    const percent = getPercent(candles).toFixed(2);
    return NextResponse.json({ candles, percent });
  } catch (e) {
    return NextResponse.json({ message: 'Error: ' + e }, { status: 500 });
  }
}
