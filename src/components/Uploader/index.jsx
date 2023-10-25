import React from 'react';
import { useDropzone } from 'react-dropzone';

const Uploader = () => {
    const onDrop = React.useCallback(async (acceptedFiles) => {
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await fetch('http://localhost:3001/api/image-upload', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 200) {
                alert('Image uploaded successfully!');
            } else {
                alert('Error uploading image.');
            }
        } catch (error) {
            console.error('There was an error uploading the image', error);
            alert('Error uploading image.');
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        multiple: true,
    });

    return (
        <div {...getRootProps()} className="dropzone-element">
            <input {...getInputProps()} />
            <p>Загружать лапки сюда :3</p>
        </div>
    );
};

export default Uploader;
