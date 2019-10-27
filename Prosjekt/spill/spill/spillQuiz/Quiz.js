var innpakningEl = document.querySelector(".innpakning") ;
var resultatEl = document.querySelector(".resultat");

//Lager en array med spørsmålsobjekter.
var quiz = [
  {sporsmaal: "Hva står HTML for?",
    alternativer: ["Home Tool Markup Language", "Hyper Terminal Markup Language", "Hyper Text Markup Language"],
    fasit: ["galt", "galt", "riktig"]},
  {sporsmaal: "Hva er den korrekte taggen for den største overskriften?",
    alternativer: ["h6", "head", "h1"],
    fasit: ["galt", "galt", "riktig"]},
  {sporsmaal: "Hva er den korrekte HTML-taggen for linjeskift?",
    alternativer: ["span", "br", "break"],
    fasit: ["galt", "riktig", "galt"]},
  {sporsmaal: "Hva slags filending har JavaScript filer?",
      alternativer: ["js", "json", "javascript"],
      fasit: ["riktig", "galt", "galt"]},
  {sporsmaal: "Den korrekten måten å definere en funksjon i JavaScript er:",
        alternativer: ["myfunc function()", "function myfunction()", "myfunc = function()"],
        fasit: ["galt", "riktig", "galt"]}
];


//skirver spørsmålene til nettsiden
for (var i = 0; i < quiz.length; i++) {
  var sporsmaalEl = document.createElement("p");
  sporsmaalEl.innerHTML += "<h3>" + quiz[i].sporsmaal + "</h3>" ;

  //lager elementer for hvert av alternativene.
  for (var j = 0; j < quiz[i].alternativer.length; j++) {
    var nyCheckBox = document.createElement("input");

    //angir typen checkbox
    nyCheckBox.type = "checkbox" ;
    //setter boksene value til fasitsvaret.
    nyCheckBox.value = quiz[i].fasit[j] ,
    //legger til boksen
    sporsmaalEl.appendChild(nyCheckBox) ;
    //legger til svaralternativ
    sporsmaalEl.innerHTML += quiz[i].alternativer[j] + "<br>";

  }
  //legger til <p>-elementet i innpakningen.
  innpakningEl.appendChild(sporsmaalEl);
}



//legger til en knapp til slutt
var knapp = document.getElementById("knapp") ;

//Starter når knappen blir trykket på
knapp.onclick = function finnPoeng() {
  var alleCheckboxEl = document.querySelectorAll("input[type='checkbox']") ;

  var antallPoeng = 0 ;
  for (var i = 0; i < alleCheckboxEl.length; i++) {
    //hvis en checkbox er haket av
    if (alleCheckboxEl[i].checked) {
      //undersøk om alternativet er riktig
      if (alleCheckboxEl[i].value === "riktig") {
        //hvis riktig, gi et poeng
        antallPoeng++
      }else {
        //hvis feil, trekk fra ett poeng
        antallPoeng--;
      }
    }
  }


  if(antallPoeng > 3){
    resultatEl.innerHTML = "Prøven er nå ferdig, og du fikk " + antallPoeng + " poeng! Gratulerer flinke deg!" ; //Skriver ut hvor mange poeng du fikk
    setTimeout(function(){ window.open("../../story/story4/index.html","_self"); }, 3000); //Får du mer enn fire poeng blir du sendt videre etter 3 sekund til ny side.
    document.getElementById("karakter").src = "../../karakterbilder/glad.png";
    document.getElementById("snakkeBoble").innerHTML = "Yes! Dette gikk knallbra!";
  }
  else{
    resultatEl.innerHTML = "Prøven er nå ferdig, og du fikk " + antallPoeng + " poeng.. Det er stryk!" ; //Skriver ut hvor mange poeng du fikk
    setTimeout(function(){ window.open("../../story/storyTaper/index.html","_self"); }, 3000); //Om brukeren får mindre poeng så kommer den til tap siden.
    document.getElementById("karakter").src = "../../karakterbilder/sint.png";
    document.getElementById("snakkeBoble").innerHTML = "Hjelp nå strøk jeg!";
  }
}
