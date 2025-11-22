// // src/components/common/ServiceCard.jsx
// import { useNavigate } from 'react-router-dom';

// export default function ServiceCard({ service }) {
//   const navigate = useNavigate();
//   const { name, description, images, price, id } = service || {};
//   const categoryName = service?._categoryName || service?.categoryName || service?.category || "";

//   const imageUrl =
//     Array.isArray(images) && images.length > 0
//       ? images[0]
//       : "https://images.pexels.com/photos/37347/repair-cell-phone-repairing-fix.jpg";

//   const displayName = name || "Untitled service";

//   const hasPrice =
//     price !== undefined && price !== null && price !== "" && !Number.isNaN(Number(price));

//   const handleClick = () => {
//     console.log('Clicked service with ID:', id);
//     console.log('Full service object:', service);
//     navigate(`/services/${id}`);
//   };

//   return (
//     <article 
//       onClick={handleClick}
//       className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
//     >
//       <div
//         className="w-full bg-center bg-no-repeat bg-cover aspect-video"
//         style={{ backgroundImage: `url("${imageUrl}")` }}
//       />
//       <div className="p-4 flex flex-col gap-2">
//         <h3 className="text-base font-semibold text-slate-900 truncate">
//           {displayName}
//         </h3>

//         {categoryName && (
//           <p className="text-xs text-slate-500">{categoryName}</p>
//         )}

//         {hasPrice && (
//           <p className="text-sm font-medium text-blue-600">
//             {Number(price).toLocaleString()} EGP
//           </p>
//         )}

//         {description && (
//           <p className="text-sm text-slate-600 leading-relaxed max-h-12 overflow-hidden text-ellipsis">
//             {description}
//           </p>
//         )}
//       </div>
//     </article>
//   );
// }
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react'; 

export default function ServiceCard({ service }) {
  const navigate = useNavigate();
  const { name, description, images, price, id } = service || {};
  const categoryName = service?._categoryName || service?.categoryName || service?.category || "General";
  
  const imageUrl = Array.isArray(images) && images.length > 0
      ? images[0]
      : "https://images.pexels.com/photos/37347/repair-cell-phone-repairing-fix.jpg";

  const displayName = name || "Untitled service";
  const hasPrice = price !== undefined && price !== null && price !== "" && !Number.isNaN(Number(price));

  const handleClick = () => navigate(`/services/${id}`);

  return (
    <div className="group relative h-full p-1">
        
      {/* 1. Blue Glow Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-3xl opacity-20 group-hover:opacity-100 blur-md transition duration-500 group-hover:duration-200 animate-tilt"></div>
      
      <article 
        onClick={handleClick}
        className="relative flex flex-col h-full bg-white rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 shadow-xl group-hover:scale-[1.01]"
      >
        
        {/* --- Image Area --- */}
        <div className="relative h-56 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={displayName}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-2"
            />
            
            {/* Blue Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

            <div className="absolute top-4 left-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white tracking-wide uppercase">{categoryName}</span>
                </span>
            </div>

            <div className="absolute bottom-4 right-4 bg-white rounded-xl px-4 py-2 shadow-lg transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {hasPrice ? (
                   <div className="flex items-center gap-1">
                       {/* Price Blue Gradient */}
                       <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                           {Number(price).toLocaleString()}
                       </span>
                       <span className="text-[10px] font-bold text-slate-400">EGP</span>
                   </div>
                ) : (
                    <span className="text-xs font-bold text-slate-500">Ask for Price</span>
                )}
            </div>
        </div>

        {/* --- Content Area --- */}
        <div className="p-6 flex flex-col flex-1 relative bg-gradient-to-b from-white to-slate-50">
            
            <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
               {displayName}
            </h3>

            {description && (
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
                {description}
              </p>
            )}

            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-5 opacity-50"></div>

            <div className="mt-auto">
                {/* Button with Blue Gradient on Hover */}
                <button className="w-full group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 px-4 py-3 font-bold text-white shadow-md transition-all hover:shadow-lg hover:shadow-blue-500/40 active:scale-95">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></div>
                    
                    <span className="relative z-10 flex items-center gap-2">
                        View Service 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                </button>
            </div>
        </div>
      </article>
    </div>
  );
}