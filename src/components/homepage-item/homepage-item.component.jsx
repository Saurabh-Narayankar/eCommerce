import { useNavigate } from "react-router-dom"
import "./homepage-item.styles.scss"

const HomePageItem = ({ category }) => {

    const {id, title, imageUrl, route} = category
    const navigate = useNavigate()

    const navigateHandler = () => {
      navigate(route)
    }

    return(
      <div key={id} className='homepage-item-container' onClick={navigateHandler}>
        <div className='background-image' style={{
          backgroundImage: `url(${imageUrl})`
        }}/>
        <div className='body'>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
    )
}

export default HomePageItem;
