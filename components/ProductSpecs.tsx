interface ProductSpecsProps {
  specifications: Record<string, string>;
}

export default function ProductSpecs({ specifications }: ProductSpecsProps) {
  const entries = Object.entries(specifications);

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-neutral-200 py-8 sm:py-10">
      <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
        Specifications
      </h2>

      <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full text-left text-sm sm:text-[15px]">
          <tbody>
            {entries.map(([key, value], index) => (
              <tr
                key={key}
                className={index % 2 === 0 ? "bg-white" : "bg-neutral-50"}
              >
                <th
                  scope="row"
                  className="w-1/3 px-4 py-3 font-medium text-neutral-700 sm:px-6"
                >
                  {key}
                </th>
                <td className="px-4 py-3 text-neutral-600 sm:px-6">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
