import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [topics, setTopics] = useState([]);

const [topicForm, setTopicForm] = useState({
  course: "",
  title: "",
  summary: "",
  difficulty_score: 0,
});

const [relationForm, setRelationForm] = useState({
  from_topic: "",
  to_topic: "",
  strength: 1.0,
});
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

    const loadTopics = async () => {
  try {
    const res = await API.get("/knowledge/topics/");
    setTopics(res.data);
  } catch (error) {
    console.log(error.response?.data || error);
  }
};

useEffect(() => {
  loadCourses();
  loadTopics();
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

const handleTopicSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/knowledge/topics/", topicForm);

    setTopicForm({
      course: "",
      title: "",
      summary: "",
      difficulty_score: 0,
    });

    loadTopics();
  } catch (error) {
    alert(JSON.stringify(error.response?.data));
  }
};

const handleRelationSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/knowledge/relations/", relationForm);

    setRelationForm({
      from_topic: "",
      to_topic: "",
      strength: 1.0,
    });

  } catch (error) {
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
<h2 style={{ marginTop: "40px" }}>Create Topic Node</h2>

<form onSubmit={handleTopicSubmit}>
  <select
    value={topicForm.course}
    onChange={(e) =>
      setTopicForm({ ...topicForm, course: e.target.value })
    }
  >
    <option value="">Select Course</option>
    {courses.map(course => (
      <option key={course.id} value={course.id}>
        {course.title}
      </option>
    ))}
  </select>

  <input
    type="text"
    placeholder="Topic Title"
    value={topicForm.title}
    onChange={(e) =>
      setTopicForm({ ...topicForm, title: e.target.value })
    }
  />

  <textarea
    placeholder="Topic Summary"
    value={topicForm.summary}
    onChange={(e) =>
      setTopicForm({ ...topicForm, summary: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Difficulty Score"
    value={topicForm.difficulty_score}
    onChange={(e) =>
      setTopicForm({
        ...topicForm,
        difficulty_score: e.target.value
      })
    }
  />

  <button type="submit">Create Topic</button>
</form>

<h2 style={{ marginTop: "40px" }}>Create Topic Relation</h2>

<form onSubmit={handleRelationSubmit}>
  <select
    value={relationForm.from_topic}
    onChange={(e) =>
      setRelationForm({
        ...relationForm,
        from_topic: e.target.value
      })
    }
  >
    <option value="">From Topic</option>
    {topics.map(topic => (
      <option key={topic.id} value={topic.id}>
        {topic.title}
      </option>
    ))}
  </select>

  <select
    value={relationForm.to_topic}
    onChange={(e) =>
      setRelationForm({
        ...relationForm,
        to_topic: e.target.value
      })
    }
  >
    <option value="">To Topic</option>
    {topics.map(topic => (
      <option key={topic.id} value={topic.id}>
        {topic.title}
      </option>
    ))}
  </select>

  <input
    type="number"
    step="0.1"
    value={relationForm.strength}
    onChange={(e) =>
      setRelationForm({
        ...relationForm,
        strength: e.target.value
      })
    }
  />

  <button type="submit">Create Relation</button>
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
                 navigate("/graph")
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