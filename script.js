
console.log("Welcome")
let songs = [];
let prevbtn = document.getElementById("prev");
let nextbtn = document.getElementById("next");
let songlist = document.querySelector(".songList").getElementsByTagName("ul")[0];
let playbtn = document.getElementById("playbtn");
let slider = document.getElementsByClassName("slider")[0];

let cardContainer=document.querySelectorAll(".cardContainer")[0];
let currentSong = new Audio();
let curFolder;
let mainSong;
let track;

//Seconds to Minute Function
function secondsToMinutes(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}


async function getsongs(folder) {
  curFolder = folder;
  console.log(curFolder);

  let response = await fetch(`${folder}`);
  response = await response.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  songs = [];
  for (let index = 0; index < as.length; index++) {
    let element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }

  songlist.innerHTML = "";

  for (const song of songs) {
    mainSong = song.split("/SONG/")[1].replaceAll("%20", " ").split("-")[0];
    songlist.innerHTML = songlist.innerHTML + `<li><img src="img/music.svg" class="invert" alt="">
                                               <div class="info">
                                                  <div class="songName">
                                                         ${mainSong}
                                                       </div>
                                                     <div class="songArtist">
                                                  Nevid
                                                     </div>
                                                 </div>
                                               <div class="playNow">
                                               <span>
                                                     Play Now
                                               </span>
                                                   <img src="img/play.svg" class="invert" alt="">
                                                </div>
                                                </li>`;
  }


  //DefaultSong
  track = mainSong
  playMusic(track, true);


  //Add event listener too each song in library
  Array.from(document.querySelector((".songList")).getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    })

  })
}



const playMusic = (track, pause = false) => {
  playbtn.src = "img/play.svg";
  currentSong.src = `${curFolder.split("/")[0]}/` + track;
  console.log(curFolder.split("/")[0] + "/" + track)

  document.querySelector(".songInfo").innerHTML = `${decodeURI(track)}`;
  if (!pause) {
    currentSong.play();
    playbtn.src = "img/pause.svg";
  }



}
//Albums Function
let displayAlbums=async ()=>{

  let response = await fetch(`/SONG/`);
  response = await response.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let folders = Array.from(as);
  for (let index = 0; index < folders.length; index++) {
    let element = folders[index];

    if (element.href.includes("SONG/")) {
    
      let folder=element.href.split("/").slice(-1)[0];
        
      let a =await fetch(`/SONG/${folder}/info.json`);
      let response=await a.json();
      
     
        cardContainer.innerHTML=cardContainer.innerHTML+` <div class="card" data-folder=${folder}>
                        <div class="play">
                            <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <!-- Green circular background -->
                                <circle cx="50" cy="50" r="30" fill="#1DB954" />

                                <!-- Play triangle -->
                                <polygon points="42,32 42,68 70,50" fill="#0b0b0b" />
                            </svg>

                        </div>
                        <img src="song/${folder}/cover.jpg" alt="">
                        <h2>${response.title}
                        </h2>
                        <p>${response.description}</p>
                    </div>`
  
      
    
    }
  }
  

}



async function main() {
  await getsongs(`SONG/mysong`);
  // console.log(songs)
  //display ALL albums
  await displayAlbums();


  //Update the Seekbar Circle//
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songTime").innerHTML = `${secondsToMinutes(currentSong.currentTime)}/${secondsToMinutes(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
  })

  //Take input from SeekBar//
  document.querySelector(".seeker").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (percent * currentSong.duration) / 100;
  })



  playbtn.addEventListener('click', async () => {


    if (currentSong.paused) {
      await currentSong.play();
      playbtn.src = "img/pause.svg";
    } else {
      currentSong.pause();
      playbtn.src = "img/play.svg";
    }

  })
  document.querySelector(".hamBurger").addEventListener("click", () => {
    console.log("hiii")
    document.querySelector(".left").style.left = "0%";
  })

  document.querySelector(".close").addEventListener("click", () => {

    document.querySelector(".left").style.left = "-110%";
  })




  let index;
  nextbtn.addEventListener('click', async () => {
    index = songs.indexOf(currentSong.src);
    if (index < songs.length) {
      mainSong = songs[index + 1].split("/SONG/")[1].replaceAll("%20", " ").split("-")[0];
      playMusic(mainSong)
      return;
    }
  })


  prevbtn.addEventListener('click', async () => {
    index = songs.indexOf(currentSong.src);
    console.log(index);
    if (index >= 0) {
      mainSong = songs[index - 1].split("/SONG/")[1].replaceAll("%20", " ").split("-")[0];
      playMusic(mainSong)
    }
  })

  // event listner on volume range
  slider.addEventListener("change", (e) => {
    currentSong.volume = (parseInt(slider.value) / 100);
  })
 //event listener to load library from folders
  Array.from(document.querySelectorAll(".card")).forEach(ele => {
    ele.addEventListener("click", async (t) => {
      console.log(t.currentTarget.dataset.folder)
      await getsongs(`SONG/${t.currentTarget.dataset.folder}`)

    })

  })



 
}
main();










































