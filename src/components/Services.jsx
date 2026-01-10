// src/components/Services.jsx
// src/components/Services.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Search,
  Plus,
  ShoppingCart,
  Sparkles,
  Trash2,
  UserPlus,
  X,
  ChevronRight,
} from "lucide-react";
import Invoice from "./Invoice";


export default function Services() {
  // ================= PRODUCTS =================
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "https://api.digicopy.in";


  // ================= CART =================
  const [cart, setCart] = useState([]);
  const [totals, setTotals] = useState({ netTotal: 0 });
  const [lastTransaction, setLastTransaction] = useState(null);

  // ================= CUSTOMERS =================
  const [customers, setCustomers] = useState([]);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // ================= QUICK ADD =================
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddName, setQuickAddName] = useState("");
  const [quickAddMobile, setQuickAddMobile] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
const [invoiceData, setInvoiceData] = useState(null);
const [showSuccessToast, setShowSuccessToast] = useState(false);



  const dropdownRef = useRef(null);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch(`${API_URL}/api/products`);
        setProducts(await prodRes.json());

        const custRes = await fetch(`${API_URL}/api/customers`);
        const custData = await custRes.json();
        setCustomers(custData);
        setFilteredCustomers(custData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // ================= FILTER CUSTOMERS =================
  useEffect(() => {
    if (!customerSearchQuery) {
      setFilteredCustomers(customers);
    } else {
      setFilteredCustomers(
        customers.filter(
          (c) =>
            c.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
            c.mobile.includes(customerSearchQuery)
        )
      );
    }
  }, [customerSearchQuery, customers]);

  // ================= AUTO TOTAL CALCULATION =================
  useEffect(() => {
    const netTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotals({ netTotal });
  }, [cart]);

  // ================= CART HELPERS =================
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updatePages = (id, pages) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: pages < 1 ? 1 : pages }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ================= CUSTOMER SELECT =================
  const handleCustomerSelect = (customer) => {
    setSelectedCustomerId(customer.id);
    setSelectedCustomer(customer);
    setIsCustomerDropdownOpen(false);
  };

  const clearCustomerSelection = () => {
    setSelectedCustomerId("");
    setSelectedCustomer(null);
    setCustomerSearchQuery("");
  };

  // ================= QUICK ADD CUSTOMER =================
  const handleQuickAdd = async () => {
  if (!quickAddName || !quickAddMobile) {
    alert("Name and mobile are required");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/customers/admin-add`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: quickAddName, mobile: quickAddMobile }),
});

const text = await res.text();

let data;
try {
  data = JSON.parse(text);
} catch {
  console.error("Non-JSON response:", text);
  throw new Error("Server error (not JSON)");
}

if (!res.ok) {
  throw new Error(data.message || "Failed to add customer");
}


    alert(`Customer added.\nDefault password: ${data.defaultPassword}`);

    setQuickAddName("");
    setQuickAddMobile("");
    setShowQuickAdd(false);

  } catch (err) {
    console.error("Quick add error:", err);
    alert(err.message);
  }
};


  // ================= CHECKOUT =================
 const handleCheckoutInitiation = async () => {
  if (!selectedCustomer) {
    alert("Please select a customer first");
    return;
  }

  // Build invoice data
  const invoice = {
    billNo: `INV-${Date.now()}`,
    date: new Date().toLocaleString(),
    customer: {
      name: selectedCustomer.name,
      mobile: selectedCustomer.mobile,
    },
    items: cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    })),
    subTotal: totals.netTotal,
    finalAmount: totals.netTotal,
    customerPrintCount: cart.find(i => i.name.toLowerCase() === "xerox")?.quantity || 0,
    freeCopiesSnapshot: selectedCustomer.xerox_free_pages || 0,
  };

  // Show invoice popup immediately
  setInvoiceData(invoice);
  setShowInvoice(true);

  try {
    const res = await fetch(`${API_URL}/api/transactions/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: selectedCustomer.id,
        customerMobile: selectedCustomer.mobile,
        items: cart,
        total: totals.netTotal,
        invoiceNumber: invoice.billNo,
        date: invoice.date,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Transaction save failed:", data);
      alert(data.message || "Failed to save transaction");
    } else {
      console.log("Transaction saved successfully:", data);

      // ===== UPDATE CUSTOMER LOYALTY LOCALLY =====
      const xeroxItem = cart.find(i => i.name.toLowerCase() === "xerox");
      const xeroxPages = xeroxItem ? xeroxItem.quantity : 0;

      setSelectedCustomer((prev) => {
        const totalTaken = (prev.xerox_total_taken || 0) + xeroxPages;
        const freePagesEarned = Math.floor(totalTaken / 1000) * (prev.xerox_cycle_bonus || 100);
        const remainingPages = Math.max(1000 - totalTaken % 1000, 0);

        return {
          ...prev,
          points_balance: (prev.points_balance || 0) + Math.floor(totals.netTotal / 10), // example: 1 pt per ₹10
          xerox_total_taken: totalTaken,
          xerox_free_pages: freePagesEarned,
          xerox_cycle_total: 1000,
          xerox_cycle_bonus: prev.xerox_cycle_bonus || 100,
          xerox_remaining_pages: remainingPages,
        };
      });
    }
  } catch (err) {
    console.error("Error saving transaction:", err);
    alert("Error saving transaction to database");
  }

  // Clear cart
  setCart([]);
  setTotals({ netTotal: 0 });
};


  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6 p-4 lg:p-6 bg-slate-100 relative font-sans">
      {/* LEFT CATALOG */}
      <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-3 font-bold text-slate-800">
            <Globe size={20} className="text-indigo-600" />
            SERVICES & ITEMS
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search (e.g. CCTV, Pan Card)"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {products
            .filter((p) =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="p-3 border rounded-xl cursor-pointer flex justify-between"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50">
                    <span className="text-indigo-600 font-bold">
                      {product.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-xs">₹{product.price}</p>
                  </div>
                </div>
                <Plus size={18} />
              </div>
            ))}
        </div>
      </div>


      {/* BILL SECTION */}
      <div className="flex-1 bg-white rounded-2xl border flex flex-col">
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-bold flex gap-2">
            <ShoppingCart size={18} /> Current Bill
          </h2>
          <button
            disabled={cart.length === 0}
            className="text-xs border px-3 py-1 rounded"
          >
            <Sparkles /> AI Bonus
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
  {cart.length === 0 ? (
    <div className="text-center text-gray-400">Cart is empty</div>
  ) : (
    cart.map((item) => (
      <div
        key={item.id}
        className="p-4 border rounded-xl mb-3 bg-slate-50"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">{item.name}</p>
            <p className="text-xs text-slate-500">
              ₹{item.price} / page
            </p>
          </div>

          {/* PAGE CONTROLS */}
{/* PAGE CONTROLS + DELETE */}
<div className="flex items-center gap-3">
  <input
    type="number"
    min="1"
    className="w-20 text-center font-bold border rounded-lg py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
    value={item.quantity}
    onChange={(e) =>
      updatePages(item.id, Number(e.target.value) || 1)
    }
  />

  <button
    onClick={() => removeFromCart(item.id)}
    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
    title="Remove item"
  >
    <Trash2 size={18} />
  </button>
</div>


        </div>

        <div className="flex justify-between mt-2 text-sm font-semibold">
          <span>₹{item.price} × {item.quantity}</span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      </div>
    ))
  )}
</div>

        <div className="p-4 border-t">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totals.netTotal}</span>
          </div>
        </div>
      </div>

      {/* CUSTOMER PROFILE */}
      <div className="w-full lg:w-1/3 flex flex-col">
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full relative">

    {/* ================= TOP CONTENT ================= */}
    <div className="flex-1">

      {/* HEADER */}
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex justify-between items-center">
        <span>Customer Profile</span>
        <button
          onClick={() => setShowQuickAdd(true)}
          className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-100 flex items-center gap-1 hover:bg-indigo-100"
        >
          <UserPlus size={12} /> Add New
        </button>
      </h3>

      {/* QUICK ADD */}
      {showQuickAdd && (
        <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-indigo-200 animate-fadeIn">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-indigo-800">
              Quick Register
            </span>
            <X
              size={14}
              className="text-slate-400 cursor-pointer"
              onClick={() => setShowQuickAdd(false)}
            />
          </div>

          <input
            className="w-full text-sm p-2 rounded border mb-2"
            placeholder="Customer Name"
            value={quickAddName}
            onChange={(e) => setQuickAddName(e.target.value)}
          />
          <input
            className="w-full text-sm p-2 rounded border mb-2"
            placeholder="Mobile Number"
            value={quickAddMobile}
            onChange={(e) => setQuickAddMobile(e.target.value)}
          />

          <button
            onClick={handleQuickAdd}
            className="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded hover:bg-indigo-700"
          >
            Save & Select
          </button>
        </div>
      )}

      {/* SEARCH */}
      <div className="relative mb-4" ref={dropdownRef}>
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <Search className="ml-3 text-slate-400" size={18} />
          <input
            type="text"
            className="w-full p-3 bg-transparent outline-none text-sm font-medium"
            placeholder="Search Customer (Name / Mobile)"
            value={customerSearchQuery}
            onChange={(e) => {
              setCustomerSearchQuery(e.target.value);
              setIsCustomerDropdownOpen(true);
              if (!e.target.value) setSelectedCustomerId("");
            }}
            onFocus={() => setIsCustomerDropdownOpen(true)}
          />
          {selectedCustomerId && (
            <button
              onClick={clearCustomerSelection}
              className="p-2 text-slate-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* DROPDOWN */}
        {isCustomerDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border max-h-60 overflow-y-auto z-50">
            {filteredCustomers.length ? (
              filteredCustomers.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleCustomerSelect(c)}
                  className="p-3 hover:bg-indigo-50 cursor-pointer border-b last:border-0"
                >
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-xs text-slate-500 font-mono">{c.mobile}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-slate-400 text-xs">
                No customers found
              </div>
            )}
          </div>
        )}
      </div>

      {/* SELECTED CUSTOMER */}
     
  {/* ================= SELECTED CUSTOMER PROFILE ================= */}
{/* ================= SELECTED CUSTOMER PROFILE ================= */}
{!selectedCustomer ? (
  <div className="text-center text-slate-400 py-12 border-2 border-dashed rounded-xl">
    Search customer to load <strong>Loyalty Wallet</strong>
  </div>
) : (
  <div className="flex flex-col gap-4">
  {/* CUSTOMER IDENTITY */}
  <div className="p-3 border rounded-xl bg-slate-50">
    <p className="text-sm font-bold text-slate-800">
      {selectedCustomer.name}
    </p>
    <p className="text-xs text-slate-500 font-mono">
      {selectedCustomer.mobile}
    </p>
  </div>

    {/* POINTS WALLET */}
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 rounded-xl flex justify-between items-center">
      <div>
        <p className="text-xs uppercase opacity-70">Points Wallet</p>
        <p className="text-2xl font-bold">{selectedCustomer.points_balance || 0} Pts</p>
      </div>
      <div className="px-2 py-1 border border-white/50 rounded text-xs uppercase">
        {selectedCustomer.tier || "Silver"}
      </div>
    </div>

    {/* XEROX LOYALTY */}
    <div className="p-3 border rounded-xl bg-white">
      <p className="text-xs font-bold mb-2">Xerox Loyalty (A4)</p>
      <div className="flex justify-between mb-2 text-sm">
        <div>
          <p className="font-bold">{selectedCustomer.xerox_total_taken || 0}</p>
          <p className="text-xs text-slate-500">Total Taken</p>
        </div>
        <div>
          <p className="font-bold">{selectedCustomer.xerox_free_pages || 0}</p>
          <p className="text-xs text-slate-500">Free Wallet</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-2 bg-indigo-500 rounded-full"
          style={{
            width: `${
              ((selectedCustomer.xerox_total_taken || 0) / 
               (selectedCustomer.xerox_cycle_total || 1000)) * 100
            }%`,
          }}
        />
      </div>

      <p className="text-xs text-center text-slate-400">
        Print{" "}
        {(selectedCustomer.xerox_cycle_total || 1000) - 
          (selectedCustomer.xerox_total_taken || 0)}{" "}
        more pages to unlock +{selectedCustomer.xerox_cycle_bonus || 100} FREE!
      </p>
    </div>
  </div>
)}
</div>

    {/* ================= BOTTOM BUTTON ================= */}
    <div className="mt-4 sticky bottom-0 lg:static bg-white pt-3">
      <div className="relative group">
        <button
          disabled={cart.length === 0}
          onClick={handleCheckoutInitiation}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between animate-slideUp"
        >
          <span className="flex flex-col items-start">
            <span className="text-xs opacity-70 uppercase mb-1">
              Print Bill
            </span>
            <span>₹{totals.netTotal.toLocaleString()}</span>
          </span>
          <span className="bg-white/20 p-2 rounded-lg">
            <ChevronRight size={24} />
          </span>
        </button>

        {/* TOOLTIP */}
        {cart.length === 0 && (
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Add items to cart
          </div>
        )}
      </div>
    </div>
{showInvoice && (
  <Invoice
    data={invoiceData}
    onClose={() => {
      setShowInvoice(false);
      setShowSuccessToast(true);

      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    }}
  />
)}
{showSuccessToast && (
  <div className="fixed top-6 right-6 z-50 animate-slideIn">
    <div className="bg-white border-l-4 border-green-500 shadow-xl rounded-xl px-4 py-3 flex items-center gap-3">
      <div className="bg-green-100 text-green-600 rounded-full p-2">
        ✓
      </div>
      <div>
        <p className="text-sm font-bold text-green-700">
          Transaction Successful
        </p>
        <p className="text-xs text-gray-500">
          Bill printed. Points updated.
        </p>
      </div>
    </div>
  </div>
)}




  </div>
</div>
</div>

  );
}
