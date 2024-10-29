import { useEffect, useRef, useState } from "react";
import {SWATCHES} from '@/constants.ts';
import { ColorSwatch, Group } from "@mantine/core";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { url } from "inspector";

interface Response {
    expr: string;
    result: string;
    assign: boolean;
}

interface GenerateResult{
    expression: string;
    answer: string;
}

export default function Home(){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('rgb(255,255,255)');
    const [reset, setReset] = useState(false);
    const [result, setResult] = useState<GeneratedResult>();
    const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
    const [latexPosition, setLatexPosition]
    const [dictOfVars, setDictofVars] = useState({});


    useEffect(() =>{
        if (reset) {
            resetCanvas();
            setReset(false);
        }
    },[reset]);

    useEffect(() =>{
        const canvas = canvasRef.current;

        if (canvas){
            const ctx = canvas.getContext('2d');
            console.log(`${import.meta.env.VITE_API_URL}/calculate`);
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;
                // for brush tyupe below
                ctx.lineCap = 'round';
                // for brush size
                ctx.lineWidth = 3;
            }
        }

        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/config/TeX-MML-AM_CHTML.js'
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
            window.MathJax.Hub.config({
                tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
            })
        };

        return () => {
            document.head.removeChild(script);
        }

    },[]);

    const sendData = async() => {
        const canvas = canvasRef.current;
        console.log(`${import.meta.env.VITE_API_URL}/calculate`);
        if (canvas) {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/calculate`,
                data:{
                    image: canvas.toDataURL('image/png'),
                    dict_of_vars : dictOfVars,
                    
                }
            });
            const resp = await response.data;
            console.log("Response: ",resp)
        }
    }

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    };


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
    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing){
            return;
        }
        const canvas = canvasRef.current;
        if (canvas){
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = color;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };

    return(
        <>
        <div className="grid grid-cols-3 gap-2">
            <Button 
            onClick={() => setReset(true)}
            className="z-20 bg-black text-white"
            variant='default'
            color="black">
                Reset
            </Button>
            <Group className="z-20">
                {SWATCHES.map((swatchColor: string) => (
                    <ColorSwatch
                    key={swatchColor}
                    color = {swatchColor}
                    onClick={() => setColor(swatchColor)}
                    />
                ))}

            </Group>
            <Button 
            onClick={sendData}
            className="z-20 bg-black text-white"
            variant='default'
            color="black">
                Calculate
            </Button>
        </div>
        <canvas
        ref={canvasRef}
        id = 'canvas'
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={startDrawing}
        onMouseOut={stopDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
    />
    </>
    );

}