import { useEffect, useState } from "react";
import api from "../api/client";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/");
        setCourses(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1>Courses</h1>

      {loading && <p>Loading courses...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && courses.length === 0 && <p>No courses found.</p>}

      {!loading && !error && courses.length > 0 && (
        <ul>
          {courses.map((course) => (
            <li key={course.id} style={{ marginBottom: "12px" }}>
              <strong>{course.title}</strong> — ID: {course.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}