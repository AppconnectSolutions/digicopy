import React from "react";
import { Printer, Copy, Gift } from "lucide-react";

const Invoice = ({ data, onClose }) => {
  const transaction = data;
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full overflow-hidden flex flex-col max-h-[90vh]">

        {/* ACTION BAR */}
        <div className="bg-slate-100 p-3 border-b flex justify-between items-center no-print">
          <span className="font-bold text-slate-700 flex items-center gap-2 text-sm">
            <Printer size={16} /> Print Preview
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded transition-colors"
          >
            CLOSE
          </button>
        </div>

        {/* RECEIPT */}
        <div className="p-8 overflow-y-auto font-mono text-sm leading-relaxed bg-white text-black">
          <div className="text-center mb-6">
            <h1 className="text-xl font-extrabold tracking-wider border-b-2 border-black inline-block pb-1 mb-2">
              K.B. ONLINE WORLD
            </h1>
            <p className="text-[10px] uppercase tracking-wide font-bold">
              Digital Seva • One Stop Services
            </p>
            <p className="text-[9px] mt-1 text-gray-600">
              Xerox | Online Apps | CCTV | Mobile Acc.
            </p>
            <p className="text-[10px] mt-1">CSC ID: 665583460014</p>
          </div>

          <div className="flex justify-between text-xs mb-1">
            <span>
              BILL NO : <strong>{transaction.billNo}</strong>
            </span>
          </div>
          <div className="flex justify-between text-xs mb-4">
            <span>DATE : {transaction.date}</span>
          </div>

          <div className="border-t border-black mb-2" />

          {/* ITEMS */}
          <table className="w-full text-left mb-2 text-xs">
            <thead>
              <tr className="uppercase">
                <th className="py-1">Item</th>
                <th className="py-1 text-center">Qty</th>
                <th className="py-1 text-right">Amt</th>
              </tr>
            </thead>
            <tbody>
              {transaction.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-1 pr-2 truncate max-w-[120px]">
                    {item.name}
                  </td>
                  <td className="py-1 text-center">{item.quantity}</td>
                  <td className="py-1 text-right">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-black mb-2" />

          <div className="flex justify-between font-bold text-sm mb-1">
            <span>TOTAL AMOUNT</span>
            <span>₹{transaction.subTotal}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t-2 border-black border-dashed">
            <span>NET PAYABLE</span>
            <span>₹{transaction.finalAmount}</span>
          </div>

          {/* XEROX LOYALTY */}
          {transaction.customerPrintCount !== undefined && (
            <div className="mt-6 pt-3 border-t border-gray-300">
              <p className="text-center font-bold text-xs uppercase mb-2 border border-black rounded p-1">
                Xerox Loyalty (A4)
              </p>

              {(() => {
                const count = transaction.customerPrintCount || 0;
                const remainder = count % 1000;
                const remaining = remainder === 0 && count > 0 ? 0 : 1000 - remainder;
                const progress = (remainder / 1000) * 100;

                return (
                  <>
                    <div className="flex justify-between text-[9px] mb-1 font-bold text-gray-500">
                      <span>Cycle Progress</span>
                      <span>{remainder} / 1000</span>
                    </div>

                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-2 border border-gray-300">
                      <div
                        className="h-full bg-black transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="bg-gray-200 p-1.5 rounded text-center">
                      {remaining === 0 && count > 0 ? (
                        <div className="flex items-center justify-center gap-1 font-bold text-[10px]">
                          <Gift size={10} /> REWARD UNLOCKED!
                        </div>
                      ) : (
                        <p className="text-[10px] leading-tight text-gray-800">
                          Print{" "}
                          <span className="font-extrabold bg-black text-white px-1 rounded">
                            {remaining}
                          </span>{" "}
                          more pages to unlock{" "}
                          <span className="font-bold uppercase">
                            +100 FREE!
                          </span>
                        </p>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          <div className="mt-6 text-center text-[10px] space-y-1 opacity-80">
            <p>* Thank you for visiting K.B. Online World *</p>
            <p className="font-bold mt-3 text-xs">
              A.S Security System Partner
            </p>
          </div>
        </div>

        {/* PRINT BUTTON */}
        <div className="p-4 border-t no-print bg-slate-50">
          <button
            onClick={() => window.print()}
            className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-widest text-xs"
          >
            <Printer size={16} /> Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
