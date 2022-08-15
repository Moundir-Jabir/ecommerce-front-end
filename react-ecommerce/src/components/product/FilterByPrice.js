import React, { useState } from 'react'

const FilterByPrice = (props) => {
    const [prices, setPrices] = useState([0, 500])
    const { handleFilters } = props
    const update = (e) => {
        const value = parseInt(e.target.value)
        let newPrices = prices
        if (e.target.name == 0)
            if (value > prices[1])
                newPrices[1] = value
        newPrices[e.target.name] = value
        setPrices(newPrices)
        handleFilters('price', prices)
    }
    return (
        <div>
            <h4>Filter by Price</h4>
            <div>
                <label for="min" className="form-label">Min : {prices[0]}</label>
                <input onChange={update} min="0" max="499" name='0' value={prices[0]} type="range" className="form-range" id="min" />
            </div>
            <div>
                <label for="max" className="form-label">Max : {prices[1]}</label>
                <input onChange={update} min={prices[0]} max="500" name='1' value={prices[1]} type="range" className="form-range" id="max" />
            </div>
        </div>
    )
}

export default FilterByPrice