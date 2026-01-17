import { useEffect, useState } from "react";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notices")
      .then(res => res.json())
      .then(data => setNotices(data));
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Health Notices</h2>
      <ul>
        {notices.map((notice, index) => (
          <li key={index}>{notice}</li>
        ))}
      </ul>
    </div>
  );
}

export default NoticeBoard;
