import { useMemo } from 'react'
import './App.css'
import IImageUploader, { useIImageUploaderImages, type IImageUploaderOptions, type IImageUploaderTranslates, type IImageUploaderRules } from './components/IImageUploader';

function App() {

  const imagesData = useIImageUploaderImages();

  const options = useMemo<IImageUploaderOptions>(() => {
    return {
      formats:"all",
      uploaderHeight: 100,
      uploaderWidth: 100,
      multiple: true,
      removeable: true,
      preview: true,
      showLabel: true, 
      rotateable: true, 
      mirrorable: true
    }
  }, [])

  const translates = useMemo<IImageUploaderTranslates>(() => {
    return {
      upload: "Şəkil Yüklə",
      label: "Şəkillər seç", 
      loading: "Yüklənir", 
      save: "Yadda saxla"
    }
  }, [])

  const rules = useMemo<IImageUploaderRules>(() => {
    return {
      requirement: {
        isRequired: true,
        mes: 'Şəkil seçilməlidir'
      },
      min: {
        limit: 2,
        mes: 'Mimimum 2 şəkil seçilməlidir'
      },
      max: {
        limit: 5,
        mes: 'Maksimum 5 şəkil seçilə bilər'
      }
    }
  }, [])

  return (
    <>
      <div className='upload-container'>

        <IImageUploader
          data={imagesData}
          options={options}
          translates={translates}
          rules={rules}
        />

      </div>

    </>
  )
}

export default App
