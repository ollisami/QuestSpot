const imagesRouter = require('express').Router()
const Image       = require('../models/image')
const multer       = require('multer');
const fs           = require('fs-extra')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

const upload = multer({ storage: storage })


imagesRouter.post("/", upload.single('filepond'), async (req, res, next) => {
    try {
        const img = fs.readFileSync(req.file.path);
        const encode_image = img.toString('base64');
        
        const buffer = new Buffer(encode_image, 'base64')
        const url =  'data:image/jpeg;base64,'+ encode_image
        const finalImg = new Image ({
            contentType: req.file.mimetype,
            data:  buffer,
            url: url
        })
        
        await finalImg.save()
        res.send(url)
        
    } catch (exception) {
        console.log( exception.message)
        res.status(400).send({ error: exception.message })
    }
  })

imagesRouter.get('/', async (request, response)  => {
    try {
        let allImages = await Image.find({})
        response.contentType('json');
        response.send(allImages)
    } catch (exception) {
        console.log( exception.message)
        response.status(400).send({ error: exception.message })
    }
})
    
imagesRouter.get('/:id', async (request, response)  => {
    const image = await Image.findById(request.params.id)
    response.contentType('json');
    response.send(image)
})

module.exports = imagesRouter