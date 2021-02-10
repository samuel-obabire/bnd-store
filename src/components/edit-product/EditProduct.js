import Jimp from 'jimp/es'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Form from '../form/Form'
import Spinner from '../spinner/Spinner'
import { generateId } from '../utils'
import { firestore, storage } from '../utils/firebase'

import { displayNoticationModal } from '../../redux/actions'

import './EditProduct.scss'

import NotificationModal from '../notification-modal/NotificationModal'

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
    type: 'text',
    id: 'product-category',
    label: 'Category'
  },
  {
    name: 'product-description',
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

  useEffect(() => {
    firestore
      .collection('products')
      .doc(`${match.params.id}`)
      .get()
      .then(doc => doc.data())
      .then(setProduct)
  }, [])

  const readProductImage = async () => {
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

  const uploadProduct = async ({ values, uri, imageLinks }) => {
    console.log(values)
    const p = {
      ...values,
      sizes: values?.sizes?.split(','),
      price: Number(values.price),
      indexes: [
        ...values?.keywords?.split(',')?.map(word => word?.toUpperCase())
      ],
      uri,
      imageCollections: imageLinks,
      description: values['product-description'],
      image: imageLinks[0]
    }

    const ref = firestore.collection('products').doc(values.id)

    const { keywords, ...product } = p
    console.log(product)
    console.log(7)

    await ref
      .set(product, { merge: true })
      .then(displayNoticationModal('Product sucessfully uploaded'))
  }

  const uploadImages = async () => {
    const ref = storage.ref()

    console.log(7)

    const promises = []

    const images = Object.values(imageCollections)
    images.unshift(productImage[0])

    images.forEach((image, i) => {
      if (i === 0) {
        const uploadTask = ref.child(`${image.name}`).put(image)

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
          },
          error => {
            window.alert('unsucessful')
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
            window.alert('unsucessful')
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
    console.log('running')
    if (!productImage.length)
      return displayNoticationModal('Images not selected', 'error')
    console.log(productImage.length)

    setLoading(true)

    await Promise.all([uploadImages(), readProductImage()])

    setTimeout(() => {
      uploadProduct({ values, uri, imageLinks }).then(() => {
        setLoading(false)
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
    const { type } = match.params

    if (!product && type === 'edit') return <Spinner />
    if (type === 'new') {
      const id = generateId()
      return (
        <>
          {render()}
          <h1>Create New Product</h1>
          <Form
            onFormSubmit={onSubmit}
            loading={loading}
            fieldProps={fieldProps}
            buttonText="Create Product"
            formFooterComponent={formFooterComponent}
            initialValues={{ id }}
          />
        </>
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
        <h1>Edit {product.title}Product</h1>
        <Form
          loading={loading}
          onFormSubmit={onSubmit}
          fieldProps={fieldProps}
          buttonText="Create Product"
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
