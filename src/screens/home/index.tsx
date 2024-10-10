import { useRef, useState } from "react";


export default function Home(){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas){
            canvas.style.background = 'black';
            const ctx = canvas.getContext('2d');
            if (ctx){
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    }
    const stopDrawing = () => {
        setIsDrawing(false);
    }
    return(
        <>
        <canvas
        ref={canvasRef}
        id = 'canvas'
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={startDrawing}
        onMouseOut={stopDrawing}
        onMouseUp={stopDrawing}
    />
    </>
    );

}