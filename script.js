
console.log("Welcome")
let songs = [];
let prevbtn = document.getElementById("prev");
let nextbtn = document.getElementById("next");
let songlist = document.querySelector(".songList").getElementsByTagName("ul")[0];
let playbtn = document.getElementById("playbtn");
let currentSong=new Audio();

//Seconds to Minute Function
function secondsToMinutes(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}


async function getsongs() {
  let response = await fetch("http://127.0.0.1:5500/SONG/");
  response = await response.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");


  for (let index = 0; index < as.length; index++) {
    let element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }

  return songs;

}



const playMusic=(track,pause=false)=>{
  playbtn.src = "img/play.svg";
  currentSong.src="/SONG/"+track;
  
   document.querySelector(".songInfo").innerHTML=`${decodeURI(track)}`;
  if(!pause){
    currentSong.play();
  playbtn.src = "img/pause.svg";
  }
  


}



async function main() {
  let songs = await getsongs();
  console.log(songs)
  let mainSong;
 
  for (const song of songs) {
  mainSong=song.split("/SONG/")[1].replaceAll("%20", " ").split("-")[0];
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
   track=mainSong.trim();
   playMusic(track,true);


//Add event listener too each song in library
Array.from(document.querySelector((".songList")).getElementsByTagName("li")).forEach((e)=>{
  e.addEventListener("click",(element)=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML);
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
  })

})

//Update the Seekbar Circle//
currentSong.addEventListener("timeupdate",()=>{
  document.querySelector(".songTime").innerHTML=`${secondsToMinutes(currentSong.currentTime)}/${secondsToMinutes(currentSong.duration)}`;
  document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
})

//Take input from SeekBar//
document.querySelector(".seeker").addEventListener("click",(e)=>{
  let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
  document.querySelector(".circle").style.left=percent+"%";
  currentSong.currentTime=(percent*currentSong.duration)/100;
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
  document.querySelector(".hamBurger").addEventListener("click",()=>{
    console.log("hiii")
    document.querySelector(".left").style.left= "0%";
  })

document.querySelector(".close").addEventListener("click",()=>{
   
    document.querySelector(".left").style.left= "-110%";
  })

}
main();


















































  // nextbtn.addEventListener('click', async () => {
  //   console.log(songs[i]);
  //   playbtn.src = "img/pause.svg";
  //   if (i >= songs.length - 1) {
  //     console.log("No next songs");

  //     return;
  //   } else {
  //     i++;
  //     audio.pause();
  //     audio = new Audio(songs[i]);
  //     await audio.play();
  //   }

  // })


  // prevbtn.addEventListener('click', async () => {
  //   console.log(songs[i]);
  //   if (i < 0) {
  //     console.log("No prev songs");
  //     return;
  //   } else {
  //     i--;
  //     audio.pause();
  //     audio = new Audio(songs[i]);
  //     await audio.play();
  //   }

  // })