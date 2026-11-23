import { useRef, useState } from "react";
import media from "../content/final-media.json";

const sheets = [
  ["ground", "Ground floor"],
  ["second", "Second floor"],
] as const;

export function FloorPlans() {
  const [selected, setSelected] = useState<(typeof sheets)[number] | null>(
    null,
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const plan = selected ? media.plans[selected[0]] : null;
  return (
    <section className="floor-plans" aria-labelledby="floor-plans-title">
      <h2 id="floor-plans-title">Floor plans</h2>
      <div className="floor-plan-grid">
        {sheets.map((sheet) => (
          <button
            key={sheet[0]}
            type="button"
            onClick={() => {
              setSelected(sheet);
              dialog.current?.showModal();
            }}
          >
            <img {...media.plans[sheet[0]]} alt="" loading="lazy" />
            <span>{sheet[1]}</span>
          </button>
        ))}
      </div>
      <dialog
        className="gallery-dialog plan-dialog"
        ref={dialog}
        aria-labelledby="plan-title"
        onClose={() => {
          if (!dialog.current?.open) setSelected(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="gallery-panel">
          <div className="showcase-heading">
            <h2 id="plan-title">{selected?.[1] ?? "Floor plan"}</h2>
            <button
              className="gallery-close"
              type="button"
              onClick={() => dialog.current?.close()}
              autoFocus
            >
              Close
            </button>
          </div>
          {plan && selected && (
            <>
              <div className="plan-sheet">
                <img {...plan} alt={selected[1] + " architectural drawing"} />
              </div>
              <a
                className="text-link"
                href={plan.src}
                target="_blank"
                rel="noreferrer"
              >
                Open full-size drawing
              </a>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
