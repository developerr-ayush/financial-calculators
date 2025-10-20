import { useCallback, useMemo, useState, useEffect } from "react";
import BasicTable from "./Table";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  getCurrency,
  getEstimatedReturns,
  getInflationAdjValue,
} from "../../util";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Import UI components
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Container } from "./ui/Container";

let StepUpSIPData = [
  {
    name: "amount",
    type: "number",
    label: "Monthly Investment",
  },
  {
    name: "stepUp",
    type: "number",
    label: "Annual Step-up %",
  },
  {
    name: "duration",
    type: "number",
    label: "Time Period",
  },
  {
    name: "rate",
    type: "number",
    label: "Expected return rate % (p.a)",
  },
  {
    name: "inflation",
    type: "number",
    label: "Enter Inflation Rate",
  },
];

let cols = ["Years", "Invested", "Interest", "Total Returns", "Present Value"];

export const StepUpSIP = () => {
  // Function to get initial data from URL params or defaults
  const getInitialData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      amount: parseInt(urlParams.get("amount")) || 5000,
      stepUp: parseInt(urlParams.get("stepUp")) || 10,
      duration: parseInt(urlParams.get("duration")) || 40,
      rate: parseInt(urlParams.get("rate")) || 15,
      inflation: parseInt(urlParams.get("inflation")) || 6,
    };
  };

  const [data, setData] = useState(getInitialData);
  const [activeTab, setActiveTab] = useState("chart"); // 'chart' or 'table'

  // Function to update URL parameters
  const updateURL = (newData) => {
    const urlParams = new URLSearchParams();
    Object.keys(newData).forEach((key) => {
      if (newData[key] && newData[key] !== "") {
        urlParams.set(key, newData[key]);
      }
    });
    const newURL = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({}, "", newURL);
  };

  // Function to calculate step-up SIP returns
  const getStepUpSIPReturns = useCallback(
    (monthlyInvestment, stepUpPercent, annualRate, years) => {
      let totalInvested = 0;
      let futureValue = 0;
      const monthlyRate = annualRate / 12 / 100;

      for (let year = 1; year <= years; year++) {
        // Calculate monthly investment for this year (with step-up)
        const currentYearMonthlyInvestment =
          monthlyInvestment * Math.pow(1 + stepUpPercent / 100, year - 1);

        // Total investment for this year
        const yearlyInvestment = currentYearMonthlyInvestment * 12;
        totalInvested += yearlyInvestment;

        // Calculate future value of this year's investments
        // Future value = PMT * [((1 + r)^n - 1) / r] * (1 + r)
        // Where:
        // PMT = monthly investment for this year
        // r = monthly rate
        // n = number of months left until end
        const monthsLeft = (years - year + 1) * 12;
        const yearFutureValue =
          currentYearMonthlyInvestment *
          ((Math.pow(1 + monthlyRate, monthsLeft) - 1) / monthlyRate) *
          (1 + monthlyRate);

        futureValue += yearFutureValue;
      }

      const totalReturns = futureValue - totalInvested;
      return {
        totalInvested: Math.round(totalInvested),
        totalReturns: Math.round(totalReturns),
        futureValue: Math.round(futureValue),
      };
    },
    []
  );

  // Function to generate chart data
  const getChartData = useCallback(
    (calcData) => {
      const { amount, stepUp, duration, rate, inflation } = calcData;
      const years = [];
      const investedAmounts = [];
      const totalReturns = [];
      const presentValues = [];

      for (let i = 1; i <= duration; i++) {
        years.push(`Year ${i}`);

        // Calculate cumulative data for this year
        const yearData = getStepUpSIPReturns(amount, stepUp, rate, i);
        const invested = yearData.totalInvested;
        const returns = yearData.totalReturns;
        const total = yearData.futureValue;
        const inflationAdjusted = getInflationAdjValue(total, inflation, i);

        investedAmounts.push(invested);
        totalReturns.push(total);
        presentValues.push(total - inflationAdjusted);
      }

      return {
        labels: years,
        datasets: [
          {
            label: "Invested Amount",
            data: investedAmounts,
            borderColor: "rgb(59, 130, 246)", // blue-500
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.3,
          },
          {
            label: "Total Returns",
            data: totalReturns,
            borderColor: "rgb(16, 185, 129)", // emerald-500
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.3,
          },
          {
            label: "Present Value",
            data: presentValues,
            borderColor: "rgb(245, 101, 101)", // red-400
            backgroundColor: "rgba(245, 101, 101, 0.1)",
            tension: 0.3,
          },
        ],
      };
    },
    [getStepUpSIPReturns]
  );

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(148, 163, 184)", // slate-400
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Step-up SIP Investment Growth Over Time",
        color: "rgb(148, 163, 184)", // slate-400
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgb(148, 163, 184)", // slate-400
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)", // slate-400 with opacity
        },
      },
      y: {
        ticks: {
          color: "rgb(148, 163, 184)", // slate-400
          callback: function (value) {
            return "₹" + (value / 100000).toFixed(0) + "L";
          },
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)", // slate-400 with opacity
        },
      },
    },
  };

  const calculationResults = useMemo(() => {
    return getStepUpSIPReturns(
      data.amount,
      data.stepUp,
      data.rate,
      data.duration
    );
  }, [data, getStepUpSIPReturns]);

  const totalInv = calculationResults.totalInvested;
  const estdReturn = calculationResults.totalReturns;
  const totalVal = calculationResults.futureValue;

  const presentVal = useMemo(() => {
    let inflationAdjusted = getInflationAdjValue(
      totalVal,
      data.inflation,
      data.duration
    );
    return totalVal - inflationAdjusted;
  }, [data, totalVal]);

  const [rows, setRows] = useState([]);

  // Function to calculate table data
  const calculateTableData = useCallback(
    (calcData) => {
      let { amount, stepUp, duration, rate, inflation } = calcData;
      let temp = [];

      for (let i = 1; i <= duration; i++) {
        let yearData = getStepUpSIPReturns(amount, stepUp, rate, i);
        let invested = yearData.totalInvested;
        let interest = yearData.totalReturns;
        let totalReturns = yearData.futureValue;
        let inflationAdjusted = getInflationAdjValue(
          totalReturns,
          inflation,
          i
        );

        temp.push([
          i,
          getCurrency(invested),
          getCurrency(interest),
          getCurrency(totalReturns),
          getCurrency(totalReturns - inflationAdjusted),
        ]);
      }
      return temp;
    },
    [getStepUpSIPReturns]
  );

  const handleChange = (e) => {
    // make sure input is number
    if (isNaN(e.target.value)) {
      return;
    }
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
    updateURL(newData);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // Recalculate table data if needed
      setRows(calculateTableData(data));
    },
    [data, calculateTableData]
  );

  // Auto-calculate table data when component mounts or data changes
  useEffect(() => {
    setRows(calculateTableData(data));
  }, [data, calculateTableData]);

  // Memoize chart data to prevent unnecessary re-renders
  const chartData = useMemo(() => getChartData(data), [data, getChartData]);

  // Update URL when data changes
  useEffect(() => {
    updateURL(data);
  }, [data]);

  return (
    <Container size="xl" className="pt-8">
      <div
        className={`grid grid-cols-1 ${
          rows.length > 0 ? "lg:grid-cols-3" : "lg:grid-cols-1"
        } gap-8`}
      >
        {/* Input Form */}
        <Card className="sticky top-24">
          <CardHeader className="text-center">
            <CardTitle>Step-up SIP Calculator</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {StepUpSIPData.map((item) => (
                <Input
                  key={item.name}
                  label={item.label}
                  type={item.type}
                  id={item.name}
                  name={item.name}
                  value={data[item.name]}
                  step={item.name === "amount" ? 100 : 1}
                  onChange={handleChange}
                  placeholder={`Enter ${item.label.toLowerCase()}`}
                  required
                />
              ))}

              <Button type="submit" className="w-full">
                Calculate
              </Button>
            </form>

            {/* Summary */}
            {rows.length > 0 && (
              <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
                <h4 className="font-medium text-white mb-3">
                  Investment Summary
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-slate-400">Invested Amount</p>
                    <p className="font-semibold text-green-400">
                      {getCurrency(totalInv)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-slate-400">Estimated Returns</p>
                    <p className="font-semibold text-green-400">
                      {getCurrency(estdReturn)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-slate-400">Total Value</p>
                    <p className="font-semibold text-green-400">
                      {getCurrency(totalVal)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-slate-400">Present Value</p>
                    <p className="font-semibold text-green-400">
                      {getCurrency(presentVal)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {rows.length > 0 && (
          <Card className="lg:col-span-2">
            <CardContent className="p-0">
              {/* Tab Navigation */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab("chart")}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === "chart"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  📊 Chart
                </button>
                <button
                  onClick={() => setActiveTab("table")}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === "table"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  📋 Table
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "chart" ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">
                      Investment Growth
                    </h3>
                    <Line data={chartData} options={chartOptions} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">
                      Year-by-Year Breakdown
                    </h3>
                    <BasicTable cols={cols} rows={rows} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Container>
  );
};
