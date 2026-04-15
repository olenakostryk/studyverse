import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    summary: "",
  });

  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      const res = await API.get("/courses/");
      setCourses(res.data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/courses/", form);
    console.log("SUCCESS:", res.data);

    setForm({
      title: "",
      summary: "",
    });

    loadCourses();

  } catch (error) {
    console.log("COURSE ERROR:", error.response?.data);
    alert(JSON.stringify(error.response?.data));
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071952",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>StudyVerse Dashboard</h1>

      {/* Create Course Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px",
        }}
      >
        <input
          type="text"
          placeholder="Course Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <textarea
          placeholder="Course Summary"
          value={form.summary}
          onChange={(e) =>
            setForm({ ...form, summary: e.target.value })
          }
          rows={5}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Course
        </button>
      </form>

      {/* Courses List */}
      <div style={{ marginTop: "40px" }}>
        <h2>Your Courses</h2>

        {courses.length === 0 ? (
          <p>No courses yet.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              style={{
                background: "#0B666A",
                padding: "20px",
                marginTop: "15px",
                borderRadius: "12px",
              }}
            >
              <h3>{course.title}</h3>
              <p>{course.summary}</p>

              <button
                onClick={() =>
                  navigate(`/graph/${course.id}`)
                }
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Open Graph
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}