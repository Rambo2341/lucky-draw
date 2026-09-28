import { ProductArt } from "./art";

const products = [
  { name: "Aster Bottle", price: "$48", tag: "New" },
  { name: "Field Tote", price: "$120", tag: "" },
  { name: "Clay Vessel", price: "$64", tag: "Low stock" },
  { name: "Arc Lamp", price: "$210", tag: "" },
  { name: "Mesa Bottle", price: "$52", tag: "" },
  { name: "Canvas Carry", price: "$96", tag: "New" },
  { name: "Stone Bowl", price: "$38", tag: "" },
  { name: "Halo Lamp", price: "$185", tag: "" },
];

const ink = "text-[#111]";
const soft = "text-[#737373]";

function Bag({ count }: { count: number }) {
  return (
    <span className="relative inline-flex items-center gap-[0.5em]">
      <svg viewBox="0 0 24 24" className="size-[1.6em]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      <span className="grid size-[1.5em] place-items-center rounded-full bg-[#111] text-[0.8em] text-white">{count}</span>
    </span>
  );
}

export function NovaDesktop() {
  return (
    <div className={`preview-root h-[75em] overflow-hidden bg-[#fafaf9] ${ink}`}>
      <div className="bg-[#111] py-[0.7em] text-center text-[1.05em] tracking-[0.04em] text-white/80">Free delivery on orders over $100</div>
      <div className="flex items-center justify-between border-b border-[#e7e5e4] px-[4em] py-[1.8em]">
        <div className="flex items-center gap-[3.5em]">
          <span className="text-[2em] font-semibold tracking-[0.3em]">NOVA</span>
          <div className={`flex gap-[2.4em] text-[1.25em] ${soft}`}>
            <span className={ink}>Shop</span>
            <span>Collections</span>
            <span>Home</span>
            <span>Carry</span>
          </div>
        </div>
        <div className="flex items-center gap-[2em] text-[1.2em]">
          <span className={`w-[16em] rounded-full bg-[#f0efed] px-[1.2em] py-[0.6em] ${soft}`}>Search products</span>
          <Bag count={2} />
        </div>
      </div>

      <div className="px-[4em] pt-[3em]">
        <p className={`text-[1.1em] ${soft}`}>Shop / Collections / Autumn Essentials</p>
        <div className="mt-[1em] flex items-end justify-between">
          <h3 className="text-[4.2em] font-semibold leading-none tracking-[-0.04em]">Autumn Essentials</h3>
          <span className={`text-[1.2em] ${soft}`}>48 products</span>
        </div>
      </div>

      <div className="mt-[2.6em] grid grid-cols-[16em_1fr] gap-[3em] px-[4em]">
        <div className="space-y-[2.2em] text-[1.2em]">
          {[
            ["Category", ["All", "Home", "Carry", "Lighting"]],
            ["Price", ["Under $50", "$50 – $150", "$150+"]],
          ].map(([title, opts]) => (
            <div key={title as string}>
              <div className="mb-[0.8em] font-medium">{title as string}</div>
              <div className="space-y-[0.55em]">
                {(opts as string[]).map((o, i) => (
                  <div key={o} className="flex items-center gap-[0.7em]">
                    <span className={`size-[1em] rounded-[0.25em] border ${i === 1 ? "border-[#111] bg-[#111]" : "border-[#c7c5c2]"}`} />
                    <span className={i === 1 ? ink : soft}>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className="mb-[0.8em] font-medium">Colour</div>
            <div className="flex gap-[0.6em]">
              {["#c9b9a5", "#6f7d74", "#b98f82", "#8c86a0", "#111"].map((c) => (
                <span key={c} className="size-[1.6em] rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-[1.6em] gap-y-[2.4em]">
          {products.map((p, i) => (
            <div key={p.name}>
              <div className="relative aspect-[5/6] overflow-hidden rounded-[0.6em]">
                <ProductArt variant={i} className="absolute inset-0 size-full" />
                {p.tag && (
                  <span className="absolute left-[0.8em] top-[0.8em] rounded-full bg-white px-[0.8em] py-[0.3em] text-[0.95em]">{p.tag}</span>
                )}
              </div>
              <div className="mt-[0.9em] flex justify-between text-[1.2em]">
                <span>{p.name}</span>
                <span className="font-medium">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NovaMobile() {
  return (
    <div className={`phone-root relative h-[84.4em] overflow-hidden bg-[#fafaf9] ${ink}`}>
      <div className="flex items-center justify-between px-[2em] pb-[1.2em] pt-[5.4em]">
        <span className="flex flex-col gap-[0.5em]" aria-hidden>
          <span className="h-px w-[2.2em] bg-current" />
          <span className="h-px w-[2.2em] bg-current" />
        </span>
        <span className="text-[1.7em] font-semibold tracking-[0.3em]">NOVA</span>
        <span className="text-[1.1em]">
          <Bag count={2} />
        </span>
      </div>
      <div className="relative mx-[2em] aspect-square overflow-hidden rounded-[1em]">
        <ProductArt variant={2} className="absolute inset-0 size-full" />
        <div className="absolute inset-x-0 bottom-[1.2em] flex justify-center gap-[0.5em]">
          {[0, 1, 2, 3].map((d) => (
            <span key={d} className={`h-[0.5em] rounded-full ${d === 0 ? "w-[1.8em] bg-[#111]" : "w-[0.5em] bg-[#111]/25"}`} />
          ))}
        </div>
      </div>
      <div className="px-[2em] pt-[2em]">
        <p className={`text-[1.2em] ${soft}`}>Home · Ceramics</p>
        <div className="mt-[0.4em] flex items-baseline justify-between">
          <h3 className="text-[2.6em] font-semibold tracking-[-0.03em]">Clay Vessel</h3>
          <span className="text-[2em]">$64</span>
        </div>
        <p className={`mt-[1em] text-[1.35em] leading-[1.55] ${soft}`}>Hand-finished stoneware with a matte glaze. Each piece is slightly unique.</p>
        <div className="mt-[1.6em] text-[1.25em] font-medium">Size</div>
        <div className="mt-[0.7em] flex gap-[0.8em] text-[1.3em]">
          {["S", "M", "L"].map((s) => (
            <span key={s} className={`grid size-[2.8em] place-items-center rounded-[0.6em] border ${s === "M" ? "border-[#111] bg-[#111] text-white" : "border-[#d6d3d1]"}`}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-[1.2em] border-t border-[#e7e5e4] bg-white px-[2em] pb-[3.4em] pt-[1.4em]">
        <div className="text-[1.3em]">
          <div className={soft}>Total</div>
          <div className="text-[1.3em] font-semibold">$64</div>
        </div>
        <div className="flex-1 rounded-full bg-[#111] py-[1.1em] text-center text-[1.4em] text-white">Add to bag</div>
      </div>
    </div>
  );
}
