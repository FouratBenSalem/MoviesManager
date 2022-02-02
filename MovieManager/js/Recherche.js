async function backend_recherche_fn() {
  document.getElementById("tab").innerHTML = `<tbody> </tbody>`;
  console.log("here") ;
    var nom = document.getElementById("nom").value ;
    var genre = document.getElementById("genre").value ;
    var annee = document.getElementById("annee").value ;
    const rep = await fetch(`http://127.0.0.1:8000/cinema/backend_recherche_bd?nom=${nom}&genre=${genre}&annee=${annee}`) ;   
    
    if (rep.ok){
      rep.json().then((data)=>{ 
        console.log(data) ;
        for(var i =0 ; i<data.length; i++){
          var code = `<tr> 
          <td>${data[i].id}</td>
          <td>${data[i].nom}</td>
          <td>${data[i].realisateur}</td>
          <td>${data[i].genre}</td>
          <td>${data[i].annee}</td>

          </tr>`

          document.getElementById("tab").insertAdjacentHTML("beforeend",code)

        }
      })
    }

  } ;

  document.getElementById('sub_recherche').addEventListener('click', backend_recherche_fn);
  function fOfflineLoad() {
    console.log("Start");
  
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js");
    } else {
      console.warn("Not supported");
    }
  }
  window.addEventListener("load", fOfflineLoad);
