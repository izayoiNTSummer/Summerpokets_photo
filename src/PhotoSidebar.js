import React from 'react';
import photoData from './PhotoData';
import './PhotoSidebar.css';

function PhotoSidebar() {
    return (
        <div className='photo-sidebar'>
            {photoData.map(cat => (
                <div key={cat.category} className='photo-category'>
                    <h3>{cat.category}</h3>
                    <div className='photo-list'>
                        {cat.images.map((img) => (
                            <div key={img.filename} className='photo-item'>
                                <img
                                  src={`/photos/${cat.category}/${img.filename}`}
                                  alt={img.title}
                                  className='photo-thumb'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PhotoSidebar;