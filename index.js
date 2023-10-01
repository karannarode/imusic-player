let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;


let curr_track = document.createElement('audio');


let track_list = [
  {
    name: "Heeriye",
    artist: "Song by Arijit Singh, Dulquer Salmaan, and Jasleen Royal",
    image: "https://149354933.v2.pressablecdn.com/wp-content/uploads/2023/07/ed67f181-4c81-4041-8856-849174501798.jpeg",
    path: "_Heeriye_192(PagalWorld.com.se).mp3"
  },
  {
    name: "Sanam Re",
    artist: "Song by Arijit Singh",
    image: "https://c.saavncdn.com/829/Sanam-Re-Hindi-2015-500x500.jpg",
    path: "Sanam Re_192(PagalWorld.com.se).mp3"
  },
  
{
    name: "Tere Hawaale",
    artist: "Song by Arijit Singh, Shilpa Rao",
    image: "https://c.saavncdn.com/119/Tere-Hawaale-From-Laal-Singh-Chaddha-Hindi-2022-20220804093945-500x500.jpg",
    path: "Tere Hawaale(PagalWorld.com.se).mp3",
  },
  {
    name: "Mein Ishq Tera Ban Jaau",
    artist: "Song by Gaurav Mali",
    image: "https://i.ytimg.com/vi/1Q3PWjj8KhE/maxresdefault.jpg",
    path: "Mein Ishq Tera Ban Jaau_192(PagalWorld.com.se).mp3",
  },
  {
    name: "Mahiye Jinna Sohna",
   artist: "Song by Darshan Raval",
     image: "https://c.saavncdn.com/122/Mahiye-Jinna-Sohna-Hindi-2023-20230801104702-500x500.jpg",
     path: "Mahiye Jinna Sohna_192(PagalWorld.com.se).mp3",
   },
  {
    name: "Rasiya",
    artist: "Song by Pritam Chakraborty, Shreya Ghoshal",
    image: "https://c.saavncdn.com/897/Rasiya-From-Brahmastra-Hindi-2022-20220924115713-500x500.jpg",
    path: "Rasiya_192(PagalWorld.com.se).mp3",
  },
  {
    name: "Chaleya",
    artist: "Song by Arijit Singh and Shilpa Rao",
    image: "https://pagalnew.com/coverimages/chaleya-jawan-500-500.jpg",
    path: "Chaleya_192(PagalWorld.com.se).mp3",
  },
  {
    name: "Afreen Afreen",
    artist: "Song by Momina Mustehsan and Rahat Fateh Ali Khan",
    image: "https://raag.fm/image/250/2899361/Afreen-Afreen---Remembering-Ustad-Nusrat-Fateh-Ali-Khan-Nusrat-Fateh-Ali-Khan.jpg",
    path: "Afreen Afreen(PagalWorld.com.se).mp3",
  },
  {
    name: "Naah Lofi",
    artist: "Song by Jass Manak",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/70/be/f3/70bef38a-5234-1d28-b14e-90576356d4f2/cover.jpg/1200x1200bf-60.jpg",
    path: "Naah Lofi_320(PagalWorld.com.se).mp3",
  },
  {
    name: "Nain Ta Heere",
    artist: "Song by Asees Kaur and Guru Randhawa",
    image: "https://c.saavncdn.com/148/Nain-Ta-Heere-From-Jugjugg-Jeeyo-Hindi-2022-20220616121005-500x500.jpg",
    path: "Nain Ta Heere - Lisa_192(PagalWorld.com.se).mp3",
  },

  {
    name: "Let Me Down Slowly x Main Dhoondne Ko Zamaane Mein",
    artist: "Song by Sahil Ahuja",
    image: "https://i.scdn.co/image/ab67616d0000b27333a111350da4d4b9458545af",
    path: "Let Me Down Slowly x Main Dhoondne Ko Zamaane Mein (Gravero Mashup)_192(PagalWorld.com.se).mp3",
  },

  {
      name: "Pakki Wali Dosti",
     artist: "Song by Amjad Nadeem Aamir and Saaj Bhatt",
       image: "https://pagalfree.com/images/128Pakki%20Wali%20Dosti%20-%20Saaj%20Bhatt%20128%20Kbps.jpg",
       path: "Pakki Wali Dosti_192(PagalWorld.com.se).mp3",
   },
   {
    name: "Maan Meri Jaan",
   artist: "Song by King",
     image: "https://images.genius.com/1e9a6b7ea9de88bea41f8ed7c56ffdd2.1000x1000x1.jpg",
     path: "Maan Meri Jaan_192(PagalWorld.com.se).mp3",
 },
 
   {
    name: "Headlights",
   artist: "Song by Alan Walker and Alok",
     image: "https://i.scdn.co/image/ab67616d0000b27347bb1d9a3e8aae47ef21a972",
     path: "Headlights_320(PagalWorld.com.se).mp3",
   },








  ];

function random_bg_color() {

  
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

 
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
