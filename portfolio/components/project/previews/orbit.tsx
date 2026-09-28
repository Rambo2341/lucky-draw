const ink = "text-[#18181b]";
const soft = "text-[#71717a]";
const indigo = "#4f46e5";

const kpis = [
  { label: "Active projects", value: "24", delta: "+3" },
  { label: "Tasks completed", value: "1,284", delta: "+12%" },
  { label: "On-time rate", value: "92%", delta: "+4%" },
  { label: "Team hours", value: "642", delta: "−2%" },
];

const rows = [
  { name: "Website redesign", owner: "Maya", status: "On track", due: "Oct 14", progress: 72 },
  { name: "Mobile onboarding", owner: "Jonas", status: "At risk", due: "Oct 09", progress: 45 },
  { name: "Billing migration", owner: "Priya", status: "On track", due: "Oct 30", progress: 30 },
  { name: "Q4 analytics", owner: "Sam", status: "Done", due: "Sep 26", progress: 100 },
  { name: "Help centre", owner: "Lea", status: "Review", due: "Oct 18", progress: 88 },
];

const statusStyle: Record<string, string> = {
  "On track": "bg-[#ecfdf5] text-[#047857]",
  "At risk": "bg-[#fff1f2] text-[#be123c]",
  Done: "bg-[#f4f4f5] text-[#52525b]",
  Review: "bg-[#eef2ff] text-[#4338ca]",
};

const series = [30, 38, 34, 46, 44, 55, 52, 63, 60, 71, 69, 80];
const series2 = [22, 25, 28, 27, 33, 35, 38, 36, 42, 45, 44, 50];

function path(values: number[], w: number, h: number) {
  const max = 90;
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"}${((i / (values.length - 1)) * w).toFixed(1)} ${(h - (v / max) * h).toFixed(1)}`)
    .join(" ");
}

function Chart({ className }: { className?: string }) {
  const w = 600;
  const h = 180;
  const line = path(series, w, h);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={className} aria-hidden>
      {[0.25, 0.5, 0.75].map((y) => (
        <line key={y} x1="0" x2={w} y1={h * y} y2={h * y} stroke="#f0f0f1" strokeWidth="1" />
      ))}
      <path d={`${line} L${w} ${h} L0 ${h} Z`} fill={indigo} opacity="0.08" />
      <path d={line} fill="none" stroke={indigo} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      <path d={path(series2, w, h)} fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const nav = ["Overview", "Projects", "Tasks", "Reports", "Team", "Settings"];

export function OrbitDesktop() {
  return (
    <div className={`preview-root flex h-[75em] overflow-hidden bg-[#fafafa] ${ink}`}>
      <aside className="w-[20em] shrink-0 border-r border-[#e4e4e7] bg-white px-[1.6em] py-[2em]">
        <div className="flex items-center gap-[0.7em] px-[0.6em]">
          <span className="grid size-[2.2em] place-items-center rounded-full border-[0.25em]" style={{ borderColor: indigo }} />
          <span className="text-[1.6em] font-semibold tracking-[-0.02em]">Orbit</span>
        </div>
        <div className={`mt-[2em] rounded-[0.6em] border border-[#e4e4e7] px-[1em] py-[0.6em] text-[1.15em] ${soft}`}>Search ⌘K</div>
        <nav className="mt-[2em] space-y-[0.3em] text-[1.25em]">
          {nav.map((n, i) => (
            <div key={n} className={`rounded-[0.5em] px-[0.8em] py-[0.55em] ${i === 0 ? "bg-[#f4f4f5] font-medium" : soft}`}>
              {n}
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 px-[3em] py-[2.4em]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[2.4em] font-semibold tracking-[-0.03em]">Overview</div>
            <div className={`text-[1.2em] ${soft}`}>Last 30 days · All teams</div>
          </div>
          <div className="flex gap-[0.8em] text-[1.15em]">
            <span className="rounded-[0.6em] border border-[#e4e4e7] bg-white px-[1em] py-[0.6em]">Export</span>
            <span className="rounded-[0.6em] px-[1em] py-[0.6em] text-white" style={{ background: indigo }}>
              New project
            </span>
          </div>
        </div>
        <div className="mt-[2em] grid grid-cols-4 gap-[1.4em]">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-[0.9em] border border-[#e4e4e7] bg-white p-[1.4em]">
              <div className={`text-[1.1em] ${soft}`}>{k.label}</div>
              <div className="mt-[0.4em] flex items-baseline gap-[0.6em]">
                <span className="text-[2.4em] font-semibold tracking-[-0.03em]">{k.value}</span>
                <span className={`text-[1.1em] ${k.delta.startsWith("−") ? "text-[#be123c]" : "text-[#047857]"}`}>{k.delta}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[1.4em] rounded-[0.9em] border border-[#e4e4e7] bg-white p-[1.6em]">
          <div className="flex items-center justify-between text-[1.2em]">
            <span className="font-medium">Tasks completed</span>
            <span className={`flex gap-[1.2em] ${soft}`}>
              <span>7d</span>
              <span className={`${ink} font-medium`}>30d</span>
              <span>90d</span>
            </span>
          </div>
          <Chart className="mt-[1em] h-[14em] w-full" />
        </div>
        <div className="mt-[1.4em] rounded-[0.9em] border border-[#e4e4e7] bg-white">
          <div className="flex items-center gap-[0.8em] border-b border-[#e4e4e7] px-[1.6em] py-[1em] text-[1.1em]">
            <span className="font-medium">Projects</span>
            <span className="ml-auto rounded-full bg-[#f4f4f5] px-[0.8em] py-[0.25em]">Status: Active ×</span>
            <span className="rounded-full bg-[#f4f4f5] px-[0.8em] py-[0.25em]">Owner: Any</span>
          </div>
          <div className={`grid grid-cols-[2fr_1fr_1fr_1fr_1.4fr] px-[1.6em] py-[0.8em] text-[1.05em] ${soft}`}>
            <span>Name</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Due</span>
            <span>Progress</span>
          </div>
          {rows.map((r) => (
            <div key={r.name} className="grid grid-cols-[2fr_1fr_1fr_1fr_1.4fr] items-center border-t border-[#f4f4f5] px-[1.6em] py-[0.85em] text-[1.15em]">
              <span className="font-medium">{r.name}</span>
              <span className={soft}>{r.owner}</span>
              <span>
                <span className={`rounded-full px-[0.7em] py-[0.2em] text-[0.9em] ${statusStyle[r.status]}`}>{r.status}</span>
              </span>
              <span className={soft}>{r.due}</span>
              <span className="h-[0.45em] overflow-hidden rounded-full bg-[#f4f4f5]">
                <span className="block h-full rounded-full" style={{ width: `${r.progress}%`, background: indigo }} />
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export function OrbitMobile() {
  return (
    <div className={`phone-root relative h-[84.4em] overflow-hidden bg-[#fafafa] ${ink}`}>
      <div className="flex items-center justify-between px-[2em] pb-[1em] pt-[5.4em]">
        <span className="text-[2.4em] font-semibold tracking-[-0.03em]">Overview</span>
        <span className="rounded-[0.6em] px-[1em] py-[0.5em] text-[1.2em] text-white" style={{ background: indigo }}>
          New
        </span>
      </div>
      <div className="grid grid-cols-2 gap-[1em] px-[2em]">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-[1em] border border-[#e4e4e7] bg-white p-[1.3em]">
            <div className={`text-[1.1em] ${soft}`}>{k.label}</div>
            <div className="mt-[0.3em] text-[2.1em] font-semibold tracking-[-0.03em]">{k.value}</div>
          </div>
        ))}
      </div>
      <div className="mx-[2em] mt-[1em] rounded-[1em] border border-[#e4e4e7] bg-white p-[1.3em]">
        <div className="text-[1.2em] font-medium">Tasks completed</div>
        <Chart className="mt-[0.8em] h-[9em] w-full" />
      </div>
      <div className="mt-[1.6em] space-y-[0.9em] px-[2em]">
        {rows.slice(0, 3).map((r) => (
          <div key={r.name} className="rounded-[1em] border border-[#e4e4e7] bg-white p-[1.3em]">
            <div className="flex items-center justify-between">
              <span className="text-[1.35em] font-medium">{r.name}</span>
              <span className={`rounded-full px-[0.7em] py-[0.2em] text-[1em] ${statusStyle[r.status]}`}>{r.status}</span>
            </div>
            <div className={`mt-[0.4em] text-[1.15em] ${soft}`}>
              {r.owner} · Due {r.due}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-[#e4e4e7] bg-white pb-[3.2em] pt-[1.2em] text-[1.1em]">
        {["Overview", "Projects", "Tasks", "Team"].map((t, i) => (
          <span key={t} className="flex flex-col items-center gap-[0.4em]" style={{ color: i === 0 ? indigo : "#a1a1aa" }}>
            <span className="size-[1.6em] rounded-[0.5em] border-[0.15em] border-current" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
