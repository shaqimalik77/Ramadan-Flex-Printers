export default function GoogleMap() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
      <iframe
        title="Ramdan Flex Printers location: Lakshmi Chowk, Royal Park, Lahore"
        src="https://www.google.com/maps?q=Lakshmi%20Chowk%2C%20Royal%20Park%2C%20Lahore%2C%20Pakistan&output=embed"
        width="100%"
        height="420"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[300px] sm:h-[380px] lg:h-[420px]"
      />
    </div>
  );
}
