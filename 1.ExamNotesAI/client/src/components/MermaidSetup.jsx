
// import React, { useEffect, useRef } from 'react'
// import mermaid from 'mermaid'

// mermaid.initialize({
//     startOnLoad : false,
//     theme:"default"
// })

// const cleanMermaidChart = (diagram) => {
//   if (!diagram) return "";

//   let clean = diagram
//     .replace(/\r\n/g, "\n")
//     .trim();

//   if (!clean.startsWith("graph")) {
//     clean = `graph TD\n${clean}`;
//   }

//   return clean;
// };

// const autoFixNodes = (diagram) => {
//   let index = 0;
//   const used = new Map();

//   return diagram.replace(/\[(.*?)\]/g, (match, label) => {
   
    
//     const key = label.trim();

  
//     if (used.has(key)) {
//       return used.get(key);
//     }

//     index++;
//     const id = `N${index}`;
//     const node = `${id}["${key}"]`;

//     used.set(key, node);
//     return node;
//   });
// };



// function MermaidSetup({diagram}) {
// const containerRef = useRef(null)

// useEffect(() => {
//     if (!diagram || !containerRef.current) return;

//     const renderDiagram = async () => {
//       try {
//         containerRef.current.innerHTML = "";

//         const uniqueId = `mermaid-${Math.random()
//           .toString(36)
//           .substring(2, 9)}`;

//         // ✅ sanitize before render
       
        
//         const safeChart = autoFixNodes(cleanMermaidChart(diagram));

//         const { svg } = await mermaid.render(uniqueId, safeChart);

//         containerRef.current.innerHTML = svg;
//       } catch (error) {
//         console.error("Mermaid render failed:", error);
//       }
//     };

//     renderDiagram();
//   }, [diagram]);




//   return (
//     <div className="bg-white border rounded-lg p-4 overflow-x-auto">
//       <div ref={containerRef}/>
//     </div>
//   )
// }

// export default MermaidSetup


import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: "default"
})

const VALID_STARTS = [
  "graph", "flowchart", "sequenceDiagram", "classDiagram",
  "stateDiagram", "erDiagram", "gantt", "pie", "journey",
  "mindmap", "timeline", "gitGraph", "quadrantChart"
];

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .trim();

  const startsValid = VALID_STARTS.some((kw) => clean.startsWith(kw));
  if (!startsValid) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

// Only wraps bracket labels that DON'T already have a node id in front of them.
// A[Start] is left alone. A bare [Start] becomes N1["Start"].
const autoFixNodes = (diagram) => {
  const used = new Map();
  let index = 0;

  return diagram.replace(/(?<![A-Za-z0-9_\]])\[([^\]]*)\]/g, (match, rawLabel) => {
    const key = rawLabel.trim();

    if (used.has(key)) {
      return used.get(key); // reuse same node if label repeats
    }

    index++;
    const id = `N${index}`;
    const safeLabel = key.replace(/"/g, "'"); // avoid breaking quoted label
    const node = `${id}["${safeLabel}"]`;

    used.set(key, node);
    return node;
  });
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const safeChart = autoFixNodes(cleanMermaidChart(diagram));

        const { svg } = await mermaid.render(uniqueId, safeChart);
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML =
            `<pre style="color:red;font-size:12px;white-space:pre-wrap;">${error.message}</pre>`;
        }
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef} />
    </div>
  )
}

export default MermaidSetup