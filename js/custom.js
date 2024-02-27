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

const videoId = "ByBkOs_3qk4"

const redirectIphone = ()=>{
  if(!/iPhone/i.test(navigator.userAgent)) return 
  console.log(document.getElementById("video"))
  document.getElementById("video").addEventListener("click",(e)=>{
    e.preventDefault();
    //assumes that by forcing window to go to youtube will kick up option to open in app where experience works - plays my full showreel
    window.location = "https://www.youtube.com/watch?v=0x16ngo8xfY&list=PLzSXIFcDqpiCiKXMtXtVIHnmor9uUsEhC&autoplay=1";
  })

}

function onYouTubeIframeAPIReady() {

    const player = new YT.Player('video', {
        videoId,
        playerVars: {
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          autoplay: 0, // Autoplay is disabled
        },
        events: {
          // Optional event handlers
          'onReady': redirectIphone,
      }
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

    const iphone = document.querySelector(".iphone")
    if((/iPhone/i.test(navigator.userAgent))){
      iphone?.addEventListener("click",()=>{
        window.location = `https://www.youtube.com/watch?v=${videoId}`
      })
    }else{
      iphone.style.display = "none"
    }

}


indicatorsSlide.forEach(indicatorSlide=>{
  indicatorSlide.addEventListener("click",()=>{
    carouselsItem.forEach(element=>element.classList.remove("active"))
    carouselsItem[indicatorSlide.getAttribute("index")].classList.add("active")
  })
})


// Check if the user agent contains 'iPhone' to detect iPhones