import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [post, setPost] = useState([]);
  const [sortOrder, setSortOrder] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUserId, setFilterUserId] = useState("all");

  async function getPost() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      let arr = res.data.map((item, index) => ({ id: index, ...item }));
      setPost(arr);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function handleSort(event) {
    setSortOrder(event.target.value);
  }

 
  const sortedPosts = [...post].sort((a, b) => {
    if (sortOrder === "asc_userId") return a.userId - b.userId;
    if (sortOrder === "dec_userId") return b.userId - a.userId;
    if (sortOrder === "asc_title") return a.title.localeCompare(b.title);
    if (sortOrder === "desc_title") return b.title.localeCompare(a.title);
    return 0;
  });

 
  const filteredByUserId =
    filterUserId === "all"
      ? sortedPosts
      : sortedPosts.filter((post) => post.userId === parseInt(filterUserId));

  
  const filteredPosts = filteredByUserId.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div style={{ margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Post List</h1>

      
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap" }}>
        
       
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
          <label>Search by Title:</label>
          <input
            type="text"
            placeholder="Enter title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "200px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </div>

        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
          <label>Filter by User:</label>
          <select
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            style={{
              width: "220px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          >
            <option value="all">All Users</option>
            {[...new Set(post.map((p) => p.userId))].map((userId) => (
              <option key={userId} value={userId}>
                User {userId}
              </option>
            ))}
          </select>
        </div>

       
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
          <label>Sort Post:</label>
          <select
            value={sortOrder}
            onChange={handleSort}
            style={{
              width: "220px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          >
            <option value="all">Default</option>
            <option value="asc_userId">UserID (Low to High)</option>
            <option value="dec_userId">UserID (High to Low)</option>
            <option value="asc_title">Title (A-Z)</option>
            <option value="desc_title">Title (Z-A)</option>
          </select>
        </div>
      </div>

     
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "15px" 
      }}>
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ fontSize: "14px", color: "#888" }}>User {post.userId}</h2>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", backgroundColor: "yellow", padding: "5px" }}>
              {post.title}
            </h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;