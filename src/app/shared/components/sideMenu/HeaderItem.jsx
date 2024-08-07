import { Badge } from "primereact/badge";
import { useNavigate } from "react-router-dom";

export default function HeaderItem(item, option) {
  const navigate = useNavigate();
  return (
    <a
      className="flex items-center px-4 py-4 cursor-pointer text-xl"
      //   href={item.url}
      onClick={() => navigate(item.url)}
    >
      <span className={`${item.icon} text-background_color text-2xl`} />
      <span className={`mx-2`}>{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
}
