import React, { useEffect, useState } from 'react';
import photoData from './PhotoData';
import './PhotoPairList.css';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function PhotoPairList() {
    const [userPhotos, setUserPhotos] = useState([]);
    const [uploading, setUploading] = useState({});
    const [refresh, setRefresh] = useState(false);

    // ユーザーのアップロード画像情報取得
    useEffect(() => {
        fetch(`${API_URL}/user_photos`, { credentials: 'include' })
          .then(res => res.json())
          .then(data => setUserPhotos(data));
    }, [refresh]);

    // base_image_name→uploaded_image_pathのマップを作る
    const userPhotoMap = {};
    userPhotos.forEach(item => {
        userPhotoMap[item.base_image_name] = item.uploaded_image_path;
    });
    
    // アップロード処理
    const handleUpload = async (e, baseImageName) => {
        e.preventDefault();
        const file = e.target.elements.file.files[0];
        if (!file) return;
        setUploading(prev => ({ ...prev, [baseImageName]: true}));
        const formData = new FormData();
        formData.append('base_image_name', baseImageName);
        formData.append('file', file);

        await fetch(`${API_URL}/upload_photo`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        setUploading(prev => ({ ...prev, [baseImageName]: false}));
        setRefresh(r => !r); // 再取得
    };

    // 削除処理
    const handleDelete = async (baseImageName) => {
        await fetch(`${API_URL}/delete_photo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base_image_name: baseImageName }),
            credentials: 'include'
        });
        setRefresh(r => !r);
    };

    return (
        <div>
            {photoData.map(cat =>
                <div key={cat.category}>
                    <h3>{cat.category}</h3>
                    <div className='photo-pair-list'>
                        {cat.images.map(baseImg => (
                            <div className='photo-pair-card' key={baseImg.filename}>
                                <div className='photo-pair-images'>
                                    {/* 左：既存画像 */}
                                    <img
                                    src={`/photos/${cat.category}/${baseImg.filename}`}
                                    alt={baseImg.title}
                                    className='photo-base-img'
                                    />
                                    {/* 右：アップロード画像*/}
                                    {userPhotoMap[baseImg.filename] ? (
                                        <img
                                        src={userPhotoMap[baseImg.filename]}
                                        alt="アップロード画像"
                                        className='photo-uploaded-img'
                                        />
                                    ) : (
                                        <div className='photo-uploaded-img photo-no-image'>
                                            No image
                                        </div>
                                    )}
                                </div>
                                <div className='photo-pair-actions'>
                                    {/* アップロードフォーム */}
                                    <form onSubmit={e => handleUpload(e, baseImg.filename)} className='photo-upload-form'>
                                        <div className="file-upload-wrapper">
                                            <input 
                                                type="file" 
                                                name="file" 
                                                id={`file-${baseImg.filename}`} 
                                                accept="image/*" 
                                                className="file-upload-input"
                                            />
                                            <label htmlFor={`file-${baseImg.filename}`} className="file-upload-label">
                                                <i className="fas fa-cloud-upload-alt"></i>
                                                画像を選択
                                            </label>
                                        </div>
                                        <button type="submit" className="upload-button" disabled={uploading[baseImg.filename]}>
                                            アップロード
                                        </button>
                                    </form>

                                    {/* 削除ボタン(アップロード画像がある場合のみ) */}
                                    {userPhotoMap[baseImg.filename] &&
                                    <button onClick={() => handleDelete(baseImg.filename)} className='photo-delete-btn'>
                                        削除
                                    </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhotoPairList;