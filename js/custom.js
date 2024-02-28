const partsHouse = document.querySelectorAll(".parts-house")
const indicatorsSlide = document.querySelectorAll(".indicators-slide")
const carouselsItem = document.querySelectorAll(".carousel-item")
const sections = document.getElementById("sections")
const deviceVideo = document.getElementById("deviceVideo")
const iphoneVideo = document.getElementById("iphoneVideo")

const videoId = "ByBkOs_3qk4"

function iniciarMap() {
  var coord = { lat: -34.5956145, lng: -58.4431949 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coord
  });
}

indicatorsSlide.forEach(indicatorSlide => {
  indicatorSlide.addEventListener("click", () => {
    carouselsItem.forEach(element => element.classList.remove("active"))
    carouselsItem[indicatorSlide.getAttribute("index")].classList.add("active")
  })
})


// Function to dynamically load a script
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

const Iphone = async () => {
  try {
    await loadScript('https://vjs.zencdn.net/5.10.4/video.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three.js');
    await loadScript('https://rawgit.com/yanwsh/videojs-panorama/master/dist/videojs-panorama.v5.js');

    iphoneVideo.classList.remove("d-none")
    const options = {
      plugins: {
        panorama: {
          clickAndDrag: true,
          clickToToggle: true,
          autoMobileOrientation: true,
          backToVerticalCenter: false,
          backToHorizonCenter: false
        }
      }
    };
    videojs('iphoneVideo', options, function () { });
  } catch (error) {
    console.error('Error loading scripts:', error);
  }
}


const AllDeviceExpectIphone = async () => {
  try {
    await loadScript('https://www.youtube.com/iframe_api');
  } catch (error) {
    console.error('Error loading scripts:', error);
  }
}


if ((/iPhone/i.test(navigator.userAgent))) {
  Iphone()
} else {
  AllDeviceExpectIphone()
}

function onYouTubeIframeAPIReady() {
  deviceVideo.classList.remove("d-none")
  const player = new YT.Player('deviceVideo', {
    videoId,
    playerVars: {
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      autoplay: 0, // Autoplay is disabled
    }
  });

  sections.addEventListener("change", (e) => {
    player.seekTo(e.target.value);
  })

  partsHouse.forEach(part => {
    part.addEventListener("click", () => {
      const value = part.getAttribute("value")
      player.seekTo(value)
    })
  })
}