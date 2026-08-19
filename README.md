###  React Image Uploader Package by Ilham Gurbanly.

Image Uploader Package. You can preview, edit and remove selected images. Also it is possible to make images rotated and mirrored and to save them. Rules, such as requirement, minimum, maximum. Full support for internationalization, 
all texts can be translated passing them as props. Image and Error datas are outside of component to have a better control over them.

### Installation

```sh
$ npm install i-img-uploader
```

### Usage

App.tsx: 

```js
import { useMemo } from 'react'
import './App.css'
import IImageUploader, { useIImageUploaderData, type IImageUploaderDataReturnedData, type IImageUploaderOptions, type IImageUploaderTranslates, type IImageUploaderRules } from 'i-img-uploader';
import "i-img-uploader/dist/style.css";

function App() {

  const data: IImageUploaderDataReturnedData = useIImageUploaderData();

  const options = useMemo<IImageUploaderOptions>(() => {
    return {
      formats: "all",
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
    <div>

        <IImageUploader
          data={data}
          options={options}
          translates={translates}
          rules={rules}
        />

      </div>
  )
}

export default App
```


### Props

<section>
        <ul>
          <li><strong>options: options object (Optional)</strong> <br />
            <ul>
              <li><strong>preview: boolean (Optional)</strong> - Whether the image can be previewed, default value is true.</li>
              <li><strong>uploaderHeight: number (Optional)</strong> - Uploader button height in pixels, default value is 90.</li>
              <li><strong>uploaderWidth: number (Optional)</strong> - Uploader button width in pixels, default value is 90.</li>
              <li><strong>multiple: boolean (Optional)</strong> - Whether multiple images can be selected, default value is true.</li>
              <li><strong>removeable: boolean (Optional)</strong> - Whether selected image can be deleted, default value is true.</li>
              <li><strong>rotateable: boolean (Optional)</strong> - Whether the image can be rotated in the preview, default value is true. You can save also rotated image.</li>
              <li><strong>mirrorable: boolean (Optional)</strong> - Whether the image can be mirrored in the preview. Default value is true. The mirrored image can also be saved.</li>
              <li><strong>showLabel: boolean (Optional)</strong> - Whether to show label, default value is true.</li>
              <li><strong>formats: 'all' | string[] (Optional)</strong> - Whether to select all formats or only specified image formats. Default value is all.</li>
            </ul>
          </li>
          <li><strong>translates: translates object (Optional)</strong> <br />
            <ul>
              <li><strong>upload: string (Optional)</strong> - Upload button text.</li>
              <li><strong>label: string (Optional)</strong> - Label text.</li>
              <li><strong>loading: string (Optional)</strong> - Loading text</li>
              <li><strong>save: string (OptionaL)</strong> - Save button text in preview</li>
            </ul>
          </li>
          <li><strong>rules: rules object (Optional)</strong> <br />
            <ul>
              <li><strong>requirement: requirement options (Optional)</strong> <br />
                <ul>
                  <li><strong>isRequired: boolean</strong> - Whether the field is required, default value is false.</li>
                  <li><strong>mes: string</strong> - Text to display when the field is empty.</li>
                </ul>
              </li>
              <li><strong>min: minimum rule options (Optional)</strong><br />
                <ul>
                  <li>
                    <strong>limit: number | null</strong> -
                    Minimum limit for images. The default value is null.
                    null means there is no minimum limit.
                  </li>
                  <li>
                    <strong>mes: string</strong> -
                    Text to display when the minimum limit rule is not satisfied.
                  </li>
                </ul>
              </li>
              <li><strong>max: maximum rule options (Optional)</strong><br />
                <ul>
                  <li>
                    <strong>limit: number | null</strong> -
                    Maximum limit for images. The default value is null.
                    null means there is no maximum limit.
                  </li>
                  <li>
                    <strong>mes: string</strong> -
                    Text to display when the maximum limit rule is not satisfied.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li><strong>data: data object from built-in useIImageUploaderData hook (Required)</strong> <br />
            <ul>
              <li><strong>images: array of image object (Required)</strong> - The main reason to use it outside and pass as props is to be able
                to set, to reset, to show or to use images outside of component self.<br />
                <ul>
                  <li><strong>id: string (Required)</strong> - Generated id.</li>
                  <li><strong>url: string (Required)</strong> - Generated url for the image to show it.</li>
                  <li><strong>loading: boolean (Required)</strong> - Loading state of image.</li>
                  <li><strong>file: File (Required)</strong> - Original File object of file input.</li>
                </ul>
              </li>
              <li><strong>setImages: (Required)</strong> - setter of images array.</li>
              <li><strong>errors: errors object: (Required)</strong> - The main reason to use it outside and pass as props is to detect errors
                outside of component self to prevent form submit. Error rules is defined in rules props. <br />
                <ul>
                  <li>
                    <strong>required: boolean (Required)</strong> - True if field is empty after first selecting.
                  </li>
                  <li>
                    <strong>min: boolean (Required)</strong> - True if min limit is not satisfied.
                  </li>
                  <li>
                    <strong>max: boolean (Required)</strong> - True if max limit is not satisfied.
                  </li>
                  <li>
                    <strong>hasError: boolean (Required)</strong> - True if the field fails validation due to a min, max, or required rule.
                  </li>
                </ul>
              </li>
              <li><strong>setErrors: (Required)</strong> - setter of errors.</li>
            </ul>
          </li>
          <li><strong>className: string (Optional)</strong> - classes for image uploader component.</li>
        </ul>
      </section>





