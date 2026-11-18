/** Printer's crop marks around a box (decorative). The parent must be `relative`. */
export default function CropMarks({ color = "#9CA3AF" }: { color?: string }) {
  const arm = "absolute block bg-current";
  const corner = (pos: string, h: string, v: string) => (
    <span className={`absolute ${pos} h-6 w-6`} style={{ color }} aria-hidden>
      <span className={`${arm} ${h} h-px w-5`} />
      <span className={`${arm} ${v} h-5 w-px`} />
    </span>
  );
  return (
    <>
      {corner("-left-7 -top-7", "right-0 bottom-0", "right-0 bottom-0")}
      {corner("-right-7 -top-7", "left-0 bottom-0", "left-0 bottom-0")}
      {corner("-bottom-7 -left-7", "right-0 top-0", "right-0 top-0")}
      {corner("-bottom-7 -right-7", "left-0 top-0", "left-0 top-0")}
    </>
  );
}
