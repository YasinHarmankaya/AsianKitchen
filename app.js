// const menu = [
//   {
//     id: 1,
//     title: "Tteokbokki",
//     category: "Korea",
//     price: 10.99,
//     img:
//       "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
//     desc: `Spicy rice cakes, serving with fish cake.`,
//   },
//   {
//     id: 2,
//     title: "Chicken Ramen",
//     category: "Japan",
//     price: 7.99,
//     img:
//       "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
//     desc: `Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg. `,
//   },
//   {
//     id: 3,
//     title: "Bibimbap",
//     category: "Korea",
//     price: 8.99,
//     img:
//       "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
//     desc: `Boiling vegetables, serving with special hot sauce`,
//   },
//   {
//     id: 4,
//     title: "Dan Dan Mian",
//     category: "China",
//     price: 5.99,
//     img:
//       "https://www.savingdessert.com/wp-content/uploads/2019/02/Dan-Dan-Noodles-10.jpg",
//     desc: `Dan dan noodle, serving with green onion `,
//   },
//   {
//     id: 5,
//     title: "Yangzhou Fried Rice",
//     category: "China",
//     price: 12.99,
//     img:
//       "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
//     desc: `Yangzhou style fried rice, serving with bean and pickles `,
//   },
//   {
//     id: 6,
//     title: "Onigiri",
//     category: "Japan",
//     price: 9.99,
//     img:
//       "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
//     desc: `Rice Sandwich, serving with soy sauce`,
//   },
//   {
//     id: 7,
//     title: "Jajangmyeon",
//     category: "Korea",
//     price: 15.99,
//     img:
//       "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
//     desc: `Black bean sauce noodle, serving with green onion `,
//   },
//   {
//     id: 8,
//     title: "Ma Yi Shang Shu",
//     category: "China",
//     price: 12.99,
//     img:
//       "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
//     desc: `Hot pepper sauce noodle, serving with soy bean and onion`,
//   },
//   {
//     id: 9,
//     title: "Doroyaki",
//     category: "Japan",
//     price: 3.99,
//     img:
//       "https://www.justonecookbook.com/wp-content/uploads/2011/10/Dorayaki-New-500x400.jpg",
//     desc: `Red bean paste dessert, serving with honey.`,
//   },
// ];
const menu = JSON.parse(localStorage.getItem('menu')) ||[];
localStorage.setItem('menu', JSON.stringify(menu))
const meals = document.querySelector('.section-meals')
const btnContainer = document.querySelector('.btn-container')


// Taking categories from array
const categories = menu.reduce((values, item) => {
  if (!values.includes(item.category)) {
    values.push(item.category);
  }
  return values;
},
  ["All"]
);
// Creating category Buttons
const categoryList = () => {
  const categoryButtons = categories
  .map(category => {
    return `<button type="button" class="btn btn-outline-secondary btn-item" data-id=${category}>${category}</button>`
  }).join("");
  
  btnContainer.innerHTML = categoryButtons
  // Adding Event Listener to All button which are created before. 
  const filterButtons = document.querySelectorAll(".btn-item")
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(menuItem => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "All") {
        menuList(menu);
      } else {
        menuList(menuCategory);
      }
    });
  });
}
const menuList = (menuItems) => {
  let displayMenu = menuItems.map((item) => {
    return `<div class="menu-items col-lg-6 col-sm-12">
    <img
      src=${item.img}
      alt=${item.title}
      class="photo"
    />
    <div class="menu-info">
      <div class="menu-title">
        <h4>${item.title}</h4>
        <h4 class="price">${item.price}</h4>
      </div>
      <div class="menu-text">
        ${item.desc}
      </div>
    </div>
  </div>`;
  });
  displayMenu = displayMenu.join("");
  meals.innerHTML = displayMenu;
}

//Adding new meals
// Getting form elements
const form = document.querySelector('form')
//Finding Last ID of Array
let lenghtOfMenu = menu.length;
console.log(lenghtOfMenu)
//Adding event listener to the form element
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const item = {
    id: lenghtOfMenu++,
    title: e.target.elements.title.value,
    category: e.target.elements.category.value,
    price: e.target.elements.price.value,
    img: e.target.elements.mealImageLink.value,
    desc: e.target.elements.description.value
  }
  menu.push(item);
  localStorage.setItem('menu', JSON.stringify(menu))
  e.target.reset();
  load()
})
//End of Adding eventlistener to the form element



//Display Categories
const categorySelection = document.querySelector('.options')
categories.map(itemName=>{
  let optionElement = document.createElement("option")
  optionElement.innerText = `${itemName}`;
  categorySelection.appendChild(optionElement)
})
// End of Display Categories

//End of Adding new meals
load()
function load(){
  menuList(menu);
  categoryList();
}