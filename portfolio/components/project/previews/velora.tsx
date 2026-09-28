import { HouseArt } from "./art";

const listings = [
  { name: "The Linden House", place: "Hampstead, London", price: "£2,450,000", beds: 4, baths: 3, area: 312 },
  { name: "Cedar Court", place: "Richmond, London", price: "£1,890,000", beds: 3, baths: 2, area: 228 },
  { name: "Maison Aubrey", place: "Chelsea, London", price: "£3,200,000", beds: 5, baths: 4, area: 405 },
];

const ink = "text-[#1c1a17]";
const soft = "text-[#6b655c]";

function Heart() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.4em]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

export function VeloraDesktop() {
  return (
    <div className={`preview-root h-[75em] overflow-hidden bg-[#efeae3] ${ink}`}>
      <div className="flex items-center justify-between px-[5em] py-[2.4em]">
        <span className="font-serif text-[2.2em] tracking-[0.18em]">VELORA</span>
        <div className={`flex gap-[3em] text-[1.3em] ${soft}`}>
          <span className={ink}>Buy</span>
          <span>Rent</span>
          <span>Sell</span>
          <span>Journal</span>
        </div>
        <span className="rounded-full bg-[#1c1a17] px-[1.6em] py-[0.8em] text-[1.2em] text-[#efeae3]">Schedule viewing</span>
      </div>

      <div className="grid grid-cols-[1fr_1.15fr] gap-[4em] px-[5em]">
        <div className="pt-[3em]">
          <p className={`text-[1.1em] uppercase tracking-[0.25em] ${soft}`}>Private residences</p>
          <h3 className="mt-[1em] font-serif text-[5.4em] leading-[1.02] tracking-[-0.02em]">Homes of quiet distinction.</h3>
          <p className={`mt-[1.4em] max-w-[32em] text-[1.35em] leading-[1.6] ${soft}`}>
            A curated collection of architecturally significant homes across London and the Home Counties.
          </p>
          <div className="mt-[3em] flex items-stretch overflow-hidden rounded-[1em] border border-[#d8d0c4] bg-[#f7f4ef] text-[1.2em]">
            {[
              ["Location", "Hampstead"],
              ["Price", "£1m – £3m"],
              ["Bedrooms", "3+"],
            ].map(([k, v]) => (
              <div key={k} className="flex-1 border-r border-[#e2dbd0] px-[1.3em] py-[1em]">
                <div className={`text-[0.8em] uppercase tracking-[0.12em] ${soft}`}>{k}</div>
                <div className="mt-[0.3em]">{v}</div>
              </div>
            ))}
            <div className="grid place-items-center bg-[#1c1a17] px-[1.8em] text-[#efeae3]">Search</div>
          </div>
        </div>
        <div className="relative h-[38em] overflow-hidden rounded-[1.2em]">
          <HouseArt variant={0} className="absolute inset-0 size-full" />
          <div className="absolute bottom-[1.6em] left-[1.6em] rounded-[0.8em] bg-[#f7f4ef]/95 px-[1.4em] py-[1em] text-[1.15em]">
            <div className="font-serif text-[1.3em]">The Linden House</div>
            <div className={soft}>Hampstead · £2,450,000</div>
          </div>
        </div>
      </div>

      <div className="mt-[4em] flex items-end justify-between px-[5em]">
        <h4 className="font-serif text-[2.4em]">Featured residences</h4>
        <span className={`text-[1.2em] ${soft}`}>128 properties · Sort: Newest</span>
      </div>
      <div className="mt-[1.8em] grid grid-cols-3 gap-[2em] px-[5em]">
        {listings.map((l, i) => (
          <div key={l.name} className="overflow-hidden rounded-[1em] bg-[#f7f4ef]">
            <div className="relative h-[13em]">
              <HouseArt variant={i + 1} className="absolute inset-0 size-full" />
              <span className="absolute right-[1em] top-[1em] grid size-[3em] place-items-center rounded-full bg-[#f7f4ef]/90">
                <Heart />
              </span>
            </div>
            <div className="flex items-baseline justify-between px-[1.4em] py-[1.2em]">
              <span className="font-serif text-[1.5em]">{l.name}</span>
              <span className="text-[1.2em]">{l.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VeloraMobile() {
  return (
    <div className={`phone-root relative h-[84.4em] overflow-hidden bg-[#efeae3] ${ink}`}>
      <div className="flex items-center justify-between px-[2em] pb-[1.4em] pt-[5.4em]">
        <span className="font-serif text-[1.8em] tracking-[0.18em]">VELORA</span>
        <span className="flex flex-col gap-[0.5em]" aria-hidden>
          <span className="h-px w-[2.2em] bg-current" />
          <span className="h-px w-[2.2em] bg-current" />
        </span>
      </div>
      <div className="px-[2em]">
        <h3 className="font-serif text-[3.4em] leading-[1.05] tracking-[-0.02em]">Homes of quiet distinction.</h3>
        <div className="mt-[2em] flex items-center justify-between rounded-[1em] border border-[#d8d0c4] bg-[#f7f4ef] px-[1.4em] py-[1.2em] text-[1.4em]">
          <span className={soft}>Search Hampstead…</span>
          <span className="rounded-full bg-[#1c1a17] px-[0.9em] py-[0.35em] text-[0.8em] text-[#efeae3]">Filters · 3</span>
        </div>
        <div className="mt-[1.6em] flex gap-[0.8em] text-[1.2em]">
          {["£1m – £3m", "3+ beds", "House"].map((c) => (
            <span key={c} className="rounded-full border border-[#d8d0c4] px-[1em] py-[0.45em]">
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-[2.2em] space-y-[2em] px-[2em]">
        {listings.slice(0, 2).map((l, i) => (
          <div key={l.name} className="overflow-hidden rounded-[1.2em] bg-[#f7f4ef]">
            <div className="relative h-[19em]">
              <HouseArt variant={i} className="absolute inset-0 size-full" />
              <span className="absolute right-[1.2em] top-[1.2em] grid size-[3.6em] place-items-center rounded-full bg-[#f7f4ef]/90 text-[1em]">
                <Heart />
              </span>
            </div>
            <div className="p-[1.6em]">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-[1.8em]">{l.name}</span>
                <span className="text-[1.4em]">{l.price}</span>
              </div>
              <div className={`mt-[0.4em] text-[1.25em] ${soft}`}>
                {l.place} · {l.beds} bed · {l.area} m²
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-[2em] bottom-[3em] rounded-full bg-[#1c1a17] py-[1.2em] text-center text-[1.4em] text-[#efeae3]">
        Schedule a viewing
      </div>
    </div>
  );
}
