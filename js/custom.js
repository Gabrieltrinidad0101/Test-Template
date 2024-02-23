const sections = document.getElementById("sections")
const partsHouse = document.querySelectorAll(".parts-house")
const indicatorsSlide = document.querySelectorAll(".indicators-slide")
const carouselsItem = document.querySelectorAll(".carousel-item")
function iniciarMap() {
  var coord = { lat: -34.5956145, lng: -58.4431949 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coord
  });
}

function onYouTubeIframeAPIReady() {
    const player = new YT.Player('video', {
        videoId: 'ByBkOs_3qk4',
        playerVars: {
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
        
        },
    });

    sections.addEventListener("change",(e)=>{
      player.seekTo(e.target.value);
    })

    partsHouse.forEach(part=>{
        part.addEventListener("click",()=>{
            const value = part.getAttribute("value")
            player.seekTo(value)
        })
    })
}


indicatorsSlide.forEach(indicatorSlide=>{
  indicatorSlide.addEventListener("click",()=>{
    carouselsItem.forEach(element=>element.classList.remove("active"))
    carouselsItem[indicatorSlide.getAttribute("index")].classList.add("active")
  })
})