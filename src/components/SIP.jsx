import { useCallback, useMemo, useState } from "react";
import BasicTable from "./Table";
import {
  getCurrency,
  getEstimatedReturns,
  getInflationAdjValue,
  getInvestedAmount,
} from "../../util";
let SIPData = [
  {
    name: "amount",
    type: "number",
    label: "Montly Investment",
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
export const SIP = () => {
  const [data, setData] = useState({
    amount: 5000,
    duration: 40,
    rate: 15,
    inflation: 6,
  });
  const estdReturn = useMemo(() => {
    return getEstimatedReturns(data.amount, data.rate, data.duration);
  }, [data]);
  const totalInv = useMemo(() => {
    return getInvestedAmount(data.amount, data.duration);
  }, [data]);
  const totalVal = useMemo(() => {
    return estdReturn + totalInv;
  }, [estdReturn, totalInv]);
  const presentVal = useMemo(() => {
    let inflationAdjusted = getInflationAdjValue(
      totalVal,
      data.inflation,
      data.duration
    );
    return totalVal - inflationAdjusted;
  }, [data, totalVal]);
  const [rows, setRows] = useState([]);
  const handleChange = (e) => {
    // make sure input is number
    if (isNaN(e.target.value)) {
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      let { amount, duration, rate, inflation } = data;
      let temp = [];
      for (let i = 1; i <= duration; i++) {
        let invested = amount * i * 12;
        let interest = getEstimatedReturns(amount, rate, i);
        let totalReturns = invested + interest;
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

      setRows(temp);
    },
    [data, totalVal]
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sticky top-4 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SIP Calculator
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {SIPData.map((item) => (
                  <div key={item.name}>
                    <input
                      type={item.type}
                      id={item.name}
                      name={item.name}
                      value={data[item.name]}
                      onChange={handleChange}
                      placeholder={item.label}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Show Me Magic
                </button>
              </form>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Invested Amount</span>
                  <span className="font-semibold text-green-400">
                    {getCurrency(totalInv)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Estimated Returns</span>
                  <span className="font-semibold text-green-400">
                    {getCurrency(estdReturn)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Total Value</span>
                  <span className="font-semibold text-green-400">
                    {getCurrency(totalVal)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Present Value</span>
                  <span className="font-semibold text-green-400">
                    {getCurrency(presentVal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {rows.length > 0 && (
            <div className="lg:col-span-2">
              <BasicTable cols={cols} rows={rows} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
