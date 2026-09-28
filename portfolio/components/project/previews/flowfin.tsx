const mint = "#6ee7b7";
const soft = "text-[#8b8d98]";

const week = [42, 68, 35, 90, 54, 120, 76];
const days = ["M", "T", "W", "T", "F", "S", "S"];

const categories = [
  { name: "Groceries", spent: 412, budget: 600, color: "#6ee7b7" },
  { name: "Transport", spent: 138, budget: 200, color: "#93c5fd" },
  { name: "Dining out", spent: 264, budget: 250, color: "#fca5a5" },
];

const transactions = [
  { day: "Today", items: [
    { name: "Green Market", cat: "Groceries", amount: -38.4, color: "#6ee7b7" },
    { name: "Metro card", cat: "Transport", amount: -12.0, color: "#93c5fd" },
  ] },
  { day: "Yesterday", items: [
    { name: "Salary", cat: "Income", amount: 2850.0, color: mint },
    { name: "Noodle Bar", cat: "Dining out", amount: -24.5, color: "#fca5a5" },
    { name: "Bookshop", cat: "Shopping", amount: -18.99, color: "#fcd34d" },
  ] },
  { day: "Mon, 21 Sep", items: [
    { name: "Electricity", cat: "Bills", amount: -64.2, color: "#c4b5fd" },
    { name: "Green Market", cat: "Groceries", amount: -52.1, color: "#6ee7b7" },
  ] },
];

function TabBar({ active }: { active: number }) {
  const tabs = ["Home", "Activity", "Budgets", "Profile"];
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-white/5 bg-[#0e0f12]/95 pb-[3.2em] pt-[1.2em] text-[1.1em]">
      {tabs.map((t, i) => (
        <span key={t} className="flex flex-col items-center gap-[0.4em]" style={{ color: i === active ? mint : "#6b6d78" }}>
          <span className="size-[1.6em] rounded-[0.5em] border-[0.15em] border-current" />
          {t}
        </span>
      ))}
    </div>
  );
}

function Status() {
  return (
    <div className="flex items-center justify-between px-[2.4em] pt-[1.6em] text-[1.2em] font-medium text-white">
      <span>9:41</span>
      <span className="flex gap-[0.4em]" aria-hidden>
        <span className="h-[0.8em] w-[1.4em] rounded-[0.2em] bg-white/90" />
      </span>
    </div>
  );
}

const money = (n: number) =>
  `${n < 0 ? "−" : "+"}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function FlowfinDashboard() {
  const max = Math.max(...week);
  return (
    <div className="phone-root relative h-[84.4em] overflow-hidden bg-[#0e0f12] text-white">
      <Status />
      <div className="px-[2.2em] pt-[3.2em]">
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-[1.2em] ${soft}`}>Good morning</div>
            <div className="text-[1.7em] font-semibold">Alex</div>
          </div>
          <span className="size-[3.6em] rounded-full bg-gradient-to-br from-[#2a2d35] to-[#1a1c21]" />
        </div>
        <div className="mt-[2.6em] rounded-[1.6em] bg-[#16181d] p-[2em]">
          <div className={`text-[1.2em] ${soft}`}>Total balance</div>
          <div className="mt-[0.3em] text-[3.6em] font-semibold tracking-[-0.03em]">$4,280.50</div>
          <div className="mt-[0.6em] text-[1.2em]" style={{ color: mint }}>+ $312.40 this month</div>
          <div className="mt-[1.8em] flex h-[0.7em] overflow-hidden rounded-full bg-white/5">
            <span className="h-full w-[58%]" style={{ background: mint }} />
          </div>
          <div className={`mt-[0.8em] flex justify-between text-[1.1em] ${soft}`}>
            <span>$1,742 spent</span>
            <span>$3,000 budget</span>
          </div>
        </div>
        <div className="mt-[2.4em] flex items-baseline justify-between">
          <span className="text-[1.5em] font-semibold">This week</span>
          <span className={`text-[1.15em] ${soft}`}>$485 spent</span>
        </div>
        <div className="mt-[1.4em] flex h-[12em] items-end justify-between gap-[1em]">
          {week.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-[0.6em]">
              <div
                className="w-full rounded-[0.5em]"
                style={{ height: `${(v / max) * 9.5}em`, background: i === 5 ? mint : "#262932" }}
              />
              <span className={`text-[1em] ${soft}`}>{days[i]}</span>
            </div>
          ))}
        </div>
        <div className="mt-[2.2em] text-[1.5em] font-semibold">Budgets</div>
        <div className="mt-[1.2em] space-y-[1.4em]">
          {categories.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-[1.25em]">
                <span>{c.name}</span>
                <span className={c.spent > c.budget ? "text-[#fca5a5]" : soft}>
                  ${c.spent} / ${c.budget}
                </span>
              </div>
              <div className="mt-[0.6em] h-[0.5em] overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, (c.spent / c.budget) * 100)}%`, background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={0} />
    </div>
  );
}

export function FlowfinTransactions() {
  return (
    <div className="phone-root relative h-[84.4em] overflow-hidden bg-[#0e0f12] text-white">
      <Status />
      <div className="px-[2.2em] pt-[3.2em]">
        <div className="text-[2.6em] font-semibold tracking-[-0.03em]">Activity</div>
        <div className={`mt-[1.4em] rounded-[1em] bg-[#16181d] px-[1.3em] py-[1em] text-[1.3em] ${soft}`}>Search transactions</div>
        <div className="mt-[1.4em] flex gap-[0.7em] text-[1.15em]">
          {["All", "Expenses", "Income"].map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-[1.1em] py-[0.45em] ${i === 0 ? "text-[#0e0f12]" : "bg-[#16181d] text-[#b4b6bf]"}`}
              style={i === 0 ? { background: mint } : undefined}
            >
              {f}
            </span>
          ))}
        </div>
        <div className="mt-[1.6em] space-y-[1.8em]">
          {transactions.map((g) => (
            <div key={g.day}>
              <div className={`text-[1.1em] uppercase tracking-[0.1em] ${soft}`}>{g.day}</div>
              <div className="mt-[0.8em] space-y-[1.1em]">
                {g.items.map((t, i) => (
                  <div key={i} className="flex items-center gap-[1.2em]">
                    <span className="grid size-[3.6em] shrink-0 place-items-center rounded-[1em] bg-[#16181d]">
                      <span className="size-[1.1em] rounded-full" style={{ background: t.color }} />
                    </span>
                    <div className="flex-1">
                      <div className="text-[1.35em]">{t.name}</div>
                      <div className={`text-[1.1em] ${soft}`}>{t.cat}</div>
                    </div>
                    <div className="text-[1.35em] font-medium" style={{ color: t.amount > 0 ? mint : "#e5e7eb" }}>
                      {money(t.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={1} />
    </div>
  );
}
