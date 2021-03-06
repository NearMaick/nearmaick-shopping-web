import { useEffect, useState } from "react";

import { ref, list, getDownloadURL } from 'firebase/storage'
import { storage } from "../services/firebase";
import { Header } from "../components/Header";

export function Receipts() {
  const [urls, setUrls] = useState<string[]>([]);

  async function loadPhotos(): Promise<void> {
    let storageRef = ref(storage, '/images/');

    const listPhotos = list(storageRef)

    const listPhotosItems = (await listPhotos).items.map(file => {
      return file.fullPath
    })

    const listPaths = listPhotosItems.map(url => {
      return url
    })

    const listUrl = await Promise.all(listPaths.map(url => getDownloadURL(ref(storage, url))))
    
    setUrls(listUrl)    
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  return(
    <div>
      <Header title="Comprovantes" />
      {urls.map(url => (          
          <img
            key={url}
            src={url} 
            alt="comprovantes"
            className="my-2 px-2"
          />          
      ))}
    </div>
  )
}