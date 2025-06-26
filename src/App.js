import React, { useState } from "react";
import "./App.css"; 

const productsData = [
  { id: 1, name: "Apple iPhone 14", description: "Latest iPhone model", price: 799, category: "Smartphone" },
  { id: 2, name: "Samsung Galaxy S22", description: "Flagship Samsung phone", price: 699, category: "Smartphone" },
  { id: 3, name: "Google Pixel 7", description: "Pure Android experience", price: 599, category: "Smartphone" },
  { id: 4, name: "OnePlus 10 Pro", description: "Fast and smooth Android phone", price: 649, category: "Smartphone" },
  { id: 5, name: "Sony WH-1000XM5", description: "Noise Cancelling Headphones", price: 399, category: "Audio" },
  { id: 6, name: "iPad Air", description: "Lightweight and powerful tablet", price: 599, category: "Tablet" },
];

function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...new Set(productsData.map(p => p.category))];

  const filteredProducts = productsData
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "All" || product.category === categoryFilter)
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "900px", margin: "auto" }}>
      <h1>Product List</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: "0.5rem", flex: "1 1 200px" }}
        />
        <button onClick={() => setSearchTerm("")} style={{ padding: "0.5rem" }}>
          Clear
        </button>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: "0.5rem" }}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price (Low to High)</option>
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ padding: "0.5rem" }}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem"
      }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} style={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fafafa"
            }}>
              <h2 style={{ margin: "0 0 0.5rem" }}>{product.name}</h2>
              <p style={{ margin: "0 0 0.5rem" }}>{product.description}</p>
              <p style={{ margin: "0 0 0.5rem", fontWeight: "bold" }}>${product.price}</p>
              <small style={{ color: "#555" }}>{product.category}</small>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
