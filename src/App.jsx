import { useState, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import image from "./assets/image.jpg";
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
      return `📂 Projects:\n\n1. Project-1\n2. Project-2\n3. Project-3\n 4. Project-4 \n\n👉 Use: cat <project-name>`;
    if (cmd.startsWith("cat ")) {
      const name = cmd.split(" ")[1];
      if (name === "Project-1")
        return `🚀 Designed and implemented a fully automated Real Time Scalable Fintech Application With CI/CD pipeline using GitHub Actions, reducing manual deployment effort by over 70% and accelerating software release cycles with faster and more reliable deployments. Containerized applications using Docker and deployed them on Kubernetes to ensure scalable, resilient, and highly available application delivery. Integrated DevSecOps practices into the development lifecycle by incorporating automated vulnerability scanning with Trivy, enabling early detection of security issues and improving overall code quality. Optimized deployment workflows through automation, reducing deployment time by 60% while enhancing consistency, operational efficiency, and production reliability. \n\nGitHub:\nhttps://github.com/Harsh7209/Project-1.git`;
      if (name === "Project-2")
        return `Developed SkillPulse, a production-grade cloud-native DevSecOps platform that automates the complete software delivery lifecycle on Amazon Web Services EKS using GitHub Actions, Argo CD, Docker, and Kubernetes. Engineered a fully automated CI/CD and GitOps workflow that reduced deployment time by 60% and eliminated over 70% of manual operational effort through infrastructure automation with HashiCorp Terraform. Built and deployed 5+ containerized services with scalable, self-healing Kubernetes workloads, achieving 99.9% application availability and secure TLS-enabled traffic management using Envoy Gateway and cert-manager. Integrated DevSecOps tooling including Trivy, Gitleaks, and Hadolint to enforce automated security and compliance checks, blocking HIGH and CRITICAL vulnerabilities before deployment. Implemented end-to-end observability with Prometheus and Grafana for real-time monitoring, performance analytics, and infrastructure health tracking across the entire platform. \n \n\nGitHub:\nhttps://github.com/Harsh7209/Project-4.git`;
      if (name === "Project-3")
        return `Designed and deployed a production-grade GitOps-enabled blogging platform using Amazon Web Services EKS, integrating a complete DevSecOps pipeline with GitHub Actions, Argo CD, Docker, and Kubernetes. Automated the entire CI/CD workflow from code commit to production deployment, reducing manual deployment effort by 75% and accelerating release delivery by 60%. Implemented multi-layer security scanning using Gitleaks, OWASP Dependency Check, Hadolint, and Trivy to proactively detect secrets, vulnerable dependencies, Docker misconfigurations, and container CVEs before deployment. Containerized and orchestrated the full-stack React and Node.js application on Kubernetes with self-healing and scalable workloads, achieving 99.9% service availability and improved deployment reliability. Enabled continuous GitOps-based delivery through Argo CD for automated synchronization between GitHub repositories and the EKS cluster, while integrating Prometheus and Grafana to monitor real-time infrastructure metrics, application performance, pod health, and cluster resource utilization. \n \n\nGitHub:\nhttps://github.com/Harsh7209/Project-3.git`;

      if (name === "Project-4")
        return `Built and deployed a production-grade cloud-native e-commerce platform on Amazon Web Services EKS using Kubernetes, Docker, GitHub Actions, Argo CD, and HashiCorp Terraform, implementing a complete GitOps-driven CI/CD workflow from infrastructure provisioning to automated deployment. Automated Docker image builds, Amazon ECR pushes, and Argo CD synchronization, reducing manual deployment effort by 80% and improving release efficiency by 65%. Managed scalable AWS infrastructure and optimized Kubernetes workloads with rolling updates, liveness/readiness probes, and resource limits, achieving 99.9% application availability and reliable production deployments. Integrated Prometheus and Grafana for real-time monitoring of cluster health, application performance, and infrastructure metrics. \n \n\nGitHub:\nhttps://github.com/Harsh7209/Project-2.git`;
      return "Project not found";
    }
    if (cmd === "skills")
      return `🛠 Skills:\n-
Linux System Administration & Server Management | Shell Scripting & Task Automation | Version Control & Collaboration | CI/CD Pipeline Development | Containerization & Image Management | Container Orchestration & Cluster Management | Infrastructure as Code (IaC) & Cloud Provisioning | Configuration Management & Automation | Metrics Collection & System Monitoring | Observability, Dashboarding & Alerting | Scripting, Automation & Agentic AI Development | DevSecOps & Security Automation | Cloud Platforms & Services | Networking, Load Balancing & Service Mesh | Troubleshooting, Debugging & Performance Optimization `;
    if (cmd === "experience")
      return `💼 Experience:\n\n 1.Engineered a fully automated CI/CD pipeline using GitHub Actions, reducing manual deployment effort by 70% and accelerating release cycles with consistent, reliable deployments.\n
2.Containerized applications using Docker and orchestrated deployments on Kubernetes, ensuring high scalability, fault tolerance, and seamless application delivery.\n
3.Integrated DevSecOps practices into the development lifecycle by implementing automated vulnerability scanning with Trivy, enabling early threat detection and strengthening application security posture.\n
4.Optimized deployment workflows through CI/CD automation, reducing deployment time by 60% while improving development efficiency and operational reliability.\n
5.Designed and maintained secure, scalable, and production-ready deployment pipelines aligned with modern cloud-native and DevOps best practices.\n
6.Collaborated with cross-functional teams to implement infrastructure automation, configuration management, and monitoring solutions that enhanced system reliability and performance.
7.Continuously learned and adapted to emerging DevOps tools, technologies, and methodologies to drive innovation and improve software delivery processes. `;
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
          backgroundImage: `url(${booting ? image : mainBg})`,
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
