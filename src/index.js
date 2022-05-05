
document.addEventListener('DOMContentLoaded',()=>{
    makeDogBar();
    const filterBtn= document.querySelector('#good-dog-filter')
    filterBtn.addEventListener('click',filterToggle)
})
function dogSpan(obj){
    const dogBar = document.getElementById("dog-bar");
    const span = document.createElement('span');
    span.innerText = obj.name;
    span.id = obj.id
    span.addEventListener('click',(e)=>{
        fetch(`http://localhost:3000/pups/${e.target.id}`)
        .then(resp => resp.json())
        .then(addDogInfo)
        .catch(err => console.log(err))
    })
    dogBar.append(span);

}

function makeDogBar(){
    document.getElementById('dog-bar').innerText='';
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(resp => resp.forEach(dogSpan))
    .catch(err => console.log(err))
}

function addDogInfo(obj){
    const dogInfo = document.getElementById('dog-info');
    dogInfo.innerText =''
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const btn = document.createElement('button');
    img.src = obj.image;
    h2.innerText = obj.name;
    if (obj.isGoodDog === true){
        btn.innerText = "Good Dog!"
    }
    else btn.innerText = "Bad Dog!"
    btn.addEventListener('click',()=>{
        dogMoralityToggle(obj)})
    dogInfo.append(img, h2, btn);
}

function dogMoralityToggle(obj){
    let newMorality;
    if (obj.isGoodDog === true){
        newMorality = false
    }
    else newMorality = true;
    fetch('http://localhost:3000/pups/'+obj.id,{
        method: 'PATCH',
        headers: {
            "content-type": "application/json"
          },
        body: JSON.stringify({isGoodDog: newMorality})
    })
    .then(resp => resp.json())
    .then(addDogInfo)
}
function filterToggle(){
    let filterBtn = document.querySelector('#good-dog-filter')
    if (filterBtn.innerText === 'Filter good dogs: OFF'){
            filterBtn.innerText = 'Filter good dogs: ON';
            filterGoodDogs()
        }
    else{
            filterBtn.innerText = 'Filter good dogs: OFF';
            makeDogBar()
        }
}

function filterGoodDogs(){
    const dogBar = document.getElementById('dog-bar')
    dogBar.innerText = ''
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(resp => resp.filter(obj=>{
        if(obj.isGoodDog === true){
            dogSpan(obj)
        }
    }))
    .catch(err => console.log(err))
}