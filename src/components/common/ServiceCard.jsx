// src/components/common/ServiceCard.jsx

export default function ServiceCard({ service }) {
  const { name, description, images, price } = service || {};
  const categoryName = service?._categoryName || service?.categoryName || service?.category || "";

  const imageUrl =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "https://images.pexels.com/photos/37347/repair-cell-phone-repairing-fix.jpg";

  const displayName = name || "Untitled service";

  const hasPrice =
    price !== undefined && price !== null && price !== "" && !Number.isNaN(Number(price));

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div
        className="w-full bg-center bg-no-repeat bg-cover aspect-video"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-base font-semibold text-slate-900 truncate">
          {displayName}
        </h3>

        {categoryName && (
          <p className="text-xs text-slate-500">{categoryName}</p>
        )}

        {hasPrice && (
          <p className="text-sm font-medium text-blue-600">
            {Number(price).toLocaleString()} EGP
          </p>
        )}

        {description && (
          <p className="text-sm text-slate-600 leading-relaxed max-h-12 overflow-hidden text-ellipsis">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}
