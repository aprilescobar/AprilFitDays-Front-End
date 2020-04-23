import React from 'react'
import PublicLibrary from './PublicLibrary'
import PersonalLibrary from './PersonalLibrary'

const ListPages = () => {
    return (
        <div>
            <h3>ListPages</h3>
            <PublicLibrary/>
            <PersonalLibrary/>            
        </div>
    )
}

export default ListPages