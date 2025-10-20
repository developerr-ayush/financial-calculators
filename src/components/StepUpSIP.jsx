import React, { useMemo, useState, useEffect } from "react";
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
  calculateStepUpSIPReturns,
  calculateStepUpSIPTotalInvested,
  generateStepUpSIPYearlyData,
} from "../../util";

import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Container } from "./ui/Container";
import { Tabs } from "./ui/Tabs";
import { FaChartLine, FaTable } from "react-icons/fa";

// Register ChartJS components once at module scope
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const STEP_UP_SIP_FIELDS = [
  {
    name: "amount",
    type: "number",
    label: "Initial Monthly Investment",
    step: 100,
    min: 500,
    max: 100000,
    placeholder: "Enter initial monthly investment amount",
  },
  {
    name: "stepUp",
    type: "number",
    label: "Annual Step-up %",
    step: 1,
    min: 0,
    max: 100,
    placeholder: "Enter annual increase percentage",
  },
  {
    name: "duration",
    type: "number",
    label: "Time Period (Years)",
    step: 1,
    min: 1,
    max: 50,
    placeholder: "Enter investment duration in years",
  },
  {
    name: "rate",
    type: "number",
    label: "Expected Return Rate % (p.a)",
    step: 0.1,
    min: 1,
    max: 30,
    placeholder: "Enter expected annual return rate",
  },
  {
    name: "inflation",
    type: "number",
    label: "Inflation Rate % (p.a)",
    step: 0.1,
    min: 0,
    max: 20,
    placeholder: "Enter expected inflation rate",
  },
];

const TABLE_COLUMNS = [
  "Year",
  "Invested Amount",
  "Returns",
  "Total Value",
  "Present Value",
];

// Helper functions for URL parameter handling
const getInitialData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const getParam = (key, defaultValue) => {
    const value = Number(urlParams.get(key));
    return Number.isFinite(value) ? value : defaultValue;
  };

  return {
    amount: getParam("amount", 5000),
    stepUp: getParam("stepUp", 10),
    duration: getParam("duration", 15),
    rate: getParam("rate", 12),
    inflation: getParam("inflation", 6),
  };
};

const buildURL = (data) => {
  const urlParams = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (Number.isFinite(value) && value > 0) {
      urlParams.set(key, String(value));
    }
  });
  return `${window.location.pathname}?${urlParams.toString()}`;
};

export const StepUpSIP = () => {
  const [data, setData] = useState(getInitialData);

  // Debounced URL sync
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.history.replaceState({}, "", buildURL(data));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [data]);

  // Calculate main aggregates using proper mathematical formulas
  const totalInvested = useMemo(
    () =>
      calculateStepUpSIPTotalInvested(data.amount, data.stepUp, data.duration),
    [data.amount, data.stepUp, data.duration]
  );

  const totalReturns = useMemo(
    () =>
      calculateStepUpSIPReturns(
        data.amount,
        data.stepUp,
        data.rate,
        data.duration
      ),
    [data.amount, data.stepUp, data.rate, data.duration]
  );

  const futureValue = useMemo(
    () => totalInvested + totalReturns,
    [totalInvested, totalReturns]
  );

  // Generate year-by-year data for table and charts
  const yearlyData = useMemo(
    () =>
      generateStepUpSIPYearlyData(
        data.amount,
        data.stepUp,
        data.rate,
        data.duration,
        data.inflation
      ),
    [data.amount, data.stepUp, data.rate, data.duration, data.inflation]
  );

  // Format table rows
  const tableRows = useMemo(() => {
    return yearlyData.map((yearData) => [
      yearData.year,
      getCurrency(yearData.investedAmount),
      getCurrency(yearData.returns),
      getCurrency(yearData.futureValue),
      getCurrency(yearData.presentValue),
    ]);
  }, [yearlyData]);

  // Chart data for line chart
  const chartData = useMemo(() => {
    const labels = yearlyData.map((yearData) => `Year ${yearData.year}`);
    const investedAmounts = yearlyData.map(
      (yearData) => yearData.investedAmount
    );
    const totalValues = yearlyData.map((yearData) => yearData.futureValue);
    const presentValues = yearlyData.map((yearData) => yearData.presentValue);

    return {
      labels,
      datasets: [
        {
          label: "Invested Amount",
          data: investedAmounts,
          borderColor: "rgb(59, 130, 246)", // blue-500
          backgroundColor: "rgba(59, 130, 246, 0.05)",
          fill: false,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: "rgb(59, 130, 246)",
          pointBorderColor: "rgb(59, 130, 246)",
          pointBorderWidth: 2,
        },
        {
          label: "Total Value",
          data: totalValues,
          borderColor: "rgb(16, 185, 129)", // emerald-500
          backgroundColor: "rgba(16, 185, 129, 0.05)",
          fill: false,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: "rgb(16, 185, 129)",
          pointBorderColor: "rgb(16, 185, 129)",
          pointBorderWidth: 2,
        },
        {
          label: "Present Value",
          data: presentValues,
          borderColor: "rgb(245, 101, 101)", // red-400
          backgroundColor: "rgba(245, 101, 101, 0.05)",
          fill: false,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: "rgb(245, 101, 101)",
          pointBorderColor: "rgb(245, 101, 101)",
          pointBorderWidth: 2,
        },
      ],
    };
  }, [yearlyData]);

  // Chart options
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw;
              return `${context.dataset.label}: ${getCurrency(value)}`;
            },
          },
        },
      },
      scales: {
        x: {
          display: true,
          grid: { display: false },
          ticks: {
            color: "rgb(148, 163, 184)", // slate-400
            font: { size: 11 },
            maxRotation: 0,
          },
          border: { display: false },
        },
        y: {
          display: true,
          grid: { color: "rgba(148, 163, 184, 0.08)", drawBorder: false },
          ticks: {
            color: "rgb(148, 163, 184)",
            font: { size: 11 },
            callback: (value) => getCurrency(value),
            padding: 10,
          },
          border: { display: false },
        },
      },
      elements: {
        point: { hoverRadius: 8 },
        line: { borderWidth: 2 },
      },
      interaction: { intersect: false, mode: "index" },
    }),
    []
  );

  // Input change handler with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const field = STEP_UP_SIP_FIELDS.find((f) => f.name === name);
    const numValue = Number(value);

    if (!Number.isFinite(numValue)) return;

    // Apply min/max constraints
    const clampedValue = Math.max(
      field?.min ?? 0,
      Math.min(field?.max ?? Infinity, numValue)
    );

    setData((prevData) => ({
      ...prevData,
      [name]: clampedValue,
    }));
  };

  return (
    <Container size="xl" className="pt-8">
      <div
        className={`grid grid-cols-1 ${
          tableRows.length ? "lg:grid-cols-3" : "lg:grid-cols-1"
        } gap-8`}
      >
        {/* Input Form */}
        <Card className="sticky top-24">
          <CardHeader className="text-center">
            <CardTitle>Step-up SIP Calculator</CardTitle>
            <p className="text-sm text-slate-400 mt-2">
              Calculate returns for SIP with annual investment increases
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {STEP_UP_SIP_FIELDS.map((field) => (
                <Input
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={data[field.name]}
                  step={field.step}
                  min={field.min}
                  max={field.max}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  required
                />
              ))}

              <Button type="button" className="w-full">
                Calculate Step-up SIP Returns
              </Button>
            </form>

            {/* Summary Cards */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300 text-sm">Total Invested</span>
                <span className="font-semibold text-blue-400">
                  {getCurrency(totalInvested)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300 text-sm">Total Returns</span>
                <span className="font-semibold text-green-400">
                  {getCurrency(totalReturns)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300 text-sm">Future Value</span>
                <span className="font-semibold text-emerald-400">
                  {getCurrency(futureValue)}
                </span>
              </div>
              {data.inflation > 0 && (
                <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300 text-sm">Present Value</span>
                  <span className="font-semibold text-orange-400">
                    {getCurrency(
                      yearlyData[data.duration - 1]?.presentValue || 0
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h4 className="text-sm font-medium text-blue-300 mb-2">
                How Step-up SIP Works
              </h4>
              <p className="text-xs text-slate-300">
                Your monthly investment increases by {data.stepUp}% each year.
                For example, if you start with ₹{getCurrency(data.amount)} and
                step-up is {data.stepUp}%, your investment becomes ₹
                {getCurrency(Math.round(data.amount * (1 + data.stepUp / 100)))}{" "}
                in year 2.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {tableRows.length > 0 && (
          <Card className="lg:col-span-2">
            <CardContent className="p-0">
              <Tabs
                defaultValue="chart"
                variant="primary"
                size="md"
                tabs={[
                  {
                    value: "chart",
                    label: "Chart",
                    icon: <FaChartLine />,
                    content: () => (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white">
                          Investment Growth Chart
                        </h3>
                        <div className="text-sm text-slate-400 mb-4">
                          Track how your step-up SIP grows over time with
                          compound interest
                        </div>
                        <div className="h-80 w-full">
                          <Line data={chartData} options={chartOptions} />
                        </div>
                      </div>
                    ),
                  },
                  {
                    value: "table",
                    label: "Table",
                    icon: <FaTable />,
                    content: () => (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white">
                          Year-by-Year Breakdown
                        </h3>
                        <div className="text-sm text-slate-400 mb-4">
                          Detailed breakdown showing cumulative principal,
                          returns, and present value for each year
                        </div>
                        <BasicTable cols={TABLE_COLUMNS} rows={tableRows} />
                      </div>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </Container>
  );
};
