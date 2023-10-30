"use client"
import { useEffect, useState } from 'react'
import 'app/page.css'

type Point = {
    x: number;
    y: number;
}

export default function Home() {
    const points = [
        {x: 100, y: 100},
        {x: 228, y: 253},
        {x: 421, y: 93},
        {x: 712, y: 162},
        {x: 553, y: 351},
        {x: 388, y: 211},
        {x: 573, y: 91},
        {x: 904, y: 119},
        {x: 691, y: 273},
    ];
    // const [points, setPoints] = useState<Point[]>([
    //     { x: 100, y: 100 },
    // ]);
    const [currentPt, setCurrentPt] = useState<number>(0);
    const [mousePos, setMousePos] = useState<Point>({ x: -1, y: -1 });

    const handleMouseMove = (e: any) => {
        setMousePos({
            x: e.clientX + e.target.scrollLeft,
            y: e.clientY + e.target.scrollTop,
        })
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return (() => {
            window.removeEventListener('mousemove', handleMouseMove)
        })
    }, [])

    useEffect(() => {
        const handleMouseDown = (e: any) => {
            points.push({ x: e.clientX, y: e.clientY });
            console.log(points);
        }
        window.addEventListener('mousedown', handleMouseDown);
        return (() => {
            window.removeEventListener('mousedown', handleMouseDown)
        })
    }, [])

    const svgPathHistory = () => {
        let acc: string = '';
        points.forEach((p, i) => {
            if (i == 0) {
                acc += `M${p.x} ${p.y}`;
            } else if (i <= currentPt) {
                acc += ` L${p.x} ${p.y}`;
            }
        })
        return acc
    }

    return (
        <>
        <svg className='w-screen h-screen'>
            <path d={`M ${points[currentPt].x} ${points[currentPt].y} L ${mousePos.x} ${mousePos.y}`} stroke='red' strokeWidth='2' fill='none' />
            { points.map((p, i) => {
                return (
                    <Dot key={i} p={p} i={i} solved={i <= currentPt} onMouseOver={() => setCurrentPt(i == currentPt + 1 ? i : currentPt)}/>
                )
            })}
            <path d={
                svgPathHistory()
            } stroke='red' strokeWidth='2' fill='none' />
        </svg>  
        </>
    )
}

interface DotProps {
    p: Point;
    i: number;
    solved: boolean;
    onMouseOver: any;
}
function Dot({ p, i, solved, onMouseOver }: DotProps) {
    return (
        <>
        <circle cx={p.x} cy={p.y} r={5} fill={solved ? 'red' : 'black'} />
        <circle cx={p.x} cy={p.y} r={10} fill='black' opacity={0}
            onMouseOver={onMouseOver}
        />
        <circle className={`effect solved-${solved}`} cx={p.x} cy={p.y} r={solved ? 150 : 0} 
            fillOpacity={0} stroke={'red'} strokeWidth={2} strokeOpacity={solved ? 0 : 0.75}
        />
        <text className="select-none" x={p.x + 8} y={p.y + 16} fill={solved ? 'red' : 'black'}>{ i+1 }</text>
        </>
    )
}