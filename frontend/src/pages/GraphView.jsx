import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import ForceGraph2D from "react-force-graph-2d";
import api from "../api/client";


function getDifficultyColor(difficulty = 0) {
  if (difficulty >= 4) return "#ff6b6b";
  if (difficulty >= 2) return "#ffd166";
  return "#97FEED";
}
function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        width: "100%",
        padding: "18px",
        borderRadius: "16px",
        background: flipped
          ? "linear-gradient(135deg, #35A29F, #0B666A)"
          : "rgba(11,102,106,0.2)",
        border: "1px solid rgba(151,254,237,0.2)",
        cursor: "pointer"
      }}
    >
      <div style={{ fontSize: "12px", opacity: 0.7 }}>
        {flipped ? "Answer" : "Question"}
      </div>

      <div style={{ marginTop: "10px", color: "white" }}>
        {flipped ? card.answer : card.question}
      </div>
    </div>
  );
}
// 🔥 IMPORTANT: moved up (cleaner)
const getConnectedNodes = (selectedId, links) => {
  const connected = new Set();

  links.forEach(link => {
    if (link.source === selectedId) connected.add(link.target);
    if (link.target === selectedId) connected.add(link.source);
  });

  return connected;
};

export default function GraphView() {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState(null);
  const [rawNodes, setRawNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState("");
  const [hoverNode, setHoverNode] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [flashcards, setFlashcards] = useState(null);
  const [loadingFlash, setLoadingFlash] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [mode, setMode] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);


//Useeffect for ai summary
  useEffect(() => {
  if (!selectedNode) return;

  const fetchSummary = async () => {
    try {
      setLoadingAI(true);

      const res = await api.get(
        `/knowledge/ai/summary/${selectedNode.id}/`
      );

      setAiSummary(res.data.summary);
    } catch (err) {
      console.error("AI error", err);
    } finally {
      setLoadingAI(false);
    }
  };

  fetchSummary();
}, [selectedNode]);


const loadGraph = (data) => {
  setMode(data.mode);

  const nodes = (data.nodes || []).map((node) => ({
    id: node.id,
    name: node.title,
    type: node.type,
    summary: node.summary || "",
    difficulty: node.difficulty_score ?? 0,
  }));

  const links = (data.edges || []).map((edge) => ({
    source: edge.source,
    target: edge.target,
    strength: edge.strength || 1,
  }));

  setRawNodes(nodes);
  setGraphData({ nodes, links });
};
//useeffect to load graph data
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await api.get("/knowledge/graph/");
      loadGraph(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCourses();
}, []);

const fetchCourseTopics = async (courseId) => {
  try {
    const res = await api.get(`/knowledge/graph/${courseId}/`);
    loadGraph(res.data);
  } catch (err) {
    console.error(err);
  }
};

//useeffet fo camera effect
 useEffect(() => {
  if (!selectedNode || !fgRef.current) return;
  if (selectedNode.x === undefined) return;

  const duration = 800;

  const zoomLevel = Math.max(2.5, 6 - graphData.nodes.length * 0.3);

  fgRef.current.centerAt(
    selectedNode.x,
    selectedNode.y,
    duration
  );

  fgRef.current.zoom(zoomLevel, duration);

}, [selectedNode]);

  const selectedNodeData = useMemo(() => {
    if (!selectedNode) return null;
    return rawNodes.find((node) => node.id === selectedNode.id) || null;
  }, [selectedNode, rawNodes]);



  // 🔥 FIX: avoid crash when graphData is null
  const connectedNodes = useMemo(() => {
    if (!selectedNode || !graphData) return new Set();
    return getConnectedNodes(selectedNode.id, graphData.links);
  }, [selectedNode, graphData]);

     

  if (error) {
    return <div style={{ padding: 24, color: "red" }}>{error}</div>;
  }

  if (!graphData) {
    return <div style={{ padding: 24, color: "white" }}>Loading...</div>;
  }



  return (
<div
  style={{
    height: "calc(100vh - 60px)",
    display: "grid",
    gridTemplateColumns: "1fr 300px",
    gridTemplateRows: "1fr", // 🔥 ADD THIS
    background: "#071952",
       position: "relative",
    overflow: "hidden"
  }}
>

      {hoverNode && (
        <div
          style={{
            position: "absolute",
            left: hoverNode.x + 12,
            top: hoverNode.y + 12,
            background: "rgba(11, 25, 82, 0.95)",
            border: "1px solid rgba(151, 254, 237, 0.2)",
            borderRadius: "10px",
            padding: "10px 12px",
            color: "white",
            fontSize: "13px",
            pointerEvents: "none",
            maxWidth: "220px",
            backdropFilter: "blur(6px)",
            zIndex: 5
          }}
        >
          <strong>{hoverNode.name}</strong>
          <div style={{ marginTop: 6, color: "#b8c1ec" }}>
            {hoverNode.summary?.slice(0, 80) || "No summary"}
          </div>
        </div>
      )}
<div style={{ width: "100%", height: "100%" }}>
  <ForceGraph2D
  ref={fgRef}
  graphData={graphData}
  width={window.innerWidth - 320}
height={window.innerHeight - 60}
  backgroundColor="#071952"
  nodeLabel="name"
  linkDirectionalParticles={2}
linkDirectionalParticleSpeed={0.003}
d3Force={(forceGraph) => {
  forceGraph
    .force("charge")
    .strength(-200)
}}
d3AlphaDecay={0.02}
d3VelocityDecay={0.25}

  onNodeClick={(node) => {
  if (mode === "courses") {
    setSelectedCourse(node);
    fetchCourseTopics(node.id);

    fgRef.current.centerAt(node.x, node.y, 1000);
    fgRef.current.zoom(4, 1000);
  } else {
    setSelectedNode(node);
  }
}}

  linkWidth={(link) => {
    if (!selectedNode) return link.strength * 2;

    const isActive =
      link.source === selectedNode?.id ||
      link.target === selectedNode?.id;

    return isActive ? 4 : 1;
  }}

  linkColor={(link) => {
    if (!selectedNode) return "#35A29F";

    const isActive =
      link.source === selectedNode?.id ||
      link.target === selectedNode?.id;

    return isActive ? "#97FEED" : "rgba(53,162,159,0.1)";
  }}

  nodeCanvasObject={(node, ctx, globalScale) => {
    const isSelected = selectedNode?.id === node.id;
    const isConnected = connectedNodes.has(node.id);

    let opacity = 1;
    let radius = node.type === "course" ? 20 : 7;

    if (selectedNode) {
      if (isSelected) {
        radius = 10;
        opacity = 1;
      } else if (isConnected) {
        radius = 8;
        opacity = 0.9;
      } else {
        radius = 5;
        opacity = 0.2;
      }
    }

    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = getDifficultyColor(node.difficulty);
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.globalAlpha = 1;

    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.fillStyle = "white";
    ctx.fillText(node.name, node.x + 10, node.y + 4);
  }}
/> </div>

      {/* SIDE PANEL */}
      <aside
  style={{
    borderLeft: "1px solid rgba(151, 254, 237, 0.12)",
    background: "linear-gradient(180deg, rgba(11,25,82,0.95), rgba(7,25,82,0.85))",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  }}
>
  <h2 style={{ margin: 0, fontWeight: 500, letterSpacing: "0.5px" }}>
    Topic Details
  </h2>

  {!selectedNodeData && (
    <div style={{ color: "#b8c1ec", fontSize: "14px" }}>
      Hover to preview • Click a node to focus
    </div>
  )}

  {selectedNodeData && (
    <>
      {/* Tag */}
      <div
        style={{
          alignSelf: "flex-start",
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          color: "#97FEED",
          border: "1px solid rgba(151,254,237,0.2)"
        }}
      >
        Topic #{selectedNodeData.id}
      </div>

      {/* Title */}
      <h3 style={{ margin: 0, fontWeight: 600 }}>
        {selectedNodeData.name}
      </h3>

{/* MODE SWITCH */}
<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "12px"
  }}
>
  <button
    onClick={async () => {
      setLoadingFlash(true);
      const res = await api.get(`/knowledge/graph/`);
      setFlashcards(res.data.flashcards || res.data);
      setQuiz(null);
      setCurrentCard(0);
      setLoadingFlash(false);
    }}
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "12px",
      border: "none",
      background: flashcards ? "#35A29F" : "#1e2a4a",
      color: "white",
      fontWeight: "600"
    }}
  >
    Study
  </button>

  <button
    onClick={async () => {
      const res = await api.get(`/knowledge/ai/quiz/${selectedNode.id}/`);
      setQuiz(res.data.quiz);
      setFlashcards(null);
      setCurrentQuestion(0);
      setScore(0);
    }}
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "12px",
      border: "none",
      background: quiz ? "#35A29F" : "#1e2a4a",
      color: "white",
      fontWeight: "600"
    }}
  >
    Quiz
  </button>
</div>
      {loadingFlash && <p>Generating flashcards...</p>}

{/* CONTENT MODE */}
<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

  {/* FLASHCARDS */}
  {flashcards && flashcards.length > 0 && !quiz && (
    <>
      <Flashcard card={flashcards[currentCard]} />

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px"
  }}
>
<button onClick={() => setCurrentCard((prev) => Math.max(prev - 1, 0))}>
          Prev
        </button>

  <span style={{ opacity: 0.7 }}>
    {currentCard + 1} / {flashcards.length}
  </span>

        <button onClick={() =>
          setCurrentCard((prev) =>
            Math.min(prev + 1, flashcards.length - 1)
          )
        }>
          Next
        </button>
      </div>
    </>
  )}

  {/* QUIZ */}
  {quiz && (
    <div
      style={{
        padding: "16px",
        borderRadius: "16px",
        background: "rgba(20,30,60,0.6)",
        border: "1px solid rgba(151,254,237,0.15)"
      }}
    >
      <h4>{quiz[currentQuestion].question}</h4>

      {quiz[currentQuestion].options.map((opt, i) => {
        const isSelected = selectedAnswer === i;
        const isCorrect = i === quiz[currentQuestion].correct;

        return (
          <button
            key={i}
            onClick={() => setSelectedAnswer(i)}
            style={{
              display: "block",
              width: "100%",
              margin: "8px 0",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              textAlign: "left",
              background:
                selectedAnswer !== null
                  ? isCorrect
                    ? "#2ecc71"
                    : isSelected
                    ? "#e74c3c"
                    : "#1e2a4a"
                  : isSelected
                  ? "#35A29F"
                  : "#1e2a4a",
              color: "white"
            }}
          >
            {opt}
          </button>
        );
      })}

      <button
        onClick={() => {
          if (selectedAnswer === null) return;

          if (selectedAnswer === quiz[currentQuestion].correct) {
            setScore((prev) => prev + 1);
          }

          if (currentQuestion < quiz.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer(null);
          } else {
            alert(`Score: ${score}/${quiz.length}`);
            setQuiz(null);
          }
        }}
        style={{
          marginTop: "10px",
          padding: "10px",
          width: "100%",
          borderRadius: "10px",
          background: "#35A29F",
          border: "none",
          color: "white"
        }}
      >
        Next
      </button>
    </div>
  )}

</div>



      {/* Summary */}
      <p
        style={{
          margin: 0,
          lineHeight: 1.6,
          fontSize: "14px",
          color: "#d7e3fc"
        }}
      >
        {loadingAI && "Generating AI summary..."}

{!loadingAI && (aiSummary || selectedNodeData.summary)}
      </p>

      {/* Difficulty Card */}
      <div
        style={{
          padding: "16px",
          borderRadius: "14px",
          background: "rgba(11,102,106,0.15)",
          border: "1px solid rgba(151,254,237,0.15)"
        }}
      >
        <div style={{ marginBottom: "8px", fontSize: "13px" }}>
          Difficulty
        </div>

        {/* Progress Bar */}
        <div
          style={{
            height: "8px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${Math.min(selectedNodeData.difficulty * 20, 100)}%`,
              height: "100%",
              background: getDifficultyColor(selectedNodeData.difficulty),
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: "#b8c1ec"
          }}
        >
          Score: {selectedNodeData.difficulty}
        </div>
      </div>

      <button
  onClick={async () => {
    const res = await api.get("/knowledge/graph/");
    loadGraph(res.data);
    setSelectedNode(null);
    setSelectedCourse(null);
  }}
>
  Back to Universe
</button>
    </>
  )}
</aside>
    </div>
  );
}