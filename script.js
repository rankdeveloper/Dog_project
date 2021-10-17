
alert("Please upvote if you like\n")
//console.log("hello from js");

/*fetch("https://dog.ceo/api/breeds/list/all")
.then( response => response.json())
.then( data => {
console.log(data);
})*/

let timer;
let deleteFirstPhotoDelay;

async function start(){
const response = await fetch("https://dog.ceo/api/breeds/list/all")
const data = await response.json()
//console.log(data)

createBreedList(data.message)
}

start()


function createBreedList(breedList){
document.getElementById("breed").innerHTML=`
<select onchange="loadByBreed(this.value)">
                    <option>Choose Dog Breed</option>                

                ${Object.keys(breedList).map(function (breed) {
                return    `<option>${breed}</option>`;
                }).join("")}
                
                
                                
                    </select>            
`;
}

async function loadByBreed(breed){
if(breed != "Choose Dog Breed"){

const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)

const data = await response.json()

createSlideShow(data.message)
}
}

function createSlideShow(images){
  
  let currentPosition=0;
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
  //document.getElementById('slideshow').innerHTML=
  //console.log(`<div class="slide" style="background-image:url('${images[1]}')">
        //</div>`)
        if(images.length>1){
document.getElementById("slideshow").innerHTML=`<div class="slide"><img src="${images[0]}" alt="dog1"></div>
`

currentPosition+=2;
//if(currentPosition==2) currentPosition=0;


timer=setInterval(nextSlide , 3000)
}
        /*else{
document.getElementById("slideshow").innerHTML=`<div class="slide"><img src="${images[0]}" alt="dog1"></div>
<div class="slide"></div>
`
          
        }*/
        


function nextSlide(){
document.getElementById("slideshow").insertAdjacentHTML('beforeend', `<div class="slide"><img src="${images[currentPosition]}" alt="dog1"></div>`);
deleteFirstPhotoDelay=setTimeout(function () {
  document.querySelector(".slide").remove()
}, 1000);

if(currentPosition+1>=images.length){
  currentPosition=0;
}
else{
  currentPosition++;
}

}
}


//created by Rankush
