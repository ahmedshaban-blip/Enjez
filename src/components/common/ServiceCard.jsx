import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react'; 

export default function ServiceCard({ service }) {
  const navigate = useNavigate();
  const { name, description, images, price, id } = service || {};
  const categoryName = service?._catName || service?._categoryName || service?.category || "";

  const imageUrl = Array.isArray(images) && images.length > 0
      ? images[0]
      : "https://via.placeholder.com/400";

  const displayName = name || "Untitled service";
  const displayPrice = price ? `${price} $` : "Ask";
  const displayDesc = description || "No description.";

  const handleClick = () => navigate(`/services/${id}`);

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-2xl border border-slate-100 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
         <img src={imageUrl} alt={displayName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
         
         {/* Overlay Button */}
         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/30 translate-y-4 group-hover:translate-y-0 transition-transform">View</span>
         </div>
         
         {/* Category Badge */}
         {categoryName && (
            <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-slate-800 text-[9px] font-extrabold px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
              {categoryName}
            </span>
         )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="text-[17px] font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
            {displayName}
          </h3>
          <div className="flex items-center gap-0.5 bg-slate-50 px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-700">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            4.9
          </div>
        </div>
        
        <p className="text-[12px] text-slate-500 line-clamp-2 mb-3 h-9 leading-relaxed font-medium">
          {displayDesc}
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Price</span>
            <span className="text-md font-black text-slate-800">{displayPrice}</span>
          </div>
          {/* Blue Button */}
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}