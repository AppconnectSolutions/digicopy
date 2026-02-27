import { useEffect, useMemo, useState } from "react";
import { Users, TrendingUp, Coins, AlertCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [todayProducts, setTodayProducts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [dailyChart, setDailyChart] = useState([]);
const storedUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
const isHR =
  storedUser?.email &&
  storedUser.email.trim().toLowerCase() ===
    "hr@appconnectsolutions.com";
  // ✅ Backup UI state
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [backupBusy, setBackupBusy] = useState(false);
  const [backupErr, setBackupErr] = useState("");
  const [backupLast, setBackupLast] = useState(null);
  const [backupNext, setBackupNext] = useState(null);
  const [backupError, setBackupError] = useState(null);
const [backupSuccess, setBackupSuccess] = useState(false);


  const totalProductsSoldToday = useMemo(() => {
    return todayProducts.reduce((sum, p) => sum + Number(p.qty || 0), 0);
  }, [todayProducts]);

  /* ================= LOAD DASHBOARD ================= */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // 1) Dashboard summary
        const res = await fetch(`${API_URL}/api/dashboard/summary`);
        const json = await res.json();

        setStats(json.stats || {});
        setTodayProducts(json.todayProducts || []);
        setRecentTransactions(json.recentTransactions || []);

        // 2) Chart (if you use it)
        const chartRes = await fetch(`${API_URL}/api/dashboard/chart/daily`);
        const chartJson = await chartRes.json();
        setDailyChart(chartJson || []);

        // 3) ✅ Backup status
        const bRes = await fetch(`${API_URL}/api/backup/status`);
        const bJson = await bRes.json();

       setBackupEnabled(!!bJson?.enabled);
setBackupLast(bJson?.last_backup_at || null);
setBackupNext(bJson?.next_backup_at || null);
setBackupError(bJson?.last_backup_error || null);
setBackupSuccess(!!bJson?.last_backup_successful);

      } catch (err) {
        console.error("Dashboard load error:", err);
        setBackupErr("Failed to load dashboard / backup status");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

 const refreshBackupStatus = async () => {
  const st = await fetch(`${API_URL}/api/backup/status`);
  const sj = await st.json();

  setBackupEnabled(!!sj?.enabled);
  setBackupLast(sj?.last_backup_at || null);
  setBackupNext(sj?.next_backup_at || null);
  setBackupError(sj?.last_backup_error || null);
  setBackupSuccess(!!sj?.last_backup_successful);
};
console.log("USER OBJECT:", storedUser);
console.log("EMAIL:", storedUser?.email);  const onToggleBackup = async () => {
    if (backupBusy) return;

    const next = !backupEnabled;

    setBackupBusy(true);
    setBackupErr("");
    setBackupEnabled(next); // optimistic UI

    try {
      const res = await fetch(`${API_URL}/api/backup/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: next }),
      });

      const data = await res.json();
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.message || "Backup setting update failed");
      }

      await refreshBackupStatus();
    } catch (e) {
      setBackupEnabled(!next); // revert
      setBackupErr(e?.message || "Failed to update backup setting");
    } finally {
      setBackupBusy(false);
    }
  };

  const onRunBackupNow = async () => {
    if (backupBusy) return;

    setBackupBusy(true);
    setBackupErr("");

    try {
      const res = await fetch(`${API_URL}/api/backup/run`, { method: "POST" });
      const data = await res.json();
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.message || "Backup run failed");
      }

      await refreshBackupStatus();
    } catch (e) {
      setBackupErr(e?.message || "Backup run failed");
    } finally {
      setBackupBusy(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading dashboard…</div>;
  }

  return (
    <div
      id="dashboard-root"
      className="p-4 sm:p-6 space-y-6 bg-slate-100 min-h-screen"
    >
      {/* ================= HEADER ================= */}
<div className="flex items-start justify-between gap-4">
  <div>
    <h2 className="text-2xl font-bold text-gray-800">Owner Dashboard</h2>
    <p className="text-sm text-gray-500">Daily business overview</p>
  </div>

  {isHR && (
    <div className="flex flex-col items-end gap-2">
     <BackupToggle
  enabled={backupEnabled}
  busy={backupBusy}
  onToggle={onToggleBackup}
  backupLast={backupLast}
  backupNext={backupNext}
  backupError={backupError}
  backupSuccess={backupSuccess}
/>


      <div className="text-xs text-gray-500 text-right leading-5">
        <div>
          Last: {backupLast ? new Date(backupLast).toLocaleString() : "-"}
        </div>
        <div>
          Next: {backupNext ? new Date(backupNext).toLocaleString() : "-"}
        </div>
      </div>

      <button
        onClick={onRunBackupNow}
        disabled={backupBusy}
        className="text-xs px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-60"
      >
        Run backup now
      </button>

      {backupErr && (
        <div className="text-xs text-red-600 flex items-center gap-2">
          <AlertCircle size={14} />
          <span>{backupErr}</span>
        </div>
      )}
    </div>
  )}
</div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers || 0}
          subtitle="Active customers"
          icon={<Users size={20} />}
          color="indigo"
        />

        <StatCard
          title="Today's Sales"
          value={`₹${Number(stats.todaySales || 0).toLocaleString()}`}
          subtitle={`${stats.todayTransactions || 0} transactions`}
          icon={<TrendingUp size={20} />}
          color="green"
        />

        <StatCard
          title="Products / Services Sold"
          value={totalProductsSoldToday}
          subtitle="Today"
          icon={<Coins size={20} />}
          color="blue"
        />

        <StatCard
          title="Net Revenue"
          value={`₹${Number(stats.todaySales || 0).toLocaleString()}`}
          subtitle="After offers"
          icon={<Coins size={20} />}
          color="blue"
        />
      </div>

      {/* ================= DAILY SALES CHART (optional) ================= */}
      {dailyChart?.length > 0 && (
        <div className="bg-white rounded-xl shadow border p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Daily Sales</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyChart}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ================= TODAY PRODUCT SALES ================= */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-800">Today’s Product Sales</h3>
            <p className="text-xs text-gray-500">{new Date().toDateString()}</p>
          </div>
          <span className="text-sm text-gray-600">{todayProducts.length} products</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-center">Qty</th>
                <th className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {todayProducts.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{p.product}</td>
                  <td className="px-6 py-3 text-center font-medium">{p.qty}</td>
                  <td className="px-6 py-3 text-right font-bold">
                    ₹{Number(p.amount || 0).toFixed(2)}
                  </td>
                </tr>
              ))}

              {todayProducts.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                    No sales today
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= RECENT TRANSACTIONS ================= */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3">Txn ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentTransactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-mono text-xs">#{t.id}</td>
                <td className="px-6 py-3">{t.customer_name}</td>
                <td className="px-6 py-3 text-right font-bold">₹{t.total_amount}</td>
              </tr>
            ))}

            {recentTransactions.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                  No transactions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ title, value, subtitle, icon, color }) {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${colors[color]}`}>{icon}</div>
      </div>
      <p className="text-xs text-gray-400 mt-2">{subtitle}</p>
    </div>
  );
}

/* ================= BACKUP TOGGLE ================= */
function BackupToggle({ enabled, busy, onToggle, backupLast, backupNext, backupError, backupSuccess }) {

  return (
    <div className="flex items-center gap-3">
   <div className="text-right">
  <p className="text-xs text-gray-500">Google Sheet Backup</p>
  <p className="text-sm font-semibold text-gray-800">{enabled ? "ON" : "OFF"}</p>

  {backupLast && (
    <p className="text-xs text-gray-600">
      Last backup: {new Date(backupLast).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
    </p>
  )}

  {backupNext && (
    <p className="text-xs text-gray-600">
      Next backup: {new Date(backupNext).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
    </p>
  )}

  {backupSuccess && (
    <p className="text-xs text-green-600">Last backup succeeded ✅</p>
  )}

  {backupError && (
    <p className="text-xs text-red-600">Error: {backupError}</p>
  )}
</div>



      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        disabled={busy}
        className={[
          "relative inline-flex h-6 w-11 items-center rounded-full transition",
          enabled ? "bg-green-600" : "bg-gray-300",
          busy ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-5 w-5 transform rounded-full bg-white transition",
            enabled ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
