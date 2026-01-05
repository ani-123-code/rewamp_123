import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ROIChartsProps {
  currencySymbol: string;
  partA_INR: number;
  partBC_INR: number;
  interestRefundableINR: number;
  savingsRmPerAnnumINR: number;
  flowneticsFeesPerYearINR: number;
  formatMoneyShort: (amount: number) => string;
}

// Custom tooltip styles for better visibility
const tooltipStyle = {
  backgroundColor: '#374151',
  border: '1px solid #e07742',
  borderRadius: '8px',
  padding: '10px',
  color: '#ffffff',
  fontSize: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
};

const tooltipLabelStyle = {
  color: '#e07742',
  fontWeight: 'bold',
  marginBottom: '4px'
};

const tooltipItemStyle = {
  color: '#ffffff',
  padding: '2px 0'
};

// Custom label renderer for pie charts with visible styling
const renderCustomLabel = ({ percent, cx, cy, midAngle, innerRadius, outerRadius }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="10"
      fontWeight="bold"
      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const COLORS = {
  traditional: '#f9c9a7',
  flownetics: '#9d92e5',
  savings: '#8dd99e',
  fees: '#c49de3',
  investment: '#f4a582',
  accent1: '#7b6fd9',
  accent2: '#6ec97a'
};

export function ROICharts({
  currencySymbol,
  partA_INR,
  partBC_INR,
  interestRefundableINR,
  savingsRmPerAnnumINR,
  flowneticsFeesPerYearINR,
  formatMoneyShort
}: ROIChartsProps) {

  const investmentBreakdownData = [
    { name: 'Part A (Equipment)', value: parseFloat(formatMoneyShort(partA_INR)), color: COLORS.traditional },
    { name: 'Part B+C (Setup)', value: parseFloat(formatMoneyShort(partBC_INR)), color: COLORS.flownetics },
    { name: 'Interest (3y)', value: parseFloat(formatMoneyShort(interestRefundableINR)), color: COLORS.fees }
  ];

  const savingsBreakdownData = [
    { name: 'Total Savings', value: parseFloat(formatMoneyShort(savingsRmPerAnnumINR)), color: COLORS.savings },
    { name: 'FaaS Fees', value: parseFloat(formatMoneyShort(flowneticsFeesPerYearINR)), color: COLORS.fees }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700 shadow-xl">
      <div className="space-y-3 sm:space-y-4">
        {/* Investment Breakdown */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-bold text-white mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-gradient-to-b from-brand-orange to-brand-purple rounded-full"></div>
            Investment Breakdown
          </h4>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={investmentBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={45}
                fill="#8884d8"
                dataKey="value"
              >
                {investmentBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${currencySymbol} ${value}`, name]}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
                contentStyle={tooltipStyle}
              />
              <Legend
                verticalAlign="bottom"
                height={30}
                wrapperStyle={{
                  fontSize: '10px',
                  color: '#9ca3af',
                  paddingTop: '6px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Annual Savings Split */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-bold text-white mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-gradient-to-b from-brand-green to-brand-purple rounded-full"></div>
            Annual Savings Split
          </h4>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={savingsBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={45}
                fill="#8884d8"
                dataKey="value"
              >
                {savingsBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${currencySymbol} ${value}`, name]}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
                contentStyle={tooltipStyle}
              />
              <Legend
                verticalAlign="bottom"
                height={30}
                wrapperStyle={{
                  fontSize: '10px',
                  color: '#9ca3af',
                  paddingTop: '6px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
