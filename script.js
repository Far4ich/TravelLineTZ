const listContainer = document.getElementsByClassName("room-prices__list")

const roomPrices = [
  {
    title: "Представительский люкс",
    description: "Эксклюзивный номер с панорамным видом на центр города Москвы",
    image: "assets/rooms/executive-suite.jpg",
    price: 7900,
    isReserved: false,
  },
  {
    title: "Дуплекс",
    description: "Просторный двухкомнатный номер с шикарным видом на парк",
    image: "assets/rooms/duplex.jpg",
    bestPrice: true,
    price: 5700,
    isReserved: false,
  },
  {
    title: "Бизнес-люкс",
    description: "Трёхкомнатный номер с панорамным видом на Москва-реку",
    image: "assets/rooms/business-suite.jpg",
    price: 4900,
    isReserved: false,
  },
]

const formatNumberWithSpaces = (number) => {
  return String(number).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}

const changeReserve = (item, container) => {
  item.isReserved = !item.isReserved
  container ? container.addEventListener("mouseleave", () => update(), {once: true}) : update()
}

const bestPricesRender = () => {
  const container = document.createElement("div")
  container.className = "room-prices__item-best-price"
  container.innerHTML = `
    <div class="room-prices__item-best-price-text">
      Гарантия лучшей цены!
    </div>
    <svg class="room-prices__item-best-price-icon" width="36" height="30" viewBox="0 0 36 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3018 0H0V30H21.3568C21.9628 30 22.5453 29.7604 22.9825 29.3313L35.2782 17.2634C36.214 16.3449 36.2438 14.8246 35.3447 13.8686L22.9939 0.736539C22.5513 0.26595 21.9403 0 21.3018 0ZM14.085 19.2C16.6779 19.2 18.7799 17.051 18.7799 14.4C18.7799 11.749 16.6779 9.6 14.085 9.6C11.492 9.6 9.38997 11.749 9.38997 14.4C9.38997 17.051 11.492 19.2 14.085 19.2Z"/>
    </svg>
  `
  return container
}

const renderContentDescription = (item) => {
  const container = document.createElement("div")
  container.className = "room-prices__item-content-description"
  container.innerHTML = `
    <a href="#" class="room-prices__item-title">${item.title}</a> 
    <span class="room-prices__item-description">${item.description}</span>
  `
  return container
}

const renderItemPrice = (item, itemContainer) => {
  const container = document.createElement("div")
  container.className = "room-prices__item-content-price"
  container.innerHTML = `
    <p class="room-prices__item-content-price-paragraph">
     <span class="room-prices__item-content-price-paragraph-day">Цена за сутки</span>
     <br/>
     <span class="room-prices__item-content-price-paragraph-from">от </span>
     <span class="room-prices__item-content-price-paragraph-value">
       ${formatNumberWithSpaces(item.price)}
       <span class="room-prices__item-content-price-paragraph-currency">₽</span>
     </span>
   </p>
  `
  const button = document.createElement("button")
  button.className = "room-prices__item-content-price-button"
  button.innerHTML = `
    <span class="room-prices__item-content-price-button-text">Забронировать</span>
  `
  button.addEventListener("click", () => changeReserve(item, itemContainer))
  container.appendChild(button)
  
  return container
}

const renderItemReserved = () => {
  const container = document.createElement("div")
  container.className = "room-prices__item-content-reserved"
  container.innerHTML = `
    <p class="room-prices__item-content-reserved-text">
      Номер зарезервирован
      <br/>
      Перейти к <a href="#" class="room-prices__item-content-reserved-text-pay">оплате</a>
    </p>
  `
  return container
}

const renderItemBackground = (item) => {
  const container = document.createElement("div")
  container.className = "room-prices__item-background"
  container.innerHTML = `
    <div class="room-prices__item-background">
      <div class="room-prices__item-background-cover ${item.isReserved ? "room-prices__item-background-cover--reserved" : ""}"></div>
      <img class="room-prices__item-background-image" src="${item.image}" alt="${item.title}" >
    </div>`
  return container
}

const renderItemContent = (item, itemContainer) => {
  const container = document.createElement("div")
  container.className = "room-prices__item-content"
  container.appendChild(renderContentDescription(item))

  if(item.isReserved) {
    container.appendChild(renderItemReserved())
  } else {
    container.appendChild(renderItemPrice(item, itemContainer))
  }
  
  return container
}

const renderItem = (item) => {
  const itemContainer = document.createElement(item.isReserved ? "button" : "div")
  itemContainer.className = "room-prices__item"
  if(item.bestPrice && !item.isReserved) {
    itemContainer.appendChild(bestPricesRender())
  }
  itemContainer.appendChild(renderItemContent(item, itemContainer))
  itemContainer.appendChild(renderItemBackground(item))
  if(item.isReserved){
    itemContainer.addEventListener("click", () => changeReserve(item))
  }
  return itemContainer
}

const update = () => {
  listContainer[0].innerHTML = ""
  roomPrices.forEach((item) => {
    listContainer[0].appendChild(renderItem(item))
  })
}

update()