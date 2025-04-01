import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Community() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/groups");
        setGroups(response.data);
      } catch (err) {
        console.error("Error fetching groups:", err);
        setError("Failed to load groups");
      }
    };
    fetchGroups();
  }, []);

  const createGroup = async () => {
    if (!groupName) return;
    try {
      const response = await axios.post("http://localhost:5000/api/groups", { 
        name: groupName 
      });
      setGroups([...groups, response.data]);
      setGroupName("");
    } catch (err) {
      console.error("Error creating group:", err);
      setError("Failed to create group");
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        `http://localhost:5000/api/groups/${groupId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate(`/community/group/${groupId}`);
    } catch (err) {
      console.error("Error joining group:", err);
      setError("Failed to join group");
    }
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h2>Community Groups</h2>
      <input 
        value={groupName} 
        onChange={(e) => setGroupName(e.target.value)} 
        placeholder="Enter group name" 
      />
      <button onClick={createGroup}>Create Group</button>
      <ul>
        {groups.map((group) => (
          <li key={group._id}>
            {group.name} 
            <button onClick={() => handleJoinGroup(group._id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Community;
