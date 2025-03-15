//PLAYERS
// esto es un objeto
function player (id, marker, turn){
    this.id = id;
    this.marker = marker;
    this.turn = turn;
}



//TABLERO Y JUEGO
//clase juego
class Game{
    constructor(player1, player2){
        this.p1 = player1;
        this.p2 = player2;
    }

    display_game(){
        const preGame = document.querySelector(".preGame");
        preGame.style.display = "none";
        const board = document.querySelector(".board");
        board.classList.add("width");
        board.innerHTML = `
                <div class="casilla b1"></div>
                <div class="casilla b2"></div>
                <div class="casilla b3"></div>
                <div class="casilla b4"></div>
                <div class="casilla b5"></div>
                <div class="casilla b6"></div>
                <div class="casilla b7"></div>
                <div class="casilla b8"></div>
                <div class="casilla b9"></div>
        `;
        
        this.click_mark();
        if(player2.turn){
            this.enemy_turn();
        }
    }

    start_button(){
        let startButton = document.querySelector(".start-game");
        let warning = document.createElement("div");
        warning.classList.add("warning"); /*CREAMOS UN WARNING*/
        warning.textContent = "SELECCIONA UNA OPCION!";
        document.querySelector(".main").appendChild(warning);
        warning.style.display="None";
        let markers = document.querySelectorAll("input[name='marker']");
        



        startButton.addEventListener("mouseover", () => {
            if (startButton.disabled) {
                warning.style.display="Block";
                
            }
        });

        startButton.addEventListener("mouseout", () => {
            warning.style.display="None";
        });

        //COMPRUEBA SELECCION DE MARKER
        markers.forEach( marker =>{
            marker.addEventListener("change", () =>{
                if (startButton.disabled) {
                    startButton.disabled= false;
                    
                }
            });
        });

        //FUNCION AL CLICKEAR START, INICIAMOS LOS JUGADORES, CON SUS MARKERS
        startButton.addEventListener("click", () => {
            
            let p1marker;
            let p2marker;

            const selectedMarker = document.querySelector("input[name='marker']:checked").value;

            if (selectedMarker == "X"){
                p1marker = "X";
                p2marker = "O";
                player1.turn = true;

            }else{
                
                p2marker = "X";
                p1marker = "O";
                player2.turn = true;


            }

            player1.marker = p1marker;
            player2.marker = p2marker;

            this.display_game();
            
        });
        


    }

    click_mark(){ //FUNCION PARA MARCAR CLICKS DEL P1
        const casillas = document.querySelectorAll(".casilla");
        casillas.forEach(casilla => {
            casilla.addEventListener("click", () => {
                if (player1.turn && casilla.textContent == ""){
                    casilla.classList.add("animacion"); //ANIMACION
                    casilla.textContent = player1.marker;

                    player1.turn = false;
                    if(!this.win_con(player1.marker)){
                        setTimeout(() => this.enemy_turn(), 300);
                        
                    };
                    
                }   
                
            })
        });
    }   

    enemy_turn(){ //TURNO ENEMIGO
        const casillas = document.querySelectorAll(".casilla");
        const casillasVacias = Array.from(casillas).filter(casilla => casilla.textContent == "");
        let max = casillasVacias.length -1;
        let min = 0
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        casillasVacias[num].classList.add("animacion"); //ANIMACION
        casillasVacias[num].textContent = player2.marker;
        
        if(!this.win_con(player2.marker)){
            player1.turn = true;
        };

    }

    win_con(marker){ //FUNCION PARA COMPROBAR SI TERMINA EL JUEGO
        const casillas = document.querySelectorAll(".casilla");
        const casillasVacias = Array.from(casillas).filter(casilla => casilla.textContent == "");
        const logcasillas = Array.from(casillas).map(casilla => casilla.textContent);
        let result = 0;

        
        for (let i = 0; i < 3; i++) {
            let j = i*3;
            if(logcasillas[j] == marker && logcasillas[j+1] == marker && logcasillas[j+2] == marker){ // COMPROBAMOS LINEAS
                const winner = players.find(player => player.marker == marker);
                result = winner.id;
                this.end_game(result);
                return true; 
            }
            if(logcasillas[i] == marker && logcasillas[i+3] == marker && logcasillas[i+6] == marker){//COMPROBAMOS COLUMNAS
                const winner = players.find(player => player.marker == marker);
                result = winner.id;
                
                this.end_game(result);
                return true;
            }
        }

        if(logcasillas[0] == marker && logcasillas[4] == marker && logcasillas[8] == marker){ // COMPROBAMOS DIAGONAL 1
            const winner = players.find(player => player.marker == marker);
            result = winner.id;
            this.end_game(result);
            return true; 
        }

        if(logcasillas[2] == marker && logcasillas[4] == marker && logcasillas[6] == marker){ // COMPROBAMOS DIAGONAL 2
            const winner = players.find(player => player.marker == marker);
            result = winner.id;
            this.end_game(result);
            return true; 
        }


        if (casillasVacias == 0 ){// COMPROBAMOS CASILLAS LLENAS
            this.end_game(result);
            return true;
            
        }
        return false;
    }

    end_game(result){ //FUNCION PARA TERMINAR EL JUEGO
        let overlay = document.createElement("div");
        overlay.classList.add("blur");
        overlay.classList.add("width");
        overlay.classList.add("animacion");
        let restartButton = document.createElement("button");
        restartButton.textContent = "Restart";

        if(result == 0){
            overlay.textContent = "EMPATE";
        }
        else{
            overlay.textContent = "El ganador es: PLAYER" + result;
        }

        overlay.appendChild(restartButton);

        let board = document.querySelector(".board");

        restartButton.addEventListener("click", () => {
            this.restart();
        });

        setTimeout(() => board.appendChild(overlay), 100);


        

            
    }

    restart(){

        const board = document.querySelector(".board");
            board.classList.remove("width");
            board.innerHTML = ``;

            const preGame = document.querySelector(".preGame");
            preGame.style.display = "block";

            player1.turn = false;
            player2.turn = false;

            player1.marker = null;
            player2.marker = null;

    }
    
    
            

}

const player1 = new player(1,null, false);
const player2 = new player(2,null, false);
const players = [player1, player2];
const tic = new Game(player1, player2);
tic.start_button();


