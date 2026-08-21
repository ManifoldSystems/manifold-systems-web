import { StrictMode, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowRight, ExternalLink, Github, Menu, X } from "lucide-react";
import "./styles.css";

// The GitHub org holds the four website repos. The three Rust projects are published
// from their author's account, so the org link and the project links are different destinations.
const orgUrl = "https://github.com/ManifoldSystems";
const projectOwner = "algonacci";
const projectsUrl = `https://github.com/${projectOwner}`;
const nav = [
  ["Projects", "#projects"], ["Research", "#research"], ["Systems", "#systems"],
  ["Open Source", "#open-source"], ["About", "#about"],
] as const;
const slug = (name: string) => `${projectOwner}/${name.toLowerCase()}`;
const repo = (name: string) => `${projectsUrl}/${name.toLowerCase()}`;

function Mark({ small = false }: { small?: boolean }) {
  return <svg className={small ? "mark mark-small" : "mark"} viewBox="0 0 34 34" aria-hidden="true"><path d="M3 8h9l5 9 5-9h9M3 26h9l5-9 5 9h9"/><circle cx="3" cy="8" r="2"/><circle cx="31" cy="8" r="2"/><circle cx="3" cy="26" r="2"/><circle cx="31" cy="26" r="2"/><circle cx="17" cy="17" r="2.5"/></svg>;
}

function External({ href, children, className = "text-link", label }: { href: string; children: React.ReactNode; className?: string; label?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer" aria-label={label}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <header className="site-header">
    <a href="#top" className="wordmark" aria-label="Manifold Systems, home"><Mark small/><span>MANIFOLD SYSTEMS</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([n, h]) => <a key={n} href={h}>{n}</a>)}</nav>
    <div className="header-actions"><External href={orgUrl} className="github-link" label="Manifold Systems on GitHub"><Github size={15}/> GitHub</External><a className="header-cta" href="#projects">Explore projects <ArrowRight size={14}/></a></div>
    <button ref={menuButton} className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(([n,h]) => <a key={n} href={h} onClick={() => setOpen(false)}>{n}<ArrowRight size={16}/></a>)}<External href={orgUrl} className="mobile-github"><Github size={16}/> GitHub</External></nav>}
  </header>;
}

const graphNodes = ["Human", "Agent", "Planning", "Tools", "Execution", "Environment", "Observation", "Reasoning"];
function SystemsGraph() {
  const pts = [[250,35],[407,90],[450,205],[380,322],[250,370],[120,322],[50,205],[93,90]];
  return <div className="systems-graph" aria-label="A continuous system from human to agent, planning, tools, execution, environment, observation and reasoning, then back to human" role="img">
    <svg viewBox="0 0 500 405" aria-hidden="true"><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0l10 5-10 5z" fill="currentColor"/></marker></defs><path className="graph-ring" d="M250 35L407 90L450 205L380 322L250 370L120 322L50 205L93 90Z"/>{pts.map((p,i) => { const next=pts[(i+1)%pts.length]; return <g key={graphNodes[i]}><circle className={`signal signal-${i%4}`} cx={p[0]} cy={p[1]} r="3"><animateMotion dur={`${12+i}s`} repeatCount="indefinite" path={`M0 0 L${next[0]-p[0]} ${next[1]-p[1]}`}/></circle><circle className="graph-dot" cx={p[0]} cy={p[1]} r="5"/><text x={p[0]} y={p[1]+(p[1] < 80 ? -15 : 23)} textAnchor="middle">{graphNodes[i]}</text></g>})}<text className="graph-core" x="250" y="197" textAnchor="middle">MANIFOLD</text><text className="graph-core-sub" x="250" y="216" textAnchor="middle">SYSTEMS / 01</text></svg>
    <div className="mobile-flow">{graphNodes.map((n,i)=><div key={n}><span>{String(i+1).padStart(2,"0")}</span>{n}{i<graphNodes.length-1&&<ArrowDown size={14}/>}</div>)}</div>
  </div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="eyebrow"><span/> {children}</div>; }
function SectionHeading({ eyebrow, children, intro }: { eyebrow?: string; children: React.ReactNode; intro?: string }) { return <div className="section-heading">{eyebrow&&<Eyebrow>{eyebrow}</Eyebrow>}<h2>{children}</h2>{intro&&<p>{intro}</p>}</div>; }

function Hero() { return <section className="hero" id="top"><div className="hero-grid"/><div className="hero-copy"><Eyebrow>OPEN SYSTEMS / AI AGENTS / SYSTEMS AROUND AGENTS</Eyebrow><h1>Building systems<br/>for humans and machines.</h1><p>Open-source software for the systems around AI agents — terminal coding, chat gateways, and engineering workflow orchestration — as shipped in Kamui, Kumo, and Kage.</p><div className="cta-row"><a className="button primary" href="#projects">Explore projects <ArrowDown size={15}/></a><External href={orgUrl} className="button secondary"><Github size={15}/> View on GitHub</External></div></div><SystemsGraph/><div className="hero-index mono">MS / INDEX 001<br/><span>OPEN SYSTEMS</span></div></section>; }

function Opening() { return <section className="opening section"><div className="opening-index mono">01—05<br/>POSITION</div><div><h2>Intelligence is useful.<br/><span>Systems make it capable.</span></h2><p>Language models can reason about problems.<br/>Agents need systems that allow them to act on those decisions.<br/><strong>Manifold builds those systems.</strong></p></div></section>; }

function Terminal() { return <div className="terminal" aria-label="Kamui terminal example"><div className="terminal-bar"><i/><i/><i/><span>kamui — ~/code/kamui</span></div><pre><span className="dim">$</span> kamui

<span className="accent">&gt;</span> what does the agent loop in src/chat.rs do?

<span className="dim">  </span><span className="accent">→</span> <span className="dim">grep(pattern="agent loop", path="src")</span>
<span className="dim">  </span><span className="accent">→</span> <span className="dim">read_file(path="src/chat.rs")</span>
<span className="dim">  </span><span className="accent">→</span> <span className="dim">run_command(command="cargo test")</span>
<span className="dim">    approve? [y/N/a]</span> y

It streams the model's reply, dispatches each tool the
model asks for, feeds the result back, and keeps going
until a final answer.<span className="cursor">_</span></pre></div>; }

function KumoDiagram() { const items=["OWNER","TELEGRAM","KUMO","AGENT LOOP","TOOLS / KAMUI / MCP"]; return <div className="linear-diagram kumo-diagram" role="img" aria-label="The paired owner messages a private Telegram bot; Kumo runs an agent loop over workspace tools, Kamui, and MCP servers"><div className="diagram-rail"><i/></div>{items.map((x,i)=><div className={x==="KUMO"?"linear-node featured":"linear-node"} key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div>; }
function KageLoop() { const items=["PLAN","EXECUTE","TEST","REVIEW","FIX"]; return <div className="loop-wrap" role="img" aria-label="Kage's loop: plan, execute, test, review. A failed review sends the named findings back as a fix, which returns to test, up to a hard iteration cap."><svg viewBox="0 0 500 370" aria-hidden="true"><path className="loop-path" d="M250 45 C400 45 455 135 425 230 C395 325 285 345 180 315 C75 285 35 190 80 105 C115 40 180 35 250 45Z"/><circle className="loop-signal" r="5"><animateMotion dur="14s" repeatCount="indefinite" path="M250 45 C400 45 455 135 425 230 C395 325 285 345 180 315 C75 285 35 190 80 105 C115 40 180 35 250 45Z"/></circle>{[[250,45],[425,170],[335,325],[140,300],[70,145]].map((p,i)=><g key={items[i]}><circle className="loop-node" cx={p[0]} cy={p[1]} r="22"/><text x={p[0]} y={p[1]+4} textAnchor="middle">{String(i+1).padStart(2,"0")}</text><text className="loop-label" x={p[0]} y={p[1]+(i===0?-36:43)} textAnchor="middle">{items[i]}</text></g>)}<text className="loop-center" x="250" y="184" textAnchor="middle">ITERATE</text><text className="graph-core-sub" x="250" y="204" textAnchor="middle">FIX RETURNS TO TEST</text></svg><div className="mobile-flow">{items.map((n,i)=><div key={n}><span>{String(i+1).padStart(2,"0")}</span>{n}{i<items.length-1&&<ArrowDown size={14}/>}</div>)}<b>↺ BACK TO TEST</b></div></div>; }

function ProjectLinks({ name }: { name: string }) { return <div className="project-links"><External href={repo(name)} className="text-link" label={`Explore ${name} on GitHub`}>Explore {name} <ArrowRight size={16}/></External><External href={repo(name)} className="quiet-link" label={`${name} GitHub repository`}><Github size={15}/> GitHub</External></div>; }
function Projects() { return <section className="section projects" id="projects"><SectionHeading eyebrow="MANIFOLD PROJECTS">Systems we’re building.</SectionHeading>
  <article className="project project-kamui"><div className="project-copy"><div className="project-number mono">PROJECT / 01</div><div className="project-label">RUST / TERMINAL / CODING AGENT</div><h3>Kamui</h3><p className="lead">A provider-agnostic, repository-aware coding agent for the terminal.</p><p>Written in Rust, Kamui explores your repository, reads files, runs commands, and edits code — with every side effect gated behind your approval. Responses stream from any OpenAI-compatible model, a single command switches provider and model mid-session, long conversations compact themselves, and MCP servers can contribute their own tools.</p><ProjectLinks name="Kamui"/></div><Terminal/></article>
  <article className="project project-kumo"><KumoDiagram/><div className="project-copy"><div className="project-number mono">PROJECT / 02</div><div className="project-label">RUST / TELEGRAM / AGENT GATEWAY</div><h3>Kumo</h3><p className="lead">A personal agent that answers in a chat app you already use.</p><p>Kumo is a minimal personal agent gateway built on tools, MCP, and Kamui delegation. Onboarding pairs a private Telegram bot to a single owner, and from there it inspects a workspace, runs commands behind an approval tap, remembers facts, and schedules tasks for later. It owns communication, identity, permissions, and task lifecycle — and hands coding work to Kamui rather than reimplementing it.</p><ProjectLinks name="Kumo"/></div></article>
  <article className="project project-kage"><div className="project-copy"><div className="project-number mono">PROJECT / 03</div><div className="project-label">RUST / ORCHESTRATION / AGENT ROLES</div><h3>Kage</h3><p className="lead">An engineering workflow orchestrator for the coding agents you already have.</p><p>Kage implements no coding agent of its own — it drives the harnesses already installed on your machine. A planner writes the plan, an executor implements it, your own test suite decides whether it works, and a reviewer judges the diff. A failed review sends its named findings back for a fix and the loop runs again, up to a hard iteration cap. Agents share no chat history; context moves between them as artifacts on disk.</p><ProjectLinks name="Kage"/></div><KageLoop/></article>
</section>; }

const ecosystemText = { Kumo:"A private Telegram bot paired to one owner.", Kamui:"A coding agent in the terminal, gated on approval.", Kage:"Plan, execute, test, review — across separate agents." };
type EcosystemKey = keyof typeof ecosystemText;
function Ecosystem() { const [active,setActive]=useState<EcosystemKey>("Kumo"); const activate=(k:EcosystemKey)=>(e:KeyboardEvent<SVGGElement>)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setActive(k)}}; return <section className="section ecosystem" id="systems"><SectionHeading eyebrow="THE ECOSYSTEM">Different systems.<br/>One direction.</SectionHeading><div className="ecosystem-layout"><div className="eco-diagram"><svg viewBox="0 0 720 560" role="img" aria-labelledby="eco-title eco-desc"><title id="eco-title">Manifold project ecosystem</title><desc id="eco-desc">Kumo reaches a person over Telegram and Kamui reaches them in the terminal. Kage drives coding agents against code, tools, and systems.</desc><path className="eco-line" d="M360 70V145M360 145H195V235M360 145H525V235M195 285V350H360M525 285V350H360M360 350V420M360 420H175V490M360 420V490M360 420H545V490"/><text className="eco-human" x="360" y="55" textAnchor="middle">HUMAN</text>{([...[195,525,360]] as number[]).map(()=>null)}<EcoNode x={195} y={260} name="Kumo" sub="TELEGRAM GATEWAY" active={active==="Kumo"} set={setActive} keyDown={activate("Kumo")}/><EcoNode x={525} y={260} name="Kamui" sub="TERMINAL AGENT" active={active==="Kamui"} set={setActive} keyDown={activate("Kamui")}/><text className="eco-human" x="360" y="365" textAnchor="middle">AGENTS</text><EcoNode x={360} y={410} name="Kage" sub="WORKFLOW ORCHESTRATOR" active={active==="Kage"} set={setActive} keyDown={activate("Kage")}/>{[175,360,545].map((x,i)=><g key={x}><rect className="eco-output" x={x-60} y="475" width="120" height="45"/><text x={x} y="502" textAnchor="middle">{["CODE","TOOLS","SYSTEMS"][i]}</text></g>)}</svg><div className="eco-readout"><span>ACTIVE EXPLORATION</span><strong>{active.toUpperCase()}</strong><p>{ecosystemText[active]}</p></div></div><div className="eco-copy"><p>Each project is independent. Together, they represent different pieces of a broader question:</p><blockquote>What does software look like when AI becomes an active participant rather than just an interface?</blockquote><div className="eco-notes">{Object.entries(ecosystemText).map(([k,v])=><button key={k} onClick={()=>setActive(k as EcosystemKey)} className={active===k?"active":""}><b>{k}</b><span>{v}</span></button>)}</div></div></div></section>; }
function EcoNode({x,y,name,sub,active,set,keyDown}:{x:number;y:number;name:EcosystemKey;sub:string;active:boolean;set:(k:EcosystemKey)=>void;keyDown:(e:KeyboardEvent<SVGGElement>)=>void}) { return <g className={`eco-node ${active?"active":""}`} role="button" tabIndex={0} aria-label={`${name}: ${sub}`} onClick={()=>set(name)} onKeyDown={keyDown}><rect x={x-86} y={y-31} width="172" height="62"/><text x={x} y={y-2} textAnchor="middle">{name.toUpperCase()}</text><text className="eco-sub" x={x} y={y+15} textAnchor="middle">{sub}</text></g>; }

const principles=[
 ["Tools over chat.","Agents become useful when they can interact with real systems."],
 ["Loops over one-shot generation.","Complex work requires iteration, observation, and correction."],
 ["Interfaces already exist.","Humans shouldn’t need another application just to interact with an agent."],
 ["Models should be replaceable.","Systems should not depend permanently on one model provider."],
 ["Humans remain in the loop.","Autonomy should increase capability, not eliminate visibility or control."],
 ["Open systems matter.","Important infrastructure should be inspectable, extensible, and hackable."],
];
function Philosophy(){return <section className="section philosophy"><SectionHeading eyebrow="WHAT WE BELIEVE">Agents need more<br/>than intelligence.</SectionHeading><div className="principles">{principles.map(([h,p],i)=><article key={h}><span>{String(i+1).padStart(2,"0")}</span><h3>{h}</h3><p>{p}</p></article>)}</div></section>}
const layers=[
 ["MODEL LAYER","Reasoning · Language Models · Planning Models"], ["AGENT LAYER","Context · Memory · Planning · State"],
 ["SYSTEM LAYER","Tools · Execution · Communication · Orchestration"], ["ENVIRONMENT","Terminal · Filesystem · Git · APIs · Messaging · Infrastructure"], ["HUMAN","Developer · Operator · User"],
];
function Architecture(){return <section className="section architecture"><div className="architecture-copy"><SectionHeading eyebrow="SYSTEMS ARCHITECTURE">The agent is only<br/>one layer.</SectionHeading><p>Manifold focuses heavily on the systems surrounding intelligent models—the layers that turn reasoning into action, feedback, and collaboration.</p></div><div className="stack" role="img" aria-label="Architecture layers from model through agent, system, environment, to human"><div className="stack-signal"/>{layers.map(([h,p],i)=><div className={`stack-layer layer-${i}`} key={h}><span>0{i+1}</span><h3>{h}</h3><p>{p}</p></div>)}</div></section>}

const repos=["kamui","kumo","kage"];
function OpenSource(){return <section className="open-source" id="open-source"><div className="section open-inner"><SectionHeading eyebrow="OPEN SOURCE" intro="Our projects are built to be inspected, modified, extended, and experimented with.">Built in the open.</SectionHeading><div className="repo-list">{repos.map((r,i)=><External href={repo(r)} className="repo-row" key={r} label={`Open ${slug(r)} on GitHub`}><span className="repo-index">0{i+1}</span><Github/><strong>{projectOwner}/<b>{r}</b></strong><span className="repo-status">PUBLIC REPOSITORY</span><ExternalLink/></External>)}</div><External href={projectsUrl} className="button light">Explore on GitHub <ArrowRight size={15}/></External></div></section>}
const research=[
 ["Agent Runtime","How should long-running agents manage state, tools, and execution?"], ["Agent Communication","How should agents interact through existing human communication systems?"],
 ["Autonomous Engineering","How can software agents plan, implement, test, review, and iterate reliably?"], ["Model Independence","How can agent infrastructure remain portable across different models and providers?"],
 ["Human-Agent Interaction","Where should humans observe, intervene, approve, or collaborate?"],
];
function Research(){return <section className="section research" id="research"><SectionHeading eyebrow="RESEARCH / EXPERIMENTS">Questions we’re exploring.</SectionHeading><div className="research-grid">{research.map(([h,p],i)=><article key={h}><header><span>NOTE / {String(i+1).padStart(3,"0")}</span><i>OPEN QUESTION</i></header><h3>{h}</h3><p>{p}</p><footer>MANIFOLD SYSTEMS — RESEARCH ENGINEERING</footer></article>)}</div></section>}
function InternalTerminal(){return <section className="section internal"><div className="internal-label"><Eyebrow>EXPERIMENTAL INTERFACE</Eyebrow><p>A view from inside the systems lab.</p></div><div className="internal-terminal"><div className="terminal-title">MANIFOLD SYSTEMS <span>INTERNAL / ACTIVE</span></div><pre><span className="prompt">&gt;</span> projects

KAMUI      <i>active — v0.1</i>
KUMO       <i>active — v0.1</i>
KAGE       <i>active — v0.1</i>

<span className="prompt">&gt;</span> focus

agent-runtime
autonomous-engineering
human-agent-systems
tool-execution
communication-gateways

<span className="prompt">&gt;</span> status

building.<span className="cursor">_</span></pre></div></section>}
function About(){return <section className="section about" id="about"><div className="about-mark"><Mark/><span>INDEPENDENT / OPEN SOURCE<br/>SYSTEMS ORGANIZATION</span></div><div><Eyebrow>ABOUT</Eyebrow><h2>Manifold Systems</h2><p className="about-lead">Manifold Systems is an independent software systems organization exploring how AI agents interact with computers, software, infrastructure, and humans.</p><p>We build open-source tools and experimental systems around agent runtimes, communication, engineering workflows, and human-machine interaction. Product repositories live under <code>algonacci/*</code>; this organization holds the project websites.</p><div className="assumption"><span>OUR ASSUMPTION</span><strong>The future of AI is not only about better models.<br/>It is also about better systems around them.</strong></div></div></section>}
function Final(){return <section className="final"><span className="mono">MANIFOLD / CONTINUE</span><h2>We’re building the systems<br/>around intelligence.<i className="cursor">_</i></h2><div className="final-projects"><External href={repo("kamui")}>Kamui</External><External href={repo("kumo")}>Kumo</External><External href={repo("kage")}>Kage</External></div><a href="#projects" className="button primary">Explore the projects <ArrowRight size={15}/></a></section>}
function Footer(){return <footer className="footer"><div className="footer-top"><div><a href="#top" className="wordmark"><Mark small/>MANIFOLD SYSTEMS</a><p>Open systems for humans and machines.</p></div><div className="footer-links"><div><span>NAVIGATION</span>{nav.filter(([n])=>n!=="Systems").map(([n,h])=><a href={h} key={n}>{n}</a>)}</div><div><span>PROJECTS</span>{repos.map(r=><External href={repo(r)} key={r}>{r[0].toUpperCase()+r.slice(1)}</External>)}</div><div><span>EXTERNAL</span><External href={orgUrl}>GitHub ↗</External></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Manifold Systems</span><span>BUILDING IN THE OPEN / MS—001</span><span>Manifold Systems</span></div></footer>}
function App(){return <><Header/><main><Hero/><Opening/><Projects/><Ecosystem/><Philosophy/><Architecture/><OpenSource/><Research/><InternalTerminal/><About/><Final/></main><Footer/></>}

createRoot(document.getElementById("root") as HTMLElement).render(<StrictMode><App/></StrictMode>);
