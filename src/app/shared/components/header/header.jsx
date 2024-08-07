import { Button } from "primereact/button";

export default function DashboardHeader() {
  return (
    <header className="flex justify-between items-center pr-5 bg-background_color h-20">
      <Button icon="pi pi-bars" text className="text-white text-4xl" />
      <div className="flex space-x-2">
        <div className="text-right px-2">
          <h1 className="text-xl font-extrabold text-white">User Profile</h1>
          <Button
            label="Admin"
            className="bg-button_green rounded-full shadow-md text-green-800"
          />
        </div>
        <div className="h-[3.5em] w-[3.5em] bg-white rounded-full"></div>
      </div>
    </header>
  );
}
