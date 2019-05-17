import React from 'react'
import ScoopedBoxFrame from './ScoopedBoxFrame'

import { FilePond, registerPlugin  } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'

import '../styles/ImageUpload.css'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

registerPlugin(FilePondPluginImagePreview)
registerPlugin(FilePondPluginFileValidateType)
registerPlugin(FilePondPluginImageCrop)
registerPlugin(FilePondPluginImageResize)

const ImageUpload = (props) => {

  let pond

  const handleSubmit = async () => {
    const files = await pond.processFiles()
    props.addPictures(files.map(file => file.serverId))
  }


  return (
    <div className="img-uploader">
        <FilePond 
            ref={ref => pond = ref}
            allowMultiple={true}
            acceptedFileTypes={['image/jpeg']}
            allowImageCrop={true}
            imageCropAspectRatio={'1:1'}
            allowImageResize={true}
            imageResizeTargetWidth={1080}
            imageResizeTargetHeight={1080}
            imageResizeUpscale={false}
            instantUpload = {false}
            labelIdle = '<span class="filepond--label-action"> Select images </span>'
            server = "/api/images" 
        />
        <ScoopedBoxFrame 
            id='submit' 
            radius={20}
            primaryColor="#436151"
            clickEvent={handleSubmit}
            type="box"
            children = {
              <div className="button-label">
               <p>Next</p> 
              </div>
            }
          />
    </div>
  )
}

export default ImageUpload