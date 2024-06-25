data={
    name:"mapa",
    map:[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ],
    color:["#ffffff","#000000"]
}

function Importar(){  
    let open_file=document.createElement("input")
    open_file.setAttribute("type","file");

    open_file.addEventListener("change",function(e){
        let archivo= e.target.files[0];
        if(archivo){
            let reader=new FileReader();
            reader.onload=function(e){
                const contenido=e.target.result
                //-----------////
                data=JSON.parse(contenido)
                if(data.color.length>=2){
                    color=1;
                }
                Actualizar_Colores();
                //-----------////
            }
            reader.readAsText(archivo)
        }
    },false);

    open_file.click();
}




function Exportar() {
    const a = document.createElement("a");
    const contenido = JSON.stringify(data),
        blob = new Blob([contenido], {type: "octet/stream"}),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = data.name+".atch";
    a.click();
    window.URL.revokeObjectURL(url);
};




