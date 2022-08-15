import React, {useState} from 'react'

const FilterByCategory = (props) => {
    const { categories, handleFilters } = props
    const [checkedCategories] = useState(new Set())
    const update = (idCategory) => {
        if(checkedCategories.has(idCategory))
            checkedCategories.delete(idCategory)
        else
            checkedCategories.add(idCategory)
        handleFilters('category', Array.from(checkedCategories))
    }
    return (
        <div>
            <h4>Filter by Categories</h4>
            <ul>
                {
                    categories.map((category, i) => (
                        <li key={i} className='list-unstyled my-3'>
                            <input onClick={() => update(category._id)} value={category._id} type="checkbox" name='' id={i} className='form-check-input' />
                            <label htmlFor={i} className='form-check-label px-3'>{category.name}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FilterByCategory