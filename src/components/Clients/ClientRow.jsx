import { useState } from "react";
import { formatDate, getStatusClasses } from "../../utils/clientHelpers";

export default function ClientRow({ client, onDeleteClick }) {
  const [openActionsId, setOpenActionsId] = useState(false);

  const fullName = client.fullName || client.name || client.username || "—";
  const email = client.email || "—";
  const phone = client.phone || client.phoneNumber || "";
  const registrationDate = formatDate(client.createdAt);
  const lastBooking = formatDate(client.lastBookingAt);
  const status = client.status || "Active";

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50">
      {/* <td className="w-4 p-4">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
      </td> */}
      <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
        {fullName}
      </td>
      <td className="px-6 py-4 text-slate-600">
        <div>{email}</div>
        {phone && <div className="text-xs text-slate-500">{phone}</div>}
      </td>
      <td className="px-6 py-4 text-slate-600">{registrationDate}</td>
      <td className="px-6 py-4 text-slate-600">{lastBooking}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
            status
          )}`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setOpenActionsId((prev) => !prev)}
            className="inline-flex items-center justify-center p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <span className="material-symbols-outlined text-base">
              more_horiz
            </span>
          </button>

          {openActionsId && (
            <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white border border-slate-200 shadow-lg z-10">
              <button
                type="button"
                onClick={() => {
                  setOpenActionsId(false);
                  onDeleteClick(client);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
