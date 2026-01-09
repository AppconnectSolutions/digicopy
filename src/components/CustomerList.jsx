import { useState, useEffect, useRef } from "react";
import { Users, Search, CheckCircle, MessageSquare, Upload } from "lucide-react";
import html2canvas from "html2canvas";
import Invoice from "./Invoice";
import { createRoot } from "react-dom/client";

export default function CustomerList({ sentSmsId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [sendingInvoice, setSendingInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const invoiceRef = useRef(null);
  const API_URL = process.env.REACT_APP_API_URL || "https://api.digicopy.in";

  /* ---------------- FETCH REWARDS ---------------- */
  const fetchRewards = async (mobile) => {
    try {
      const res = await fetch(`${API_URL}/api/transactions/customer/${mobile}`);
      const data = await res.json();

      const xeroxKey = Object.keys(data.rewards || {}).find(
        (k) => k.trim().toLowerCase() === "xerox"
      );

      const xerox = xeroxKey ? data.rewards[xeroxKey] : {};

      return {
        printCount: Number(xerox.total) || 0,
        free: Number(xerox.free) || 0,
        remaining: Number(xerox.remaining) || 0,
        latestTransaction: data.latestTransaction || null,
      };
    } catch (err) {
      console.error(err);
      return {
        printCount: 0,
        free: 0,
        remaining: 0,
        latestTransaction: null,
      };
    }
  };

  /* ---------------- FETCH CUSTOMERS ---------------- */
  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/customers`);
      const data = await res.json();

      const enriched = await Promise.all(
        data.map(async (c) => {
          const rewards = await fetchRewards(c.mobile);
          return { ...c, ...rewards };
        })
      );

      setCustomers(enriched);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  /* ---------------- CSV UPLOAD ---------------- */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch(`${API_URL}/api/customers/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message || "Upload successful");
      fetchCustomers();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  /* ---------------- DOWNLOAD INVOICE IMAGE ---------------- */
  const downloadInvoiceImage = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = "invoice.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  

  /* ---------------- OPEN WHATSAPP ---------------- */
  const openWhatsApp = (customer) => {
    let phone = customer.mobile.replace(/\D/g, "");
    if (phone.length === 10) phone = "91" + phone;

    const text = encodeURIComponent(
      `Hi ${customer.name}, your invoice is ready.\nPlease find the attached bill.`
    );

    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };



const notifyCustomer = async (customer) => {
  const invoice = {
    billNo: customer.billNo || "N/A",
    date: new Date().toLocaleDateString(),
    items: customer.items || [],
    subTotal: customer.subTotal || 0,
    finalAmount: customer.finalAmount || 0,
    customerPrintCount: customer.printCount || 0,
  };

  // Create a detached container
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-10000px";
  container.style.left = "-10000px";
  container.style.width = "380px";
  container.style.background = "white";
  document.body.appendChild(container);

  // Render Invoice into it
  const root = createRoot(container);
  root.render(<Invoice data={invoice} />);

  // Wait for DOM to settle
 await new Promise((resolve) => {
  const check = () => {
    if (container.innerText.trim().length > 0) {
      resolve();
    } else {
      requestAnimationFrame(check);
    }
  };
  check();
});

  // Capture with html2canvas
  // Capture with html2canvas
const canvas = await html2canvas(container, {
  scale: 2,
  backgroundColor: "#ffffff",
  useCORS: true,
});

root.unmount();
document.body.removeChild(container);

// ✅ Reliable blob conversion
const dataUrl = canvas.toDataURL("image/png");
const blob = await (await fetch(dataUrl)).blob();

if (!blob) {
  alert("Failed to generate invoice image.");
  return;
}

  const formData = new FormData();
  formData.append("file", blob, "invoice.png");

  const res = await fetch(`${API_URL}/api/invoices/upload`, {
    method: "POST",
    body: formData,
  });

  const { url } = await res.json();

  let phone = customer.mobile.replace(/\D/g, "");
  if (phone.length === 10) phone = "91" + phone;

  const text = encodeURIComponent(
    `Hi ${customer.name}, your invoice is ready.\nView it here: ${url}`
  );

  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
};



  

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      {/* HEADER */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h3 className="font-bold flex items-center gap-2">
          <Users size={20} /> Customer Database
        </h3>

        <div className="flex gap-3">
          <label className="bg-indigo-600 text-white px-3 py-2 rounded cursor-pointer text-sm">
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload CSV"}
            <input type="file" hidden accept=".csv" onChange={handleUpload} />
          </label>

          <input
            className="border px-3 py-2 rounded text-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Mobile</th>
            <th className="px-6 py-3 text-center">Prints</th>
            <th className="px-6 py-3 text-center">Free</th>
            <th className="px-6 py-3 text-center">Remaining</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {customers
            .filter(
              (c) =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.mobile.includes(searchTerm)
            )
            .map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-6 py-3 font-bold">{c.name}</td>
                <td className="px-6 py-3">{c.mobile}</td>
                <td className="px-6 py-3 text-center">{c.printCount}</td>
                <td className="px-6 py-3 text-center">{c.free}</td>
                <td className="px-6 py-3 text-center">{c.remaining}</td>
                <td className="px-6 py-3 text-right">
                  <button
  onClick={() => notifyCustomer(c)}
  className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded text-xs"
>
  <MessageSquare size={14} /> Notify
</button>

                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* HIDDEN INVOICE */}
      <div
        ref={invoiceRef}
        style={{
          position: "fixed",
          top: "-10000px",
          left: "-10000px",
          width: "380px",
          background: "white",
        }}
      >
        {invoiceData && <Invoice data={invoiceData} />}
      </div>
    </div>
  );
}
