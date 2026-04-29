import React, { useEffect, useState } from "react";
import { TrendingUp, Activity, Clock } from "lucide-react";
import Layout from "../components/Layout";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Skeleton from "../components/common/Skeleton";

const revenueData = [
  { month: "Jan", value: 38 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 52 },
  { month: "Apr", value: 61 },
  { month: "May", value: 70 },
  { month: "Jun", value: 78 },
];

const patientGrowth = [12, 18, 24, 32, 40, 48];

const Analytics = React.memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Layout title="">
      <PageHeader
        title="Analytics"
        description="Track platform performance, patient growth and appointment trends across the healthcare network."
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Analytics", to: "/analytics" },
        ]}
      />
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <Card className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Revenue Trend</h2>
                <p className="text-sm text-slate-500">
                  Monthly revenue for the last six months.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
              ) : (
                <div className="h-64 w-full rounded-2xl bg-slate-100 p-4">
                  <div className="flex items-end h-full gap-2">
                    {revenueData.map((item) => (
                      <div
                        key={item.month}
                        className="flex-1 flex flex-col items-center justify-end gap-2"
                      >
                        <div
                          className="w-full rounded-t-xl bg-indigo-600 min-h-[20px]"
                          style={{ height: `${Math.max(item.value, 20)}%` }}
                        />
                        <span className="text-xs text-slate-600 font-medium">
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="space-y-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <div>
                <h2 className="text-lg font-semibold">Patient Growth</h2>
                <p className="text-sm text-slate-500">
                  New patients added weekly.
                </p>
              </div>
            </div>
            {loading ? (
              <Skeleton className="h-56 w-full rounded-2xl" />
            ) : (
              <div className="relative h-56 w-full rounded-2xl bg-gradient-to-br from-slate-100 to-white p-5">
                <svg viewBox="0 0 600 240" className="h-full w-full">
                  <polyline
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="4"
                    points={patientGrowth
                      .map(
                        (value, index) =>
                          `${100 + index * 80},${220 - value * 3}`,
                      )
                      .join(" ")}
                  />
                  {patientGrowth.map((value, index) => (
                    <circle
                      key={index}
                      cx={100 + index * 80}
                      cy={220 - value * 3}
                      r="6"
                      fill="#6366f1"
                    />
                  ))}
                </svg>
              </div>
            )}
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-5 w-5 text-emerald-500" />
              <h3 className="text-lg font-semibold">Live Metrics</h3>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 p-4 border border-emerald-100">
                <p className="text-sm text-slate-500">Current session volume</p>
                <p className="text-2xl font-bold text-emerald-600">320</p>
                <div className="flex items-center mt-2">
                  <Activity className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-xs text-emerald-600">Active now</span>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100">
                <p className="text-sm text-slate-500">Open appointments</p>
                <p className="text-2xl font-bold text-blue-600">18</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-xs text-blue-600">Next hour</span>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 p-4 border border-orange-100">
                <p className="text-sm text-slate-500">Average wait time</p>
                <p className="text-2xl font-bold text-orange-600">14 min</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-xs text-orange-600">Below target</span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-sky-500" />
              <h3 className="text-lg font-semibold">Insights</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Revenue up 12% compared to last month.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Patient onboarding increased by 8%.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Referral rates remain steady.</span>
              </li>
            </ul>
          </Card>
        </aside>
      </div>
    </Layout>
  );
});

Analytics.displayName = "Analytics";

export default Analytics;
