import React, {useState} from 'react'

const Search = (props) => {
    const [search, setSearch] = useState('')
    const update = (e) => {
        setSearch(e.target.value)
    }
    const submit = (e) => {
        e.preventDefault()
        props.handleFilters('search', search)
    }
    return (
        <form onSubmit={submit} style={{height: "70px"}} className='row row-cols-lg-auto g-3 justify-content-end align-items-start'>
            <div className='col-10'>
                <input value={search} onChange={update} type="text" className="form-control" placeholder="Search a product" />
            </div>
            <div className='col-2'>
                <button type="submit" className="btn btn-primary">Search</button>
            </div>
        </form>
    )
}

export default Search