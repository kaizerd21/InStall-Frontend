


export function Card({ children, color, noPadding = false }) {
  return (
    <div className={`flex flex-col ${color || 'bg-card_color'} shadow-md rounded-md ${noPadding ? 'p-0' : 'p-8'}`}>
      {children}
    </div>
  )
}
