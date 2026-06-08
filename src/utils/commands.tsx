import React from 'react';
import { TerminalSnake } from '../components/TerminalSnake';

export interface Command {
  name: string;
  description: string;
  execute: (args: string[], extra?: any) => React.ReactNode;
}

export const portfolioData = {
  name: "Paarth Manchanda",
  title: "ML Enthusiast and Full-Stack Developer",
  about: "I am a passionate software developer from New Delhi, India. I am particularly interested in Maths, Web Development and Machine Learning",
  contact: [
    { label: "Email", value: "paarth.manchanda@gmail.com", link: "mailto:paarth.manchanda@gmail.com" },
    { label: "GitHub", value: "github.com/Paarthexe", link: "https://github.com/Paarthexe" },
    { label: "LinkedIn", value: "https://www.linkedin.com/in/paarth-manchanda-577b8b30a/", link: "https://www.linkedin.com/in/paarth-manchanda-577b8b30a/" },
    { label: "Resume", value: "Read Resume (PDF)", link: "./resume.pdf" }
  ],
  skills: {
    languages: [
      "C++",
      "Python",
      "JavaScript",
      "TypeScript",
      "SQL"
    ],

    frameworks: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Flask",
      "PyTorch"
    ],

    technologies: [
      "Git",
      "Docker",
      "Linux",
      "ONNX Runtime",
      "OpenCV",
      "PostgreSQL"
    ]
  },
  projects: [
    {
      id: "dacsaab",
      title: "DacSaab Health Assistant",
      description: "Offline multimodal healthcare assistant combining quantized LLMs, clinical triage models, and medical image analysis for low-resource environments with sub-2s edge inference.",
      tags: ["LLMs", "Edge AI", "Flutter", "PyTorch", "ONNX Runtime"],
      code: "https://github.com",
      live: "https://example.com"
    },
    {
      id: "ai-interview",
      title: "AI Interview Coach",
      description: "Real-time mock interview platform powered by a fine-tuned Mistral 7B model, delivering adaptive conversations, speech analysis, and actionable interview feedback.",
      tags: ["Mistral 7B", "QLoRA", "Faster-Whisper", "Flask", "Speech AI"],
      code: "https://github.com",
      live: "https://example.com"
    },
    {
      id: "terrainseg",
      title: "TerrainSeg Pipeline",
      description: "Cross-domain off-road semantic segmentation system using SegFormer architectures for robust obstacle-aware scene understanding across diverse terrains and lighting conditions.",
      tags: ["Computer Vision", "SegFormer", "PyTorch", "Semantic Segmentation"],
      code: "https://github.com",
      live: "https://example.com"
    },
  ],

  education: [
    {
      degree: "B.Tech. in Mathematics and Computing",
      school: "Delhi Technological University",
      period: "2025 - 2029"
    }
  ]
};

export const asciiLogo = `
██████╗  █████╗  █████╗ ██████╗ ████████╗██╗  ██╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║
██████╔╝███████║███████║██████╔╝   ██║   ███████║
██╔═══╝ ██╔══██║██╔══██║██╔══██╗   ██║   ██╔══██║
██║     ██║  ██║██║  ██║██║  ██║   ██║   ██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
`;


const ProjectsList: React.FC<{ args: string[] }> = ({ args }) => {
  const targetId = args[1];

  if (targetId) {
    const proj = portfolioData.projects.find(p => p.id.toLowerCase() === targetId.toLowerCase());
    if (!proj) {
      return (
        <div style={{ color: 'var(--warning-color)' }}>
          Project "{targetId}" not found. Type `projects` to list all available projects.
        </div>
      );
    }
    return (
      <div style={{ marginTop: '8px' }} className="project-detail">
        <div className="project-title terminal-glow">{proj.title}</div>
        <div style={{ marginBottom: '8px' }}>ID: {proj.id}</div>
        <p className="project-desc" style={{ maxWidth: '600px', marginBottom: '12px' }}>{proj.description}</p>
        <div className="project-tags" style={{ marginBottom: '12px' }}>
          {proj.tags.map((tag, i) => (
            <span key={i} className="project-tag">{tag}</span>
          ))}
        </div>
        <div className="project-links" style={{ display: 'flex', gap: '16px' }}>
          <a href={proj.code} target="_blank" rel="noopener noreferrer">[GitHub Repository]</a>
          <a href={proj.live} target="_blank" rel="noopener noreferrer">[Live Demo]</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '8px' }}>
      <p style={{ marginBottom: '12px', opacity: 0.8 }}>
        To view project details, run: <span style={{ color: 'var(--primary-color)' }}>projects view &lt;project_id&gt;</span>
      </p>
      {portfolioData.projects.map((proj, idx) => (
        <div key={idx} className="project-card">
          <div className="project-title terminal-glow">{proj.title}</div>
          <p className="project-desc">{proj.description}</p>
          <div className="project-tags">
            {proj.tags.map((t, i) => <span key={i} className="project-tag">{t}</span>)}
          </div>
          <div className="project-links">
            <span style={{ color: 'var(--info-color)', cursor: 'pointer', textDecoration: 'underline' }}>
              ID: {proj.id}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'List all available shell commands.',
    execute: () => {
      return (
        <div>
          <p style={{ marginBottom: '8px', opacity: 0.8 }}>Available commands:</p>
          <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px' }}>
            <tbody>
              {Object.keys(commands).sort().map((cmdKey) => {
                const cmd = commands[cmdKey];
                return (
                  <tr key={cmd.name} style={{ height: '24px' }}>
                    <td style={{ width: '150px', color: 'var(--primary-color)', verticalAlign: 'top', fontWeight: 'bold' }}>
                      {cmd.name}
                    </td>
                    <td style={{ color: 'var(--text-color)', opacity: 0.9, verticalAlign: 'top' }}>
                      {cmd.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  },
  about: {
    name: 'about',
    description: 'Learn more about me and my background.',
    execute: () => {
      return (
        <div style={{ maxWidth: '700px', marginTop: '4px' }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>{portfolioData.name}</h2>
          <h3 style={{ color: 'var(--info-color)', marginBottom: '12px' }}>{portfolioData.title}</h3>
          <p style={{ lineHeight: '1.6', opacity: 0.9 }}>{portfolioData.about}</p>
        </div>
      );
    }
  },
  skills: {
    name: 'skills',
    description: 'Browse technical skills. Usage: `skills` or `skills <languages | frameworks | technologies>`.',
    execute: (args) => {
      const category = args[0]?.toLowerCase();

      if (!category) {
        return (
          <div style={{ marginTop: '4px' }}>
            <p style={{ marginBottom: '8px', opacity: 0.8 }}>
              Type <span style={{ color: 'var(--primary-color)' }}>skills &lt;category&gt;</span> to inspect specific tech directories:
            </p>
            <div style={{ paddingLeft: '12px' }}>
              <div style={{ marginBottom: '4px' }}>
                <span style={{ color: 'var(--primary-color)' }}>languages/</span> - Core programming languages
              </div>
              <div style={{ marginBottom: '4px' }}>
                <span style={{ color: 'var(--primary-color)' }}>frameworks/</span> - App frameworks & libraries
              </div>
              <div style={{ marginBottom: '4px' }}>
                <span style={{ color: 'var(--primary-color)' }}>technologies/</span> - Systems, automation, & cloud infrastructure
              </div>
            </div>
          </div>
        );
      }

      const categoryData = portfolioData.skills[category as keyof typeof portfolioData.skills];

      if (!categoryData) {
        return (
          <div style={{ color: 'var(--warning-color)', marginTop: '4px' }}>
            Directory "{category}" not found. Type `skills` to list available categories.
          </div>
        );
      }

      return (
        <div style={{ marginTop: '8px' }}>
          <div style={{ color: 'var(--info-color)', marginBottom: '8px', borderBottom: '1px dashed var(--border-color)', width: '320px', paddingBottom: '4px' }}>
            Directory: ~/skills/{category}/
          </div>
          <div style={{ paddingLeft: '12px' }}>
            {categoryData.map((skill, idx) => (
              <div key={idx} style={{ height: '28px', color: 'var(--success-color)' }}>
                {skill}.md
              </div>
            ))}
          </div>
        </div>
      );
    }
  },
  projects: {
    name: 'projects',
    description: 'Browse details of engineering projects. Usage: `projects` or `projects view <id>`.',
    execute: (args) => <ProjectsList args={args} />
  },
  contact: {
    name: 'contact',
    description: 'List active communication channels and networks.',
    execute: () => {
      return (
        <div style={{ marginTop: '4px' }}>
          <p style={{ marginBottom: '8px', opacity: 0.8 }}>You can reach me through any of the following ports:</p>
          <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '500px' }}>
            <tbody>
              {portfolioData.contact.map((c, i) => (
                <tr key={i} style={{ height: '28px' }}>
                  <td style={{ color: 'var(--primary-color)', width: '120px', fontWeight: 'bold' }}>{c.label}:</td>
                  <td className="project-links">
                    <a href={c.link} target="_blank" rel="noopener noreferrer">{c.value}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  },

  education: {
    name: 'education',
    description: 'Show academic qualifications.',
    execute: () => {
      return (
        <div style={{ marginTop: '4px' }}>
          {portfolioData.education.map((edu, idx) => (
            <div key={idx} style={{ maxWidth: '650px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{edu.degree}</span>
                <span style={{ color: 'var(--info-color)' }}>{edu.period}</span>
              </div>
              <div style={{ opacity: 0.9 }}>{edu.school}</div>
            </div>
          ))}
        </div>
      );
    }
  },

  clear: {
    name: 'clear',
    description: 'Clear the terminal screen buffer.',
    execute: () => null
  },
  snake: {
    name: 'snake',
    description: 'Play a retro text-based snake game inside the terminal.',
    execute: (_args, extra) => {
      if (extra && typeof extra.setInteractiveMode === 'function') {
        extra.setInteractiveMode('snake');
      }
      return (
        <TerminalSnake
          onGameOver={() => { }}
          onExit={() => {
            if (extra && typeof extra.setInteractiveMode === 'function') {
              extra.setInteractiveMode(null);
            }
          }}
        />
      );
    }
  }
};
