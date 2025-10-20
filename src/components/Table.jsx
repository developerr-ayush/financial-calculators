import React from "react";

/* eslint-disable react/prop-types */

export default function BasicTable({ cols, rows }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto max-h-[570px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-slate-900/90 backdrop-blur-sm">
            <tr>
              {cols.map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider border-b border-slate-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-slate-700/30 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-700/20"
                }`}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-slate-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
