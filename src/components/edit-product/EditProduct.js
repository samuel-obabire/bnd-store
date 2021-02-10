import { useEffect, useState } from 'react'
import Form from '../form/Form'
import Spinner from '../spinner/Spinner'
import { firestore, storage } from '../utils/firebase'

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

const EditProduct = ({ match }) => {
  const [product, setProduct] = useState(null)
  const [productImages, setProductImages] = useState(null)
  const [progress, setProgress] = useState(null)
  const [imageLinks, setImageLinks] = useState([])

  useEffect(() => {
    firestore
      .collection('products')
      .doc(`${match.params.id}`)
      .get()
      .then(doc => doc.data())
      .then(setProduct)
  }, [])

  console.log(progress)

  const uploadImages = async () => {
    const ref = storage.ref()

    const promises = []

    Object.values(productImages).forEach(image => {
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
            setImageLinks(imageLinks.concat(downloadURL))
            console.log('File available at', downloadURL)
          })
        }
      )
      promises.push(uploadTask)
    })

    await Promise.all(promises)
  }

  const onSubmit = async () => {
    await uploadImages()
  }

  const formFooterComponent = (
    <div className="field footer" style={{ background: 'transparent' }}>
      <label htmlFor="product-image">Choose Product Images</label>
      <input
        id="product-image"
        type="file"
        style={{ resize: 'none' }}
        multiple
        accept="image/png, image/jpeg"
        onChange={e => setProductImages(e.currentTarget.files)}
      />
    </div>
  )

  if (!product) return <Spinner />

  const {
    title,
    category,
    price,
    description,
    indexes,
    material,
    sizes: s
  } = product

  const keywords = indexes.join(', '),
    sizes = s.join(', ')

  return (
    <>
      <Form
        onFormSubmit={onSubmit}
        fieldProps={fieldProps}
        buttonText="Create Product"
        formFooterComponent={formFooterComponent}
        initialValues={{
          title,
          category,
          price,
          description,
          keywords,
          material,
          sizes
        }}
      />
      {!progress ?? <div>{progress}</div>}
    </>
  )
}

export default EditProduct
