import { useEffect, useState } from "react";
import { getNotices } from "../api";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    async function fetchNotices() {
      const data = await getNotices();
      setNotices(data);
    }
    fetchNotices();
  }, []);

  return (
    <div>
      <h2>Notices</h2>

      {notices.length === 0 && <p>No notices available</p>}

      {notices.map((notice) => (
        <div key={notice._id} style={{ border: "1px solid #aaa", margin: "10px", padding: "10px" }}>
          <h3>{notice.title}</h3>
          <p>{notice.description}</p>
          <small>{new Date(notice.date).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}

export default NoticeBoard;
