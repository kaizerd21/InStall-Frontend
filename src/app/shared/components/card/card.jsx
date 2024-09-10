


export function Card({ children, color }) {
  return (
    <div className={`flex flex-col ${color || 'bg-card_color'} shadow-md rounded-md p-8`}>
      {children}
    </div>
  )
}
