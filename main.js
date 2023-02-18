
const CARD = 4;




for (let i = 1; i <= CARD; i++) {

 let id =   cantidadPokemon(150)

 mostrarId(id)
}

function cantidadPokemon (MAX){
    return Math.floor(Math.random()*MAX)+1;
}

let guardarPokemones = []
let nombresPokemon =[]

let listaPokemones = document.querySelector(".listaPokemones");
let arrastraSueltaPokemones = document.querySelector(".arrastraSueltaPokemones")

async function mostrarId(id){
    const respuesta = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await respuesta.json()
    guardarPokemones.push(data)
    nombresPokemon.push(data.name)
 


    nombresPokemon = nombresPokemon.sort(()=>Math.random()-0.5 )


   listaPokemones.innerHTML =""
    guardarPokemones.forEach(pokemones =>{
        
        
        listaPokemones.innerHTML += `
        <img draggable="true" id="${pokemones.name}"  class="pokemones" src=" ${pokemones.sprites.other["official-artwork"].front_default}" alt=""> `
    })

    arrastraSueltaPokemones.innerHTML = "";
    nombresPokemon.forEach(nombres =>{
        arrastraSueltaPokemones.innerHTML+=`
        <div class="arrastra"> ${nombres} </div>
        `
    })

    let pokemones = document.querySelectorAll(".pokemones")
    pokemones =[...pokemones]

    pokemones.forEach((pokemone)=>{
        pokemone.addEventListener("dragstart",(event)=>{
            event.dataTransfer.setData("text", event.target.id)
        })

    })
   let mensajeError = document.querySelector(".mensajeError")
    let nombres = document.querySelectorAll(".arrastra")
    
    contador =0;
    nombres = [...nombres]
    nombres.forEach((nombre) =>{
       
        nombre.addEventListener("dragover",(event)=>{
            event.preventDefault();

        })
        nombre.addEventListener("drop",(event)=>{
           
           const resibirDtos = event.dataTransfer.getData("text")
           let idPokemon = document.querySelector(`#${resibirDtos}`)
           console.log(idPokemon)

           if(event.target.innerText == resibirDtos){
            event.target.innerText=""
            event.target.appendChild(idPokemon)
            mensajeError.innerText=""
            contador++

            if(contador == CARD){
                listaPokemones.innerHTML = `<p class="contador">ganastes</p>` 
               }


           }else{
           
            mensajeError.innerText="se equivoco de pokemon"
           }

          

           
        })
    })
}


