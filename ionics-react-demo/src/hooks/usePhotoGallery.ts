import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";
import { Photo } from '../components/usePhotoGallery'

/**
 * Access native camera and takes a photo, or return it from gallery
 * 
 * @returns photos: array of photos taken; takePhoto: function to call when you wanna take a photo
 */
export function usePhotoGallery() {
    // Native object
    const { getPhoto } = useCamera();
    // Array to store temporary photos
    const [photos, setPhotos] = useState<Photo[]>([]);

    const takePhoto = async () => {
        // Native call
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        // Get photo taken and store it on array
        const fileName = new Date().getTime() + '.jpeg';
        const newPhotos = [{
            filepath: fileName,
            webviewPath: cameraPhoto.webPath
        }, ...photos];
        setPhotos(newPhotos)
    };

    return {
        photos,
        takePhoto,
    };
}