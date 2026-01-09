import { useState, useEffect } from "react";
import { LogOut, Gift, History, Receipt, Printer } from "lucide-react";
import Invoice from "./Invoice";

export default function CustomerDashboard({ loggedInCustomer, onLogout }) {
  const [myTransactions, setMyTransactions] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [rewards, setRewards] = useState({});
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "https://api.digicopy.in";


  useEffect(() => {
    const fetchTransactions = async () => {
      if (!loggedInCustomer?.mobile) return;

      try {
        const res = await fetch(
          `${API_URL}/api/transactions/customer/${loggedInCustomer.mobile}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch data");

        setMyTransactions(data.transactions || []);
        setRewards(data.rewards || {});
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    fetchTransactions();

    // ✅ Show popup if using default password
    if (loggedInCustomer?.isDefaultPassword) {
      setShowChangePasswordPopup(true);
    }
  }, [loggedInCustomer]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col">

        {/* HEADER */}
        <div className="bg-indigo-700 text-white p-6 rounded-b-3xl shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-indigo-200 text-xs uppercase font-bold">
                Welcome Back
              </p>
              <h1 className="text-2xl font-bold">
                {loggedInCustomer.name}
              </h1>
            </div>
            <button
              onClick={onLogout}
              className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
            >
              <LogOut size={18} />
            </button>
          </div>

          {/* WELCOME BONUS */}
          {loggedInCustomer.pointsBalance === 50 &&
            loggedInCustomer.visits === 0 && (
              <div className="mt-4 bg-indigo-800/50 p-3 rounded-xl flex items-center gap-3">
                <Gift size={16} />
                <div className="text-sm">
                  <p className="font-bold text-yellow-300">Welcome Bonus!</p>
                  <p className="text-xs text-indigo-100">
                    You got 50 points for joining.
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* DYNAMIC REWARDS */}
        <div className="p-6 -mt-4">
          {Object.keys(rewards).length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No rewards yet.</p>
          ) : (
            Object.entries(rewards).map(([productName, reward]) => {
              const pagesLeft = Math.max(reward.remaining, 0);
              return (
                <div key={productName} className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Printer size={18} className="text-green-600" />
                    <h3 className="font-bold text-green-700">
                      {productName.charAt(0).toUpperCase() + productName.slice(1)} Summary
                    </h3>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>Total Purchased: <strong>{reward.total}</strong></p>
                    <p>Free Items Earned: <strong>{reward.free}</strong></p>
                    <p>Remaining Free Items: <strong>{pagesLeft}</strong></p>
                  </div>
                  <p className="mt-3 text-xs text-green-800 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-3 rounded-xl text-center font-semibold shadow-sm">
                    {pagesLeft > 0
                      ? `🚀 Only ${pagesLeft} more to unlock ${reward.free_quantity} FREE items`
                      : `🎉 Reward unlocked! Enjoy your free items`}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* TRANSACTIONS */}
        <div className="flex-1 px-6 pb-6 overflow-y-auto">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <History size={18} className="text-indigo-600" />
            Transaction History
          </h3>

          {myTransactions.length === 0 ? (
            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed">
              <Receipt size={32} className="mb-2 opacity-20" />
              <p>No transactions yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myTransactions.map((txn) => (
                <div key={txn.transactionId} className="bg-white border rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">Bill #{txn.transactionId}</p>
                      <p className="text-xs text-gray-500">{new Date(txn.date).toLocaleString()}</p>
                    </div>
                    <span className="font-bold">₹{txn.totalAmount}</span>
                  </div>
                  <button
                    onClick={() => setSelectedInvoice(txn)}
                    className="w-full mt-3 py-2 text-indigo-600 text-xs font-bold border rounded hover:bg-indigo-50 flex items-center justify-center gap-2"
                  >
                    <Receipt size={14} />
                    View Digital Copy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* INVOICE MODAL */}
      {selectedInvoice && (
        <Invoice
          transaction={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}

      {/* ✅ DEFAULT PASSWORD POPUP */}
      {showChangePasswordPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-lg font-bold mb-4">Change Your Password</h2>
            <p className="mb-4">
              You are using the default password. For your security, please update it.
            </p>
            <button
              onClick={() => setShowChangePasswordPopup(false)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
