let canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

var columnas=10;
var filas=10;
var ancho=1280;
var alto=720;
var ux=128;
var uy=72;


setInterval(() => {
    filas=data.map.length;
    columnas=0;
    if(filas>0){columnas=data.map[0].length}
    ancho=innerWidth-40;
    alto=innerHeight-60;
    canvas.width=ancho;
    canvas.height=alto;
    ux=ancho/columnas;
    uy=alto/filas;
    //dibujar fondo
    ctx.fillStyle = data.color[0];
    ctx.fillRect(0,0,ancho,alto);
    //dibujar relleno
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if(data.map[i][j]!=0){
                ctx.fillStyle = data.color[data.map[i][j]];
                ctx.fillRect(j*ux, i*uy, ux, uy);
            }
        }
    }
    //dibujar lineas
    ctx.strokeStyle="#323232"
    for (let i = 1; i < ancho; i++) {
        ctx.beginPath();
        ctx.moveTo(ux*i, 0);
        ctx.lineTo(ux*i, alto);
        ctx.stroke();
    }
    for (let i = 1; i < alto; i++) {
        ctx.beginPath();
        ctx.moveTo(0,uy*i);
        ctx.lineTo(ancho, uy*i);
        ctx.stroke();
    }
}, 1000/60);
////////////////////////////////////////////---HERRAMIENTAS---///////////////////////////////////////////////////////////////////
flecha=0
lapiz=1
borrador=2
relleno=3
selector=4

herramienta=flecha;
color=1;
presiona=false;

canvas.addEventListener("mousedown",function(e){
    let mouse_x=e.offsetX;
    let mouse_y=e.offsetY;
    let x=parseInt(columnas*mouse_x/ancho);
    let y=parseInt(filas*mouse_y/alto);
    presiona=true;
    
    if(herramienta==lapiz){
        data.map[y][x]=color;
    }
    else if(herramienta==borrador){
        data.map[y][x]=0;
    }
    else if(herramienta==relleno){
        Rellenar(x,y)
    }
    else if(herramienta==selector){
        color=data.map[y][x];
    }
});

canvas.addEventListener("mouseup",function(e){
    let mouse_x=e.offsetX;
    let mouse_y=e.offsetY;
    let x=parseInt(columnas*mouse_x/ancho);
    let y=parseInt(filas*mouse_y/alto);
    
    if(herramienta==lapiz){
        data.map[y][x]=color;
    }
    else if(herramienta==borrador){
        data.map[y][x]=0;
    }

    presiona=false;
})
addEventListener("mouseup",function(e){ presiona=false;});

canvas.addEventListener("mousemove",function(e){
    let mouse_x=e.offsetX;
    let mouse_y=e.offsetY;
    let x=parseInt(columnas*mouse_x/ancho);
    let y=parseInt(filas*mouse_y/alto);

    if(presiona){
        if(herramienta==lapiz){
            data.map[y][x]=color;
        }
        else if(herramienta==borrador){
            data.map[y][x]=0;
        }
    }
});



function Rellenar(x,y,color_base){
    
    if(x>=0 && x<columnas && y>=0 && y<filas){
        if(color_base==undefined){
            color_base=data.map[y][x];
        }
        if(data.map[y][x]==color_base && data.map[y][x]!=color){
            
            data.map[y][x]=color;

            //izq
            Rellenar(x-1,y,color_base);
            //der
            Rellenar(x+1,y,color_base);
              
            //arr
            Rellenar(x,y+1,color_base)
            //der
            Rellenar(x,y-1,color_base);
        }
    }

}


/// click herramientas
let btn_flecha=document.getElementById("btn_flecha");
let btn_lapiz=document.getElementById("btn_lapiz");
let btn_selector=document.getElementById("btn_selector");
let btn_relleno=document.getElementById("btn_relleno");


btn_flecha.addEventListener("click",function(e){
    btn_flecha.setAttribute("class","btn_select")
    btn_lapiz.setAttribute("class","")
    btn_selector.setAttribute("class","")
    btn_relleno.setAttribute("class","")
    herramienta=flecha;
});
btn_lapiz.addEventListener("click",function(e){
    btn_flecha.setAttribute("class","")
    btn_lapiz.setAttribute("class","btn_select")
    btn_selector.setAttribute("class","")
    btn_relleno.setAttribute("class","")
    herramienta=lapiz;
});
btn_selector.addEventListener("click",function(e){
    btn_flecha.setAttribute("class","")
    btn_lapiz.setAttribute("class","")
    btn_selector.setAttribute("class","btn_select")
    btn_relleno.setAttribute("class","")
    herramienta=selector;
});
btn_relleno.addEventListener("click",function(e){
    btn_flecha.setAttribute("class","")
    btn_lapiz.setAttribute("class","")
    btn_selector.setAttribute("class","")
    btn_relleno.setAttribute("class","btn_select")
    herramienta=relleno
});