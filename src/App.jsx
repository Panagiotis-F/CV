import './index.css'
import { profile, skills, education, research, publications } from './data'

const Section = ({title, children, actions}) => (
  <div className="card">
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap'}}>
      <h2>{title}</h2>
      <div className="section-actions">{actions}</div>
    </div>
    {children}
  </div>
)

const Item = ({title, subtitle, extra}) => (
  <div className="item">
    <div className="title">{title}</div>
    {subtitle && <div className="muted">{subtitle}</div>}
    {extra}
  </div>
)

export default function App(){
  return (
    <div className="container">
      <header>
        <div className="identity">
          <div className="avatar">{profile.initials}</div>
          <div className="name">
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
          </div>
        </div>
        <div style={{display:'grid',gap:8, textAlign:'right'}}>
          <span className="pill">{profile.location}</span>
          <div className="muted">
            <a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href={profile.orcid} target="_blank" rel="noreferrer">ORCID</a> · <a href={profile.researchgate} target="_blank" rel="noreferrer">ResearchGate</a>
          </div>
          <div className="muted">{profile.phone}</div>
        </div>
      </header>

      <div className="grid">
        <div style={{display:'grid',gap:'1.2rem'}}>
          <Section title="About">
            <p className="muted">
              Researcher focusing on data management at the edge, anomaly detection, machine learning, and pervasive computing.
            </p>
          </Section>

          <Section title="Education">
            {education.map((e,i)=>(
              <Item key={i} title={e.degree} subtitle={`${e.period} — ${e.details}`} />
            ))}
          </Section>

          <Section title="Research Experience">
            <Item title="Current Affiliation(s)" extra={
              <div>{research.currentGroups.map((g,i)=>(<a key={i} href={g.link} target="_blank" rel="noreferrer" className="tag">{g.name}</a>))}</div>
            }/>
            <Item title="Previous Positions">
              <ul>
              {research.previous.map((r,i)=>(
                <li key={i}><span className="title">{r.role}</span>, {r.place} <span className="muted">({r.period})</span></li>
              ))}
              </ul>
            </Item>
            <Item title="Projects">
              <ul>
              {research.projects.map((p,i)=>(
                <li key={i}><span className="title">{p.name}</span>{p.note? <> — <span className="muted">{p.note}</span></>:null}</li>
              ))}
              </ul>
            </Item>
          </Section>

          <Section title="Publications">
            <div className="item">
              <div className="title">Conferences</div>
              {publications.conferences.map((p,i)=>(<div className="pub" key={i}>{p}</div>))}
            </div>
            <div className="item">
              <div className="title">Journals</div>
              {publications.journals.map((p,i)=>(<div className="pub" key={i}>{p}</div>))}
            </div>
          </Section>
        </div>

        <div style={{display:'grid',gap:'1.2rem'}}>
          <Section title="Skills" actions={[<button key="copy" className="btn" onClick={()=>navigator.clipboard.writeText(skills.programming.join(', '))}>Copy tech stack</button>]}>
            <div className="item">
              <div className="title">Programming</div>
              <div>{skills.programming.map((s,i)=>(<span key={i} className="tag">{s}</span>))}</div>
            </div>
            <div className="item">
              <div className="title">Platforms & Tools</div>
              <div>{skills.platforms.map((s,i)=>(<span key={i} className="tag">{s}</span>))}</div>
            </div>
            <div className="item">
              <div className="title">Languages</div>
              <div>{skills.languages.map((s,i)=>(<span key={i} className="tag">{s}</span>))}</div>
            </div>
          </Section>

          <Section title="Teaching">
            {research.teaching.map((t,i)=>(
              <Item key={i} title={t.course} subtitle={`${t.period} — ${t.dept}`} />
            ))}
          </Section>

          <Section title="Service">
            <Item title="Reviewer">
              <ul>
                {publications.reviewer.map((r,i)=>(<li key={i}>{r}</li>))}
              </ul>
            </Item>
          </Section>
        </div>
      </div>

      <footer>
        © {new Date().getFullYear()} {profile.name}. Built with React + Vite.
      </footer>
    </div>
  )
}
