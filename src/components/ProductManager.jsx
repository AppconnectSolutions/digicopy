import { useState, useEffect } from "react";
import { Package, Plus, X, Save, Edit2, Trash2 } from "lucide-react";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, category: "general" });
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: "", price: 0, category: "general" });
const API_URL = process.env.REACT_APP_API_URL || "https://api.digicopy.in";

  // ================= FETCH ALL PRODUCTS ON MOUNT =================
 useEffect(() => {
    
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products?t=${Date.now()}`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  fetchProducts();
}, []);


  // ================= ADD NEW PRODUCT =================
  const handleSaveNew = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      setProducts((prev) => [...prev, data.product]);
      setNewProduct({ name: "", price: 0, category: "general" });
      setIsAdding(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ================= EDIT PRODUCT =================
  const startEdit = (p) => {
    setEditingId(p.id);
    setEditProduct({ ...p });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product");

      setProducts((prev) => prev.map((p) => (p.id === editingId ? data.product : p)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ================= DELETE PRODUCT =================
  const onDeleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <Package className="text-indigo-600" size={20} />
          <h3 className="font-bold text-gray-800">Product & Price Manager</h3>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
        >
          <Plus size={16} /> Add New Item
        </button>
      </div>

      {/* ADD NEW PRODUCT */}
      {isAdding && (
        <div className="p-4 bg-indigo-50 border-b border-indigo-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end animate-in slide-in-from-top-2">
          <input
            className="w-full px-3 py-2 border border-indigo-200 rounded-lg"
            placeholder="Item Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            className="w-full px-3 py-2 border border-indigo-200 rounded-lg"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          />
          <select
            className="w-full px-3 py-2 border border-indigo-200 rounded-lg"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            <option value="general">General</option>
            <option value="service">Service</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleSaveNew}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold text-sm"
            >
              Save
            </button>
            <button onClick={() => setIsAdding(false)} className="px-3 bg-white border rounded-lg">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* PRODUCTS TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price (₹)</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  {editingId === p.id ? (
                    <input
                      className="w-full px-2 py-1 border rounded"
                      value={editProduct.name}
                      onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                      autoFocus
                    />
                  ) : (
                    <span className="font-bold">{p.name}</span>
                  )}
                </td>
                <td className="px-6 py-3">
                  {editingId === p.id ? (
                    <select
                      className="w-full px-2 py-1 border rounded"
                      value={editProduct.category}
                      onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                    >
                      <option value="general">General</option>
                      <option value="service">Service</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${p.category === "service" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"}`}>
                      {p.category}
                    </span>
                  )}
                </td>
                <td className="px-6 py-3">
                  {editingId === p.id ? (
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border rounded"
                      value={editProduct.price}
                      onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                    />
                  ) : (
                    <span>₹{p.price}</span>
                  )}
                </td>
                <td className="px-6 py-3 text-right flex justify-end gap-2">
                  {editingId === p.id ? (
                    <>
                      <button onClick={saveEdit} className="p-2 bg-green-100 text-green-700 rounded-lg">
                        <Save size={16} />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-2 bg-gray-100 rounded-lg">
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(p)} className="p-2 text-indigo-600 rounded-lg">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => onDeleteProduct(p.id)} className="p-2 text-red-500 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
