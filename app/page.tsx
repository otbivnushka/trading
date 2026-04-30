import { TradingWorkspace } from '@/shared/components/shared/trading-workspace';
import { generateMockCandles } from '@/shared/lib/generate-candles';

export default function Home() {
  const candles = generateMockCandles(200);

  return <TradingWorkspace candles={candles} />;
}
