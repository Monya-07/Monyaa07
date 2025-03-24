import React, { useState, useEffect } from "react";
import { db, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Timetable = () => {
  const [subject, setSubject] = useState("");
  const [faculty, setFaculty] = useState("");
  const [room, setRoom] = useState("");
  const [time, setTime] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch Timetable from Firestore (Auto-Updates)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "timetable"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTimetable(data);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Add or Edit Timetable Entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "timetable", editId), { subject, faculty, room, time });
        toast.success("Timetable Updated!");
      } else {
        await addDoc(collection(db, "timetable"), { subject, faculty, room, time });
        toast.success("Timetable Added!");
      }
      setSubject("");
      setFaculty("");
      setRoom("");
      setTime("");
      setEditId(null);
    } catch (error) {
      console.error("Error adding timetable:", error);
      toast.error("Error saving timetable!");
    }
  };

  // Delete Timetable Entry
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "timetable", id));
      toast.success("Timetable Deleted!");
    } catch (error) {
      console.error("Error deleting timetable:", error);
      toast.error("Error deleting timetable!");
    }
  };

  // Load Timetable Data for Editing
  const handleEdit = (entry) => {
    setSubject(entry.subject);
    setFaculty(entry.faculty);
    setRoom(entry.room);
    setTime(entry.time);
    setEditId(entry.id);
  };

  return (
    <div>
      <h2>Manage Timetable</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <input type="text" placeholder="Faculty Name" value={faculty} onChange={(e) => setFaculty(e.target.value)} required />
        <input type="text" placeholder="Room No" value={room} onChange={(e) => setRoom(e.target.value)} required />
        <input type="time" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <h3>Timetable Entries</h3>
      <ul>
        {timetable.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.subject}</strong> - {entry.faculty} | Room: {entry.room} | Time: {entry.time}
            <button onClick={() => handleEdit(entry)}>Edit</button>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default Timetable;
