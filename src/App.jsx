import { useState, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import bootBg from "./assets/boot-bg.jpg";
import mainBg from "./assets/main-bg.jpg";

function App() {
  const [booting, setBooting] = useState(true);
  const [bootText, setBootText] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "Welcome to Harsh OS 💻",
    "Type 'help' to begin",
  ]);
  const [time, setTime] = useState("");
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [windowVisible, setWindowVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const terminalRef = useRef(null);

  const particlesInit = async (engine) => await loadFull(engine);

  // Mouse tracking for glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Boot animation
  useEffect(() => {
    const messages = [
      "Initializing system...",
      "Loading kernel modules...",
      "Starting network services...",
      "Bypassing firewall...",
      "Decrypting credentials...",
      "Access granted ✔",
      "Welcome to Harsh OS 💻",
    ];
    let i = 0,
      charIndex = 0,
      currentLine = "";
    const typing = setInterval(() => {
      if (i < messages.length) {
        currentLine += messages[i][charIndex];
        charIndex++;
        setBootText((prev) => {
          const newText = [...prev];
          newText[i] = currentLine;
          return newText;
        });
        if (charIndex === messages[i].length) {
          i++;
          charIndex = 0;
          currentLine = "";
        }
      } else {
        clearInterval(typing);
        setTimeout(() => {
          setBooting(false);
          setTimeout(() => setWindowVisible(true), 100);
        }, 800);
      }
    }, 30);
    return () => clearInterval(typing);
  }, []);

  // Top bar
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setCpu(Math.floor(Math.random() * 100));
      setRam(Math.floor(Math.random() * 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    cmd = cmd.trim();
    if (cmd === "help")
      return `Commands:\nwhoami\nabout\nprojects\nskills\nexperience\ncontact\ndate\necho <text>\ncat <project>\nopen github\nopen linkedin\nhack\nclear`;
    if (cmd === "whoami") return "Harsh Choubey - DevOps Engineer";
    if (cmd === "about")
      return ` 👨‍💻 I am an aspiring DevOps Engineer with a strong focus on building reliable, automated, and secure systems. My interest lies in bridging the gap between development and operations by creating smooth and efficient workflows that make software delivery faster and more dependable.

I have hands on experience working with tools like Docker, GitHub Actions, and Kubernetes fundamentals, where I have built and deployed projects using CI CD pipelines and containerized environments. I enjoy turning complex processes into simple, repeatable solutions through automation.

I am continuously learning and improving my skills in cloud technologies, system design, and infrastructure automation. I believe in writing clean, efficient configurations and following best practices that align with real world DevOps standards.

What drives me is the challenge of solving problems and optimizing systems. I aim to contribute to environments where I can build scalable solutions, improve deployment processes, and grow as a DevOps professional.

I am currently looking for opportunities to apply my skills, learn from experienced teams, and contribute to impactful projects. 🚀`;
    if (cmd === "projects")
      return `📂 Projects:\n\n1. Ai-Bank-App\n2. AWS-serverless-taskmaster\n3. Terraform-capstone\n\n👉 Use: cat <project-name>`;
    if (cmd.startsWith("cat ")) {
      const name = cmd.split(" ")[1];
      if (name === "Ai-Bank-App")
        return `🚀 Built a fully automated CI CD pipeline using GitHub Actions, reducing manual deployment effort by over 70 percent and enabling faster and consistent releases. Containerized the application using Docker and deployed it on Kubernetes, ensuring scalable and reliable application delivery.\n Integrated security into the development lifecycle by incorporating Trivy for automated vulnerability scanning, enabling early detection of security issues and improving overall code quality. \n Reduced deployment time by 60 percent through CI CD automation.
Implemented containerized deployment using Docker and Kubernetes.
Integrated security scanning within the pipeline using Trivy.\n\nGitHub:\nhttps://github.com/Harsh7209/Ai-Bankapp-DevSecOps.git`;
      if (name === "AWS-serverless-taskmaster")
        return `Built and deployed the application using the Serverless Framework, enabling automated provisioning and management of cloud resources. Leveraged AWS services including S3 for storage, DynamoDB for NoSQL data management, and Load Balancer for handling traffic distribution and improving application reliability.\n

Implemented Infrastructure as Code using Terraform, allowing consistent, repeatable, and version controlled deployments across environments. Automated resource creation reduced manual setup effort by over 70 percent and improved deployment consistency.\n Automated infrastructure provisioning using Terraform \n
Deployed serverless application using Serverless Framework \n 
Utilized AWS services such as S3 and DynamoDB for scalable architecture \n
Implemented load balancing for improved availability and traffic handling\n
Reduced manual configuration effort by over 70 percent. \n \n\nGitHub:\nhttps://github.com/Harsh7209/aws-serverless-taskmaster.git`;
      if (name === "k8s-deployment")
        return `Designed and implemented a multi environment infrastructure setup using Terraform, focusing on scalability, consistency, and Infrastructure as Code best practices. This project demonstrates the ability to manage and provision cloud resources across environments such as development, staging, and production. \n Implemented environment specific configurations using variables and workspaces, allowing dynamic control over resource parameters such as instance count, storage, and scaling based on the target environment. This approach ensured flexibility while maintaining a single source of truth . \n Automated infrastructure provisioning reduced manual setup effort by over 70 percent and improved consistency across deployments. The modular design also enhanced maintainability and aligned with real world infrastructure management practices. \n Designed modular Infrastructure as Code using Terraform modules.\n Provisioned multi environment infrastructure for dev, staging, and production. \n Deployed EC2, S3, and DynamoDB resources with dynamic configurations.\n Improved reusability and maintainability through modular  architecture. \n \n\nGitHub:\nhttps://github.com/Harsh7209/Terraform-Capstone.git`;
      return "Project not found";
    }
    if (cmd === "skills")
      return `🛠 Skills:\n-
🐧 linux | 🐙 git | github | 🐳 docker | ⚙️ github actions
☸️ kubernetes | 🏗️ terraform | 🔧 ansible
📊 prometheus | grafana | 🔍 opentelemetry `;
    if (cmd === "experience")
      return `💼 Experience:\n\n🚀 🔐 AI BankApp DevSecOps Pipeline
Designed and implemented an end to end DevSecOps pipeline for a banking application, focusing on secure and automated delivery. Built CI CD workflows using GitHub Actions, reducing manual deployment effort by 70 percent and improving release consistency. Containerized the application using Docker and deployed it on Kubernetes for scalable and reliable execution. Integrated Trivy for automated vulnerability scanning, embedding security directly into the pipeline.\n \n ☁️ AWS Serverless TaskMaster
Developed a cloud native serverless application using AWS and the Serverless Framework, enabling scalable and cost efficient architecture. Automated infrastructure provisioning using Terraform, reducing manual setup effort by over 70 percent. Utilized AWS services such as S3 and DynamoDB for storage and data management, and implemented load balancing to ensure high availability and efficient traffic handling. \n 🏗️ Terraform Capstone Project
Engineered a multi environment infrastructure setup using Terraform, supporting development, staging, and production environments. Built reusable Terraform modules for EC2, S3, and DynamoDB, enabling scalable and maintainable infrastructure design. Implemented environment specific configurations using variables and workspaces, achieving consistent and repeatable deployments across environments while reducing provisioning time by 70 percent. \n\n📚 Continuous learner in DevOps & Cloud`;
    if (cmd === "contact")
      return `Email: harshchoubey113@gmail.com\nGithub: https://github.com/Harsh7209\nLinkedIn: https://www.linkedin.com/in/harshchoubey113/`;
    if (cmd === "date") return new Date().toString();
    if (cmd.startsWith("echo ")) return cmd.slice(5);
    if (cmd === "open github") {
      window.open("https://github.com/Harsh7209", "_blank");
      return "Opening GitHub...";
    }
    if (cmd === "open linkedin") {
      window.open("https://www.linkedin.com/in/harshchoubey113/", "_blank");
      return "Opening LinkedIn...";
    }
    if (cmd === "hack")
      return `You just knocked on the wrong system.
"Access denied — and now you're being watched."
"That was a mistake you can't undo."
"Unauthorized attempt logged. Game over."
"You shouldn't have done that. 🔥
"Trace initiated… you’re already too late." 👿
`;
    if (cmd === "clear") {
      setHistory([]);
      return "";
    }
    return `Command not found: '${cmd}' — type 'help' for available commands`;
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const output = handleCommand(input);
      setHistory((prev) => [...prev, `harsh@devops:~$ ${input}`, output]);
      setInput("");
    }
  };

  return (
    <>
      <style>{`
        @keyframes bootFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes windowSlideIn {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes topbarSlide {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(0,255,200,0.25); box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(0,255,200,0.1), inset 0 0 25px rgba(255,255,255,0.03); }
          50% { border-color: rgba(0,255,200,0.55); box-shadow: 0 8px 48px rgba(0,0,0,0.7), 0 0 40px rgba(0,255,200,0.25), 0 0 80px rgba(0,255,100,0.1), inset 0 0 35px rgba(255,255,255,0.06); }
        }
        @keyframes pulseTopbar {
          0%, 100% { box-shadow: 0 0 10px rgba(0,255,200,0.1); }
          50% { box-shadow: 0 0 25px rgba(0,255,200,0.3), inset 0 0 20px rgba(0,255,200,0.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        @keyframes cpuBar {
          from { opacity: 0.6; }
          to { opacity: 1; }
        }
        .boot-line {
          animation: bootFadeIn 0.3s ease forwards;
        }
        .terminal-window {
          animation: ${windowVisible ? "windowSlideIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards" : "none"};
          animation-name: ${windowVisible ? "borderGlow" : "none"};
        }
        .terminal-window-enter {
          animation: windowSlideIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards, borderGlow 3s ease-in-out infinite 0.6s;
        }
        .topbar-enter {
          animation: topbarSlide 0.5s cubic-bezier(0.16,1,0.3,1) forwards, pulseTopbar 4s ease-in-out infinite 0.5s;
        }
        .scanline {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 3px;
          background: linear-gradient(transparent, rgba(0,255,180,0.06), transparent);
          animation: scanline 6s linear infinite;
          pointer-events: none;
          z-index: 10;
        }
        .shimmer-line {
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          animation: shimmer 4s ease-in-out infinite;
          pointer-events: none;
        }
        .terminal-line-enter {
          animation: bootFadeIn 0.2s ease forwards;
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .header-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }
        .dot-red { background: #ff5f57; box-shadow: 0 0 6px #ff5f57; }
        .dot-yellow { background: #febc2e; box-shadow: 0 0 6px #febc2e; }
        .dot-green { background: #28c840; box-shadow: 0 0 6px #28c840; }
        .terminal-scroll::-webkit-scrollbar { width: 4px; }
        .terminal-scroll::-webkit-scrollbar-track { background: transparent; }
        .terminal-scroll::-webkit-scrollbar-thumb { background: rgba(0,255,200,0.3); border-radius: 2px; }
        .input-line { display: flex; align-items: center; gap: 0; flex-wrap: nowrap; }
        .cmd-input {
          background: transparent;
          border: none;
          color: #00ff88;
          outline: none;
          font-family: monospace;
          font-size: inherit;
          text-shadow: 0 0 8px #00ff88;
          flex: 1;
          min-width: 40px;
          caret-color: #00ff88;
        }
      `}</style>

      {/* Scanline effect */}
      <div className="scanline" />

      {/* Mouse follow glow */}
      <div
        style={{
          position: "fixed",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0,255,150,0.04) 0%, transparent 70%)`,
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          pointerEvents: "none",
          zIndex: 0,
          transition: "left 0.1s, top 0.1s",
        }}
      />

      <div
        style={{
          height: "100vh",
          width: "100vw",
          fontFamily: "monospace",
          position: "fixed",
          top: 0,
          left: 0,
          overflow: "hidden",
          fontSize: "clamp(12px, 1.3vw, 15px)",
          color: "#00ff00",
          backgroundImage: `url(${booting ? bootBg : mainBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: true },
            background: { color: "transparent" },
            particles: {
              number: { value: 50 },
              color: { value: ["#00ffcc", "#00ff88", "#00ccff"] },
              links: {
                enable: true,
                color: "#00ffcc",
                distance: 150,
                opacity: 0.3,
              },
              move: { enable: true, speed: 0.8 },
              opacity: { value: 0.4, animation: { enable: true, speed: 0.5 } },
              size: { value: { min: 1, max: 2.5 } },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
              },
              modes: { repulse: { distance: 100 }, push: { quantity: 3 } },
            },
          }}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: booting
              ? "rgba(0,0,0,0.55)"
              : "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,10,5,0.5) 100%)",
            zIndex: 1,
          }}
        />

        {booting ? (
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "clamp(30px, 8vw, 120px)",
              boxSizing: "border-box",
              fontSize: "clamp(14px, 2vw, 20px)",
              lineHeight: 2,
            }}
          >
            {bootText.map((line, i) => (
              <div
                key={i}
                className="glitch neon boot-line"
                style={{
                  color: i === bootText.length - 1 ? "#00ffcc" : "#00ff88",
                  fontSize:
                    i === bootText.length - 1
                      ? "clamp(16px, 2.5vw, 24px)"
                      : undefined,
                  fontWeight: i === bootText.length - 1 ? "bold" : "normal",
                }}
              >
                {line}
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Top Bar */}
            <div
              className="topbar-enter"
              style={{
                width: "100%",
                background: "rgba(0,8,4,0.6)",
                backdropFilter: "blur(20px) saturate(200%)",
                WebkitBackdropFilter: "blur(20px) saturate(200%)",

                padding: "10px clamp(16px, 3vw, 5px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(0,255,150,0.15)",
                position: "relative",
                zIndex: 3,
                color: "#00ffcc",
                flexWrap: "wrap",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#00ff88",
                    boxShadow: "0 0 8px #00ff88, 0 0 16px #00ff88",
                    animation: "cpuBar 1s ease-in-out infinite alternate",
                  }}
                />
                <span
                  style={{
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    fontSize: "clamp(11px, 1.1vw, 14px)",
                  }}
                >
                  HARSH OS
                </span>
                <span
                  style={{ color: "rgba(0,255,200,0.4)", fontSize: "10px" }}
                >
                  v2.0.1
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "clamp(8px, 2vw, 24px)",
                  fontSize: "clamp(10px, 1vw, 13px)",
                  alignItems: "center",
                }}
              >
                <span style={{ color: cpu > 75 ? "#ff6b6b" : "#00ffcc" }}>
                  CPU <span style={{ fontWeight: "bold" }}>{cpu}%</span>
                </span>
                <span style={{ color: "rgba(0,255,200,0.3)" }}>|</span>
                <span style={{ color: ram > 75 ? "#ff6b6b" : "#00ffcc" }}>
                  RAM <span style={{ fontWeight: "bold" }}>{ram}%</span>
                </span>
                <span style={{ color: "rgba(0,255,200,0.3)" }}>|</span>
                <span>🕒 {time}</span>
              </div>
            </div>

            {/* Terminal Window */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "clamp(10px, 2vw, 24px)",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div
                className="terminal-window-enter"
                style={{
                  width: "100%",
                  maxWidth: "1100px",
                  height: "100%",
                  maxHeight: "calc(100vh - 120px)",
                  position: "relative",
                  background: "rgba(0,8,4,0.45)",
                  backdropFilter: "blur(40px) saturate(200%) brightness(1.1)",
                  WebkitBackdropFilter:
                    "blur(40px) saturate(200%) brightness(1.1)",
                  borderRadius: "20px",
                  border: "1px solid rgba(0,255,200,0.25)",
                  boxShadow: `
                    0 0 0 1px rgba(0,255,150,0.05),
                    0 8px 32px rgba(0,0,0,0.7),
                    0 0 60px rgba(0,255,150,0.08),
                    inset 0 1px 0 rgba(255,255,255,0.08),
                    inset 0 0 40px rgba(0,255,150,0.03)
                  `,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Shimmer */}
                <div className="shimmer-line" />

                {/* Window Header */}
                <div
                  style={{
                    background: "rgba(0,15,8,0.7)",
                    backdropFilter: "blur(20px)",
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(0,255,150,0.1)",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <span className="header-dot dot-red" />
                    <span className="header-dot dot-yellow" />
                    <span className="header-dot dot-green" />
                  </div>
                  <span
                    style={{
                      color: "rgba(0,255,200,0.6)",
                      fontSize: "clamp(11px, 1vw, 13px)",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                    }}
                  >
                    harsh@devops — terminal
                  </span>
                  <span
                    style={{ color: "rgba(0,255,200,0.3)", fontSize: "11px" }}
                  >
                    zsh
                  </span>
                </div>

                {/* Terminal Body */}
                <div
                  ref={terminalRef}
                  className="terminal-scroll"
                  style={{
                    flex: 1,
                    padding: "clamp(14px, 2vw, 24px)",
                    overflowY: "auto",
                    fontSize: "clamp(12px, 1.2vw, 15px)",
                    lineHeight: 1.7,
                    color: "#00ffe0",
                    wordBreak: "break-word",
                    overflowX: "hidden",
                  }}
                >
                  {history.map((line, i) => {
                    const isCmd = line.startsWith("harsh@devops:~$");
                    const lines = line.split("\n");
                    return lines.map((subLine, idx) => {
                      const parts = subLine.split(/(https?:\/\/[^\s]+)/);
                      return (
                        <div
                          key={`${i}-${idx}`}
                          className="terminal-line-enter"
                          style={{
                            color: isCmd
                              ? "#00ff88"
                              : subLine.startsWith("Command not found")
                                ? "#ff6b6b"
                                : "#00ffe0",
                            marginBottom:
                              idx === lines.length - 1 && !isCmd ? "8px" : "0",
                          }}
                        >
                          {parts.map((part, index) => {
                            if (part.match(/https?:\/\/[^\s]+/)) {
                              return (
                                <a
                                  key={index}
                                  href={part}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: "#00ccff",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                  }}
                                >
                                  {part}
                                </a>
                              );
                            }
                            return <span key={index}>{part}</span>;
                          })}
                        </div>
                      );
                    });
                  })}

                  {/* Input line */}
                  <div className="input-line">
                    <span
                      style={{
                        color: "#00ff88",
                        marginRight: "8px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      harsh@devops:~$
                    </span>
                    <input
                      className="cmd-input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleEnter}
                      autoFocus
                    />
                    <span className="cursor-blink" style={{ color: "#00ff88" }}>
                      █
                    </span>
                  </div>
                </div>

                {/* Bottom status bar */}
                <div
                  style={{
                    background: "rgba(0,255,150,0.06)",
                    borderTop: "1px solid rgba(0,255,150,0.1)",
                    padding: "6px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    color: "rgba(0,255,200,0.4)",
                    flexShrink: 0,
                  }}
                >
                  <span>● CONNECTED</span>
                  <span>TYPE 'help' FOR COMMANDS</span>
                  <span>HARSH OS v2.0</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
