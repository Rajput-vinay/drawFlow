interface LeftToolbarProps {
    activeBackgroundColor: string;
    setActiveBackgroundColor: (color: string) => void;
    activeStrokeColor: string;
    setActiveStrokeColor: (color: string) => void;
}

export default function LeftToolBar({ activeBackgroundColor, setActiveBackgroundColor, activeStrokeColor,setActiveStrokeColor }: LeftToolbarProps) {
    
        const colors = [
            { color: "rgba(0, 0, 0, 1)", class: "bg-black" }, // Pure Black  
            { color: "rgba(16, 16, 16, 1)", class: "bg-gray-950" }, // Extra Dark Gray  
            { color: "rgba(32, 32, 32, 1)", class: "bg-gray-900" }, // Dark Gray  
            { color: "rgba(48, 48, 48, 1)", class: "bg-gray-850" }, // Charcoal Black  
            { color: "rgba(64, 64, 64, 1)", class: "bg-gray-800" }, // Gunmetal  
            { color: "rgba(80, 80, 80, 1)", class: "bg-gray-750" }, // Shadow Gray  
            { color: "rgba(96, 96, 96, 1)", class: "bg-gray-700" }, // Dim Gray  
            { color: "rgba(112, 112, 112, 1)", class: "bg-gray-650" }, // Steel Gray  
            { color: "rgba(128, 128, 128, 1)", class: "bg-gray-600" }, // Neutral Gray  
            { color: "rgba(144, 144, 144, 1)", class: "bg-gray-550" }  // Medium Gray  
        ];


        const strokeColors = [
            { color: "rgba(255, 255, 255, 1)", class: "bg-white" }, // White
            { color: "rgba(0, 0, 255, 1)", class: "bg-blue-600" }, // Blue
            { color: "rgba(0, 128, 0, 1)", class: "bg-green-600" }, // Green
            { color: "rgba(255, 255, 0, 1)", class: "bg-yellow-500" }, // Yellow
            { color: "rgba(255, 0, 0, 1)", class: "bg-red-600" }, // Red
            { color: "rgba(128, 0, 128, 1)", class: "bg-purple-600" }, // Purple
            { color: "rgba(255, 165, 0, 1)", class: "bg-orange-500" }, // Orange
            { color: "rgba(0, 255, 255, 1)", class: "bg-cyan-400" }, // Cyan
            { color: "rgba(255, 105, 180, 1)", class: "bg-pink-400" }, // Pink
        ];
    
    

    return (
        <div style={{ backgroundColor: "#232329" }} className={`fixed left-2 lg:top-50  lg:h-76  lg:w-40 md:h-50 md:w-36  text-white p-2 rounded-lg`}>
            <div>
                <div>Background Color</div>
                <div className="flex pt-3 flex-wrap gap-1">
                    {colors.map(({ color, class: bgClass }) => (
                        <div
                            key={color}
                            className={`w-8 h-8 border border-gray-100 rounded cursor-pointer ${bgClass} 
                                        ${activeBackgroundColor === color ? "border-4 border-blue-400" : ""}`}
                            onClick={() => setActiveBackgroundColor(color)}
                        ></div>
                    ))}
                </div>

            </div>
            <div className="pt-2">
                <div>Stroke</div>
                <div className="flex pt-3 flex-wrap gap-1">
                    {strokeColors.map(({ color, class: bgClass }) => (
                        <div
                            key={color}
                            className={`w-8 h-8 border border-gray-100 rounded cursor-pointer ${bgClass} 
                                        ${activeStrokeColor === color ? "border-4 border-blue-400" : ""}`}
                            onClick={() => setActiveStrokeColor(color)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
