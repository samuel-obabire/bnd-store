import Jimp from 'jimp/es'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Form from '../form/Form'
import Spinner from '../spinner/Spinner'
import { generateId, parseString } from '../utils'
import { firestore, storage } from '../utils/firebase'

import { displayNoticationModal } from '../../redux/actions'

import './EditProduct.scss'

import NotificationModal from '../notification-modal/NotificationModal'
import { Link } from 'react-router-dom'

const fieldProps = [
  {
    name: 'title',
    id: 'product-title',
    type: 'text',
    label: 'Title'
  },
  {
    name: 'price',
    type: 'number',
    id: 'product-price',
    label: 'Price'
  },
  {
    name: 'category',
    type: 'select',
    id: 'product-category',
    label: 'Category',
    options: ['Select State', 'women clothing']
  },
  {
    name: 'description',
    type: 'textarea',
    id: 'product-description',
    label: 'Description'
  },
  {
    name: 'keywords',
    type: 'text',
    id: 'keywords',
    label: 'Search keywords'
  },
  {
    name: 'material',
    type: 'text',
    id: 'material',
    label: 'Material'
  },
  {
    name: 'sizes',
    type: 'text',
    id: 'sizes',
    label: 'Sizes'
  }
]

const EditProduct = ({ match, values, displayNoticationModal }) => {
  const [product, setProduct] = useState(null)
  const [productImage, setProductImage] = useState({})
  const [progress, setProgress] = useState(null)
  const [imageCollections, setImageCollections] = useState([])
  const [loading, setLoading] = useState(false)

  let uri = ''

  const imageLinks = []

  const { type } = match.params

  useEffect(() => {
    firestore
      .collection('products')
      .doc(`${match.params.id}`)
      .get()
      .then(doc => doc.data())
      .then(setProduct)
  }, [])

  const readProductImage = async () => {
    if (!productImage.length) return

    const reader = new FileReader()

    reader.readAsDataURL(productImage[0])

    reader.addEventListener('load', async () => {
      await Jimp.read(reader.result)
        .then(image => image.resize(Jimp.AUTO, 20))
        .then(image =>
          image.getBase64Async(Jimp.AUTO).then(base64 => {
            uri = base64
          })
        )
    })
  }

  const uploadProduct = async ({ values, ...otherProps }) => {
    console.log(values)

    const p = {
      ...otherProps,
      ...values,
      sizes: values?.sizes?.split(','),
      price: Number(values.price),
      indexes: [
        ...values?.keywords?.split(',')?.map(word => word?.toUpperCase())
      ]
    }

    const ref = firestore.collection('products').doc(values.id)

    const { keywords, ...product } = p
    console.log(product)

    await ref
      .set(product, { merge: true })
      .catch(e => displayNoticationModal('An error occured'))
  }

  const uploadImages = async () => {
    const ref = storage.ref()

    const promises = []

    const images = Object.values(imageCollections)
    images.unshift(productImage[0])

    if (!images.filter(Boolean).length) return

    images.forEach((image, i) => {
      if (i === 0) {
        const uploadTask = ref.child(`${generateId() + image.name}`).put(image)

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
          },
          error => {
            console.log(error.message)
            displayNoticationModal('An error occured', 'error')
            return setLoading(false)
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              imageLinks.unshift(downloadURL)
            })
          }
        )

        promises.push(uploadTask)
      } else {
        const uploadTask = ref.child(`${image.name}`).put(image)

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
          },
          error => {
            console.log(error.message)
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              imageLinks.push(downloadURL)
            })
          }
        )

        promises.push(uploadTask)
      }
    })

    await Promise.all(promises)
  }

  const onSubmit = async () => {
    if (!productImage.length && type === 'new')
      return displayNoticationModal('Images not selected', 'error')

    setLoading(true)

    await Promise.all([uploadImages(), readProductImage()])

    setTimeout(() => {
      const product = {
        values
      }

      if (uri) product.uri = uri
      if (imageLinks.length) {
        product.image = imageLinks[0]
        product.imageCollection = imageLinks
      }

      const renderMessage = () => {
        if (type === 'edit') return <div>Product sucessfully updated</div>
        return <div>Product sucessfully created</div>
      }

      uploadProduct(product).then(() => {
        setLoading(false)
        displayNoticationModal(renderMessage())
      })
    }, 2000)
  }

  const formFooterComponent = (
    <div className="field footer" style={{ background: 'transparent' }}>
      <label htmlFor="product-image">Choose Product Image</label>
      <input
        id="product-image"
        type="file"
        style={{ resize: 'none' }}
        accept="image/png, image/jpeg"
        onChange={e => {
          setProductImage(e.currentTarget.files)
        }}
      />
      <label htmlFor="product-image">Choose Product Gallery Images</label>
      <input
        id="product-gallery-images"
        type="file"
        style={{ resize: 'none' }}
        multiple
        accept="image/png, image/jpeg"
        onChange={e => {
          setImageCollections(Object.values(e.currentTarget.files))
        }}
      />
    </div>
  )

  const render = () => {
    return <NotificationModal />
  }

  try {
    if (!product && type === 'edit') return <Spinner />
    if (type === 'new') {
      const id = generateId()
      return (
        <div className="create-product">
          {render()}
          <h1>Create A Product</h1>
          <Form
            onFormSubmit={onSubmit}
            loading={loading}
            fieldProps={fieldProps}
            buttonText="Create Product"
            formFooterComponent={formFooterComponent}
            initialValues={{ id }}
          />
        </div>
      )
    }

    const {
      title,
      category,
      price,
      description,
      indexes: ind,
      material,
      sizes: s,
      id
    } = product

    const indexes = ind.join(','),
      sizes = s.join(',')

    return (
      <>
        <NotificationModal />
        {render()}
        <h1>{product.title}</h1>
        <Form
          loading={loading}
          onFormSubmit={onSubmit}
          fieldProps={fieldProps}
          buttonText={(() =>
            type === 'new' ? 'Create Product' : 'Update Product')()}
          formFooterComponent={formFooterComponent}
          initialValues={{
            title,
            category,
            price,
            description,
            keywords: indexes,
            material,
            sizes,
            id
          }}
        />
      </>
    )
  } catch (error) {
    console.log(error)
  }
}
const mapState = state => {
  const values = state?.form?.form?.values

  return {
    values
  }
}

export default connect(mapState, { displayNoticationModal })(EditProduct)
