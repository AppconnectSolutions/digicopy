import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

export default function OfferManagement() {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [freeQuantity, setFreeQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState(null); // Track editing offer
   const API_URL = process.env.REACT_APP_API_URL || "https://api.digicopy.in";

  // Fetch products & offers on mount
useEffect(() => {
  fetchProducts();
  fetchOffers();
}, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    }
  };

const fetchOffers = async () => {
  try {
    const res = await axios.get(`https://api.digicopy.in/api/offers`, {
      validateStatus: () => true, // prevent axios crash
    });

    if (typeof res.data === "string") {
      console.error("Non-JSON offers response:", res.data);
      alert("Offers API returned HTML. Check backend route.");
      return;
    }

    setOffers(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Fetch offers error:", err);
    alert("Failed to fetch offers");
  }
};


  const handleSaveOffer = async () => {
    if (!selectedProduct || !buyQuantity || !freeQuantity) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      if (editingOfferId) {
        // Update existing offer
        await axios.put(`${API_URL}/api/offers/${editingOfferId}`, {
          productId: parseInt(selectedProduct),
          buyQuantity: parseInt(buyQuantity),
          freeQuantity: parseInt(freeQuantity),
        });
        alert("Offer updated successfully");
      } else {
        // Create new offer
        await axios.post(`${API_URL}/api/offers`, {
          productId: parseInt(selectedProduct),
          buyQuantity: parseInt(buyQuantity),
          freeQuantity: parseInt(freeQuantity),
        });
        alert("Offer saved successfully");
      }

      // Reset form
      setSelectedProduct("");
      setBuyQuantity("");
      setFreeQuantity("");
      setEditingOfferId(null);
      fetchOffers();
    } catch (err) {
      console.error(err);
      alert("Failed to save offer");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (offer) => {
    setSelectedProduct(offer.product_id); // backend returns product_id
    setBuyQuantity(offer.buy_quantity);
    setFreeQuantity(offer.free_quantity);
    setEditingOfferId(offer.id); // mark which offer is being edited
  };

  const handleDelete = async (offerId) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await axios.delete(`${API_URL}/api/offers/${offerId}`);
        fetchOffers();
      } catch (err) {
        console.error(err);
        alert("Failed to delete offer");
      }
    }
  };

  const handleCancelEdit = () => {
    setSelectedProduct("");
    setBuyQuantity("");
    setFreeQuantity("");
    setEditingOfferId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Offer Management</h2>

      {/* Form */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border p-2 rounded w-full lg:w-64"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Buy Quantity"
          value={buyQuantity}
          onChange={(e) => setBuyQuantity(e.target.value)}
          className="border p-2 rounded w-full lg:w-32"
        />

        <input
          type="number"
          placeholder="Free Quantity"
          value={freeQuantity}
          onChange={(e) => setFreeQuantity(e.target.value)}
          className="border p-2 rounded w-full lg:w-32"
        />

        <button
          onClick={handleSaveOffer}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Saving..." : editingOfferId ? "Update Offer" : "Save Offer"}
        </button>

        {editingOfferId && (
          <button
            onClick={handleCancelEdit}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Offers Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Buy Quantity</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Free Quantity</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No offers found.
                </td>
              </tr>
            ) : (
              offers.map((offer) => (
                <tr key={offer.id} className="border-t hover:bg-gray-50">
                 <td className="p-3 text-gray-800">
  {offer.productName || "—"}
</td>

                  <td className="p-3 text-gray-800">{offer.buy_quantity}</td>
                  <td className="p-3 text-gray-800">{offer.free_quantity}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(offer)}
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(offer.id)}
                      className="flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}