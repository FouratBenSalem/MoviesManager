async function backend_ajouter_fn() {
    let url = "http://127.0.0.1:8000/cinema/backend_ajouter_bd" ;
    var nom = document.getElementById("nom").value ;
    var realisateur = document.getElementById("realisateur").value ;
    var genre = document.getElementById("genre").value ;
    var annee = document.getElementById("annee").value ;
    let post = `{"nom":"${nom}" , "realisateur":"${realisateur}" , "genre":"${genre}" , "annee":"${annee}"}` 
    const rep = await fetch(url, {
      method:"POST" , 
      body : post , 
      mode:'no-cors'
    })
    if (rep.ok){
      rep.json().then((data)=>{ 
        console.log(data)
      })
    }

  } ;

  document.getElementById('ajouter').addEventListener('click', backend_ajouter_fn);
  function fOfflineLoad() {
    console.log("Start");
  
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js");
    } else {
      console.warn("Not supported");
    }
  }
  window.addEventListener("load", fOfflineLoad);
