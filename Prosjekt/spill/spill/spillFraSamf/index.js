var print = document.getElementById("print");
var btnStart = document.getElementById("btnStart");

var karakter;//Variabel for karakteren
var Hindringer = [];//Aray for hindringene (veggene på sidene)
var poengsum; //poengsum

var bildeArr = ["img/leftLeg.png", "img/RightLeg.png"]; //array med bildene til karakter

var sitat = -1;

setTimeout(function(){

  setInterval(function(){

    if (sitat == -1 ) {
      document.getElementById("snakkeBoble").innerHTML = "Jeg er våt ..";
    } else if (sitat == 0) {
         document.getElementById("snakkeBoble").innerHTML = "og våt ..";
    } else if (sitat == 1) {
          document.getElementById("snakkeBoble").innerHTML = "og kald ..";
    } else if (sitat == 2) {
           document.getElementById("snakkeBoble").innerHTML = "og sulten ..";
    } else if (sitat == 3) {
            document.getElementById("snakkeBoble").innerHTML = "og trøtt ..";
    } else if (sitat == 4) {
            document.getElementById("snakkeBoble").innerHTML = "og lei ..";
    }
    sitat = Math.floor(Math.random() * 5);
   }, 2000);

 }, 4000);




    //Kildekoden er denne: https://www.w3schools.com/graphics/game_gravity.asp
    //trykker startknappen å kjører man funksjonen start game
    btnStart.onclick = function startGame() {
        //knapp forsvinner
        btnStart.style.visibility = "hidden";
        //komponent til karakter
        karakter = new karakterKomponent(50, 80, "img/leftLeg.png", 240, 500, "image");
        //komponent til bakgrunn der bakken beveger seg
        spillbakgrunn = new spillbakgrunnKomponent(450, 600, "img/pavement.jpg", 0, 0, "background");
        //komponent til poengsum
        poengsum = new poengsumKomponent("30px", "Consolas", "black", 150, 40, "text");
        //farten til spillbakgrunnen. Bestemmer hvor fort den flytter på seg
        spillbakgrunn.speedY = 2 ;
        //hindringer blir pushet inn
        Hindringer.push(new karakterKomponent(1, 600, "white", 1, 1,));
        Hindringer.push(new karakterKomponent(1, 600, "white", 450, 1,));

        //kjører funksjonen spillomraade.
        spillomraade.start();
    }//slutt startgame funksjon



    //Denne variabelen lager Canvaset
    var spillomraade = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = 450;
            this.canvas.height = 600;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(oppdaterSpillOmraade, 20);
            },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop : function() {
            clearInterval(this.interval);
        }
    }//var spillomraade slutt.


    //funksjonen til poengkomponenten som teller poeng
    function poengsumKomponent(width, height, color, x, y, type) {
        this.type = type;
        this.score = 0;//score er 0
        this.width = width;//henter bredden
        this.height = height;//henter høyden
        this.x = x;//henter x verdien
        this.y = y;//henter y verdien

        //kjører "denne" updatefunksjonen
        this.update = function() {
            ctx = spillomraade.context; //henter innholdet i spillområdet om da er canvaset

            //if setning som kjekker at type er text
            if (this.type == "text" ) {
                ctx.font = this.width + " " + this.height;//plaserer teksten
                ctx.fillStyle = color;//fyller tekst
                ctx.fillText(this.text, this.x, this.y);//fyller tekst med riktig plassering
            }

            else { //hvis ikke greier å utføre så fylles det blankt
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }


    }//Slutt på funksjon for poeng

    //funksjonen til bakgrunnen som flytter på seg
    function spillbakgrunnKomponent(width, height, color, x, y, type) {
        this.type = type;

        //sjekker at typen er background
        if (type == "background") {
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;//henter bredde
        this.height = height; //henter høyde
        this.speedX = 0;//henter fart i X retning
        this.x = x;//henter X posisjon
        this.y = y;//henter Y posisjon

        //kjører "denne" updatefunksjonen som oppdaterer posisjonen
        this.update = function() {
            ctx = spillomraade.context; //henter innholdet i spillområdet om da er canvaset

            //if-setning som kjekker at det er bakgrunn
            if (this.type == "background" ) {
                //console.log(this);
                var pat = ctx.createPattern(this.image, "repeat-y");// lager banen den skal gå i
                ctx.fillStyle = pat;
                ctx.translate(this.x, this.y);
                ctx.fillRect(0, -5000, this.width, 5600);
                ctx.translate(-this.x, -this.y);
            }

            else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }

        }
        this.nyPosisjonBakgrunn = function() {
            this.x += this.speedX;
            this.y += this.speedY;

        }
    }//Slutt bakgrunnfunksjon

    //funksjonen til komponenten til karakteren
    function karakterKomponent(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image") {
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;//henter bredde
        this.height = height;//henter høyde
        this.speedX = 0;//henter fart X retning
        this.x = x; //henter x posisjon
        this.y = y; //henter y posisjon
        this.sidefart = 0;//fartverdien til karakteren
        this.sidefartSpeed = 2; // hvilken fart den får når vi starter

        // kjører "denne" funksjonen for å finne ny posisjon
        this.update = function() {
            ctx = spillomraade.context;
            if (this.type == "image" ) {
                ctx.drawImage(this.image,this.x,this.y,this.width, this.height);//tegner opp karakteren på nytt etter å ha lyttet på den nye funksjonen
            }
            else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }

        }//stopp this.update function

        //finner ut hvor den er i forhold til sidefarten. Legger så til fart hver gang slik at den øker farten mot kantene
        this.nyPosisjon = function() {
            this.sidefartSpeed += this.sidefart;
            this.x += this.speedX + this.sidefartSpeed;



        }// stop this.nyposisjon function

    //variabel i som brukes til å bytte bilde.src til karakteren
    var i = 0;
         function bytte() {
                karakter.image.src= bildeArr[i];//bytter src
                i = (i + 1) % bildeArr.length;  //ender verdien til i mellom 0 og en
            }
        setInterval(bytte, 500); //bytter bilde hvert 1/2 sekund. Endre tallet så endrer hastigheten mellom hvert byttte






    //Dette styrer krasjesidene. Dette plasserer dem
    //Kildekode for crashWidth https://www.w3schools.com/graphics/tryit.asp?filename=trygame_obstacle_hit
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var crash = true;
        if ((myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }//stop this.crashWidth funksjon
}//stopp karakterKomponent funksjon

    //funksjon som oppdaterer spillområdet og sjekker om karakteren har kasjet med hindringene
    function oppdaterSpillOmraade() {
        var x, y;
        for (i = 0; i < Hindringer.length; i += 1) {

            if (karakter.crashWith(Hindringer[i])) {
                spillomraade.stop();

                setTimeout(function(){
                   window.open("../../story/storyTaper/index.html", "_self");
                 }, 2500);

                document.getElementById("karakter").src = "../../karakterbilder/trist.png";
                document.getElementById("snakkeBoble").innerHTML = "Ånei";
                return;
            }

        }
        //clearer spillområdet
        spillomraade.clear();
        //legger til 1 i frameNo
        spillomraade.frameNo += 1;
        spillbakgrunn.nyPosisjonBakgrunn();
        spillbakgrunn.update();
        //Setter inn hindring


        //her er nedtellingen. Endre her for å kutte ned på distansen og dermed lengden til spillet
        var scoreNedtelling = Math.ceil((1000 - spillomraade.frameNo/1.5));
        //teksten som står foran poengmåleren. Endre det i "  " for å endre tekst
        poengsum.text="Meter hjem: " + scoreNedtelling;

        //if-setning som sier at når scoreNedtelling er -1 så sender man deg til en annen nettside. S
        if (scoreNedtelling == -1) {
            spillomraade.stop();
            //Endre nettsted i parentesen for å endre stedet de skal gå til.
            location.replace("../../story/story7/index.html");
            return;
        }
        poengsum.update();
        karakter.nyPosisjon();

        karakter.update();
    }//slutt funksjon spillomraade



    //funksjon for fart til sidene som endrer farten. bruker denne til å koble opp med knappene.
    function akslerasjon(n) {
        karakter.sidefart = n;
    }

        document.onkeydown = function(event) {
            switch (event.keyCode) {
               case 37:
                    akslerasjon((-Math.random()*0.2));
                  break;
                case 39:
                    akslerasjon((Math.random()*0.2));
                  break;
            }
        };
