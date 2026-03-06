 const spnner=(status)=>{
    if(status){
      document.getElementById('spinner').classList.remove('hidden')
      document.getElementById('wordContainer').classList.add('hidden')
    }
    else{
      document.getElementById('wordContainer').classList.remove('hidden')
      document.getElementById('spinner').classList.add('hidden')
    }
  }

// speak
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

        {
             const loadButton=()=>{
              spnner(true)
            const url='https://openapi.programming-hero.com/api/levels/all';
            fetch(url)
            .then(res=>res.json())
            .then(data=>displalyButton(data.data)
            )
        }
const displalyButton=(buttons)=>{
  
const mainContainer=document.getElementById('buttonContainer')

buttons?.forEach(button=>{
   
    
  const showButton=document.createElement('div')
  showButton.innerHTML=`
    
<button id="acitivate${button.level_no}" onclick="wordShow(${button.level_no});activeFun(${button.level_no})" class="btn btn-outline btn-primary acitves"><i class="fa-solid fa-book-open"></i>Lessons-${button.level_no}</button>
           
  `;
  mainContainer.append(showButton)
  spnner(false)
})

}
displalyButton()
        loadButton()
        }
       
const wordShow=(id)=>{
   spnner(true)
    const url=`https://openapi.programming-hero.com/api/level/${id}`
fetch(url).then(res=>res.json())
.then(data=>{
    displayWord(data.data)
})
    
}
 //  spinner
const displayWord=(words)=>{
const wordContainer=document.getElementById('wordContainer')
wordContainer.innerHTML='';
if(words.length===0){
wordContainer.innerHTML=`
<div class="col-span-full text-center space-y-4">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
<h1 class="text-xl font-medium text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
<h1 class="text-4xl font-bold text-black">নেক্সট Lesson এ যান</h1>
<span class="loading loading-spinner loading-xl"></span>

</div>
`

spnner(false)
    }
words.forEach(word=>{
     
  
        const card=document.createElement('div')
card.innerHTML=`
<div class="bg-gray-100 shadow rounded-xl p-5 space-y-5 text-center ">
    <h1 class="text-2xl font-bold">${word.word ? word.word : 'No Word Found'}</h1>
    <p>meaning/Pronounciation</p>
    <h1 class="text-2xl font-bold h-15">${word.meaning ? word.meaning : 'অর্থ পাওয়া যাইনি!'}/${word.pronunciation ? word.pronunciation : 'No Pronoun. Found'}</h1>
    <div class="flex justify-between items-center">
        <button onclick="my_modal_1.showModal();loadWordInfor(${word.id})" class="btn hover:bg-gray-400"><i class="fa-solid fa-circle-info"></i></button>
        <button onclick="pronounceWord('${word.word}')" class="btn hover:bg-gray-400"><i class="fa-solid fa-volume-high"></i></button>
    </div>

</div>
`; 

wordContainer.append(card)
})
spnner(false)
}

const loadWordInfor=(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url).then(res=>res.json())
    .then(data=>{
        displayWordDetails(data.data)
    })
}
 
const displayWordDetails=(details)=>{
    const modalContainer=document.getElementById('modalContainer');
    modalContainer.innerHTML='';
    const modalCard=document.createElement('div')
    modalCard.innerHTML=`
       <div>
    <h1 class="text-2xl font-bold text-black mb-3">${details.word} (<i class="fa-solid fa-microphone-lines"></i> :${details.pronunciation})</h1>
    <h1 class="font-bold text-xl mb-2">meaning</h1>
    <h1 class="font-medium text-xl mb-6">${details.meaning? details.meaning : 'অর্থ নাই'}</h1>
    <h1 class="text-2xl font-medium mb-2">Example</h1>
    <button onclick="pronounceWord('${details.sentence}')" class="text-2xl text-gray-500 mb-5 flex justify-between items-center">${details.sentence} <i class="fa-solid fa-microphone-lines"></i></button>
    <p class="font-medium text-2xl mb-2">সমার্থক শব্দ গুলো</p>
    <div class="flex gap-4 items-center">
     ${
     details.synonyms.map(btn=>`
        <button class="btn">${btn}</button>
    
     `) 
     }
   
    </div>
   </div>
    `;
    modalContainer.append(modalCard)
    
}

// search word
const findWord=()=>{
  const input=document.getElementById("inputValue").value.toLowerCase()
fetch('https://openapi.programming-hero.com/api/words/all')
.then(res=>res.json()).then(data=>{
  const allWords=data.data
  const inputValue=allWords.filter(word=>word.word.toLowerCase().includes(input))
 displayWord(inputValue)
})
  
}
// active btn
const activeFun=(id)=>{
 const selectallbtn=document.querySelectorAll('.acitves')
 selectallbtn.forEach(btn=>btn.classList.remove('active'))
   const activeBtn= document.getElementById(`acitivate${id}`)
activeBtn?.classList.add('active')


}
