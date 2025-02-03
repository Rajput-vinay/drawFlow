

interface initDrawProps {
canvas: HTMLCanvasElement;
}

export function initDraw(canvas: initDrawProps){
 
    
    const ctx = canvas.canvas.getContext("2d");

    if(!ctx){
        return;
    }

    let startX = 0;
    let startY = 0;
    let clicked = false;

    canvas.canvas.addEventListener("mousedown", (e)=>{
        clicked = true;
       startX = e.clientX;
       startY = e.clientY;
    })

    canvas.canvas.addEventListener("mouseup", (e) =>{
        clicked = false;
        console.log(e.clientX)
        console.log(e.clientY)

    })

    canvas.canvas.addEventListener("mousemove", (e)=>{
        if(clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            ctx.clearRect(0,0, canvas.canvas.width, canvas.canvas.height)
             ctx.fillStyle = "rgba(0, 0, 0)"
            ctx.fillRect(0,0, canvas.canvas.width, canvas.canvas.height);
            ctx.strokeStyle="rgba( 255, 255, 255)"
            ctx.strokeRect(startX, startY, width, height);
        }   })
}