
const cards = [
    'https://picsum.photos/id/237/100/100',
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
    
]

const gameBoard = document.getElementById('game-board')
let selectedCards = [] // Tableau qui va stocker les cards séléctionnées

function createCard(cardUrl){ // Fonction permettant de créer une card
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.value = cardUrl

    const cardContent = document.createElement('img')
    cardContent.classList.add('card-content')
    cardContent.src = cardUrl

    card.appendChild(cardContent)

    card.addEventListener('click', onCardClick) // Permet de déclancher la class flip au click sur la card
    return card
}

function duplicateArray(arraySimple){ // Fonction permettant de doubler le nombre d'image du tableau
    let arrayDouble = []
    arrayDouble.push(...arraySimple) // les ... permet d'éviter de créer à tableau à plusieurs dimensions, on garde un simple tableau de 16 images et non 2 tableaux de 8 images
    arrayDouble.push(...arraySimple)

    return arrayDouble
}

function shuffleArray(arrayToShuffle){ // Fonction qui permet de mélanger aléatoirement les images
    const arrayShuffled = arrayToShuffle.sort(() => 0.5 - Math.random())
    return arrayShuffled
}

let allCards = duplicateArray(cards)

allCards = shuffleArray(allCards)

allCards.forEach(card => { // Permet de créer pour chaque image une card et l'insérer dans la div
    const cardHtml = createCard(card)
    gameBoard.appendChild(cardHtml)
})

function onCardClick(e){ //Permet d'ajouter la classe 'flip' à la card lors du click
    const card = e.target.parentElement
    card.classList.add('flip')

    selectedCards.push(card) // Ajoute la card séléctionnée dans le tableau
    if(selectedCards.length == 2){

        setTimeout(() =>{
            if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
                selectedCards[0].classList.add("matched")
                selectedCards[1].classList.add("matched")
                selectedCards[0].removeEventListener('click', onCardClick)
                selectedCards[1].removeEventListener('click', onCardClick)

                const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)') // Permet de séléctionner tous les éléments qui n'ont pas la class matched
                if(allCardsNotMatched.length === 0) {
                    alert("Bravo ! Vous avez gagné")
                }
            } else {
                selectedCards[0].classList.remove("flip")
                selectedCards[1].classList.remove("flip")
            }
            selectedCards = [] // On vide le tableau    
        }, 300)
    }
}