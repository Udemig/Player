/* elementlere ulasip obje olarak kullanma, yakalama*/
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTime = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//indis sarki icin
let index

//dongu durumu
let loop = true

// decoding or parsing 
const songsList = [
    {
        name: "Gelo Ew Ki Bu",
        link: "assets/gelo-ew-ki-bu.mp3",
        artist: "Aram Tigran",
        image: "assets/aram-tigran.jpeg"
    },
    {
        name: "Gitme Kal",
        link: "assets/yara-bere-icindeyim.mp3",
        artist: "Hira-i Zerdust",
        image: "assets/hirai.jpeg"
    },
    {
        name: "Aramam",
        link: "assets/yara-bere-icindeyim.mp3",
        artist: "Ibrahim Tatlises",
        image: "assets/ibrahim-tatlises.jpeg"
    },
    {
        name: "Ax Eman",
        link: "assets/ax-eman.mp3",
        artist: "Rewsan Celiker",
        image: "assets/rewsan-celiker.jpeg"
    },
    {
        name: "Dinle",
        link: "assets/dinle.mp3",
        artist: "Mahsun Kirmizigul",
        image: "assets/mahsun.jpeg"
    }
]

//olaylar objesi
let events = {
    mouse:{
        click: "click"
    },
    touch: {
        click: "touchstart"
    }
}

let deviceType = ""


const isTouchDevice = () =>{
    try{
        document.createEvent("TouchEvent") // create olabilir
        deviceType = "touch"
        return true
    }catch(e){
        deviceType = "mouse"
        return false
    }
}


// zaman formatlama
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" +second : second
    return `${minute}:${second}`
}

//sarki atama
const setSong = (arrayIndex) => {
    //tum ozellikleri cikar
    let {name, link, artist, image} = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    //sureyi goster metadata yuklendiginde
    audio.onloadedmetadata = () =>{
        maxDuration.innerText = timeFormatter(audio.duration)//230 sn
    }
}

//sarkiyi oynat
const playAudio = () =>{
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}


//tekrar et
repeatButton.addEventListener('click',()=>{
    if(repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active')
        audio.loop = false
        console.log('tekrar kapatildi')
    }else {
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('tekrar acik')
    }
})


//siradaki sarkiya gec
const nextSong = () =>{
    //eger normal caliyorsa sonrakine gec
    if(loop){
        if(index == songArtist.length - 1){
            //sondaysa basa git
            index = 0
        }else {
            index += 1 
        }

        setSong(index)
        playAudio()
    } else {
        //rastgele bir sira bul ve oynat
        let randIndex = Math.floor(Math.random() * songsList.length)
        console.log(randIndex)
        setSong(randIndex)
        playAudio()
    }
}

//sarkiyi durdur
const pauseAudio= () =>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

//Onceki sarkiya gec
const previousSong = () =>{
    if(index > 0){
        pauseAudio()
        index -=1
    }else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio()
}


//sarki kendisi biterse sonrakine gec
audio.onended = () =>{
    nextSong()
}


//shuffle songs
shuffleButton.addEventListener('click',()=>{
    if(shuffleButton.classList.contains('active')){
        shuffleButton.classList.remove('active')
        loop = true
        console.log("karistirma kapali")
    } else {
        shuffleButton.classList.add('active')
        loop = false
        console.log('karistirma acik')
    }
})


//play button
playButton.addEventListener('click',playAudio)

//next button
nextButton.addEventListener('click',nextSong)

//pause button
pauseButton.addEventListener('click', pauseAudio)


//prev button
prevButton.addEventListener('click', previousSong)



