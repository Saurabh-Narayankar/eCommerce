import Categories from "../../components/categories/categories.component";
import { Outlet } from 'react-router-dom'

function Homepage() {
    const categories = [
      {
        id: 1,
        title: "Hats",
        imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
        route: 'shop/hats'
      },
      {
        id: 2,
        title: "Jackets",
        imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
        route: 'shop/jackets'
      },
      {
        id: 3,
        title: "Sneakers",
        imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
        route: 'shop/sneakers'
      },
      {
        id: 4,
        title: "Sweaters",
        imageUrl: "https://i.ibb.co/QjBDTZ3/sweaters.png",
        route: 'shop/sweaters'
      },
      {
        id: 5,
        title: "Watches",
        imageUrl: "https://i.ibb.co/px935RX/watches.png",
        route: 'shop/watches'
      },
      {
        id: 6,
        title: "Sunglasses",
        imageUrl: "https://i.ibb.co/9W1jWbt/sunglasses.png",
        route: 'shop/sunglasses'
      },
      {
        id: 7,
        title: "Women",
        imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
        route: 'shop/womens'
      },
      {
        id: 8,
        title: "Men",
        imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
        route: 'shop/mens'
      }
    ];
  
    return (
      <div>
        <Categories categories={categories} />
        <Outlet/>
      </div>
    )
    
  }

  export default Homepage;