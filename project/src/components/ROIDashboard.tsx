import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';

interface ROIDashboardProps {
  roiMonths: number;
  savingsAfterFaasINR: number;
  totalCostClientINR: number;
  formatMoney: (amount: number) => string;
}

const formatMoneyWithApprox = (amount: number, formatMoney: (amount: number) => string) => {
  const formatted = formatMoney(amount);
  return formatted ? `${formatted} (approx)` : '';
};

export function ROIDashboard({
  roiMonths,
  savingsAfterFaasINR,
  totalCostClientINR,
  formatMoney
}: ROIDashboardProps) {
  const roiYears = roiMonths / 12;
  const roiPercentage = totalCostClientINR > 0
    ? ((savingsAfterFaasINR / totalCostClientINR) * 100).toFixed(1)
    : '0';

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700 shadow-xl">
      <div className="space-y-2 sm:space-y-3">
        {/* ROI Period */}
        <div className="flex items-center justify-between py-2 border-b border-gray-700">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-green flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium text-gray-300 uppercase tracking-wide">ROI Period</span>
          </div>
          <div className="text-right">
            <div className="text-lg sm:text-xl font-bold text-white">{roiMonths > 0 ? roiMonths.toFixed(1) : '0.0'}</div>
            <div className="text-[9px] sm:text-[10px] text-gray-400">{roiYears > 0 ? `${roiYears.toFixed(1)} years` : '0.0 years'}</div>
          </div>
        </div>

        {/* Annual Savings */}
        <div className="flex items-center justify-between py-2 border-b border-gray-700">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-purple flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium text-gray-300 uppercase tracking-wide">Annual Savings</span>
          </div>
          <div className="text-right">
            <div className="text-xs sm:text-sm font-bold text-white break-words">{formatMoneyWithApprox(savingsAfterFaasINR, formatMoney)}</div>
            <div className="text-[9px] sm:text-[10px] text-gray-400">After FaaS Fees</div>
          </div>
        </div>

        {/* Investment */}
        <div className="flex items-center justify-between py-2 border-b border-gray-700">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium text-gray-300 uppercase tracking-wide">Investment</span>
          </div>
          <div className="text-right">
            <div className="text-xs sm:text-sm font-bold text-white break-words">{formatMoneyWithApprox(totalCostClientINR, formatMoney)}</div>
            <div className="text-[9px] sm:text-[10px] text-gray-400">Client Cost</div>
          </div>
        </div>

        {/* Annual ROI */}
        <div className="flex items-center justify-between py-2 border-b border-gray-700">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-blue flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium text-gray-300 uppercase tracking-wide">Annual ROI</span>
          </div>
          <div className="text-right">
            <div className="text-lg sm:text-xl font-bold text-white">{roiPercentage}%</div>
            <div className="text-[9px] sm:text-[10px] text-gray-400">Return Rate</div>
          </div>
        </div>

        {/* Breakeven Achieved */}
        <div className="pt-2">
          <div className="p-2.5 sm:p-3 bg-gradient-to-r from-brand-green/20 to-brand-green/10 border-2 border-brand-green rounded-lg">
            <div className="text-center">
              <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-brand-green mb-1">Breakeven Achieved</div>
              <div className="text-base sm:text-lg font-black text-brand-green">
                Month {roiMonths > 0 ? roiMonths.toFixed(1) : '0.0'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
