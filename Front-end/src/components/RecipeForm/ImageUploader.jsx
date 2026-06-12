import { useState } from 'react';
import axios from 'axios';
import './ImageUploader.css';

export default function ImageUploader({ onUploadSuccess }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 1. Cria um preview visual instantâneo para o utilizador ver no ecrã
        setImagePreview(URL.createObjectURL(file));

        // 2. Prepara o FormData para o Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'receitas_present'); // 🌟 O teu preset salvo

        try {
            setUploading(true);

            // 3. Envia diretamente para o teu servidor do Cloudinary
            // 🌟 ATUALIZADO: Já com o teu cloud name do painel!
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/ddclxntaf/image/upload`,
                formData
            );

            // 4. Saca o URL seguro que o Cloudinary gerou
            const imageUrl = response.data.secure_url;
            console.log("Imagem guardada com sucesso! URL:", imageUrl);

            setUploading(false);

            // 5. Passa o URL para o formulário pai atualizar o recipeData.image
            if (typeof onUploadSuccess === 'function') {
                onUploadSuccess(imageUrl);
            }

        } catch (err) {
            console.error("Erro ao enviar imagem:", err);
            alert("Não foi possível carregar a imagem. Tenta novamente.");
            setUploading(false);
        }
    };

    return (
        <div className="image-uploader-box">
            <label className="uploader-label">Imagem:</label>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploading}
                className="uploader-input-file"
            />

        </div>
    );
}