import './categories.styles.scss'
import HomePageItem from '../homepage-item/homepage-item.component'

const Categories = ({ categories }) => {

    return (
        <div className="categories-container">
            {categories.map((category) => {
            return (
                <HomePageItem key={category.id} category= {category} />
            )})}
        </div>
    )
}

export default Categories;