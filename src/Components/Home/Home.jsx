import React from 'react'
import Artist from './Artist'
import GallerySection from './GallerySection'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <Artist />
            <GallerySection />
            <Link to="/admin">Admin</Link>
        </div>
    )
}
