import { Box, TextField, Typography, styled } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik } from 'formik'
import { useRef, useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import CarouselTable from '../components/CarouselTable'


const CarouselSettings = () => {
  const [fileArray, setFileArray] = useState([])
  const [UpdateTime, setUpdateTime] = useState(false)
  const [rld, setRld] = useState(false)



  const imageRef = useRef(null)
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]


  const initialValues = {
    alt: '',
    picture: null,
    type: '',
    order :'',
  }

  const uploadMultipleFiles = (e) => {
    fileArray.push(URL.createObjectURL(e.target.files[0]))
  }

  const validationSchema = Yup.object().shape({
    alt: Yup.string(),
    picture: '',
    type: Yup.string(),
    order :'',
  })

  const handleFormSubmit = (data, onSubmitProps) => {

    const formData = new FormData

    for (let value in data) {
      formData.append(value, data[value]);
    }

    axios.post("http://localhost:3001/carousel/addItem", formData)
      .then((res) => {
        console.log(res.data);
        onSubmitProps.resetForm()
        setRld(!rld)
        setFileArray([])
      }).catch((err) => {
        console.log(err);
      })

  }
  return (
    <Container>
      <section className='left-side'>
        <Formik
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                padding: '0',
              }}>

                <TextField
                  label="Alt"
                  name="alt"
                  variant='standard'
                  sx={{
                    gridColumn: "span 4",
                    margin: '5px auto',

                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.alt}
                  error={Boolean(touched.alt) && Boolean(errors.alt)}
                />
                <FormControl variant="standard" 
                sx={{
                  gridColumn: "span 4",
                  margin: '5px 25px',

                }}
                >
                  <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={values.type}
                    label="Type"
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.type) && Boolean(errors.type)}
                  >
                    <MenuItem value={'i'}>Image</MenuItem>
                    <MenuItem value={'v'}>Video</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Order"
                  name="order"
                  variant='standard'
                  sx={{
                    gridColumn: "span 4",
                    margin: '5px auto',

                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.order}
                  error={Boolean(touched.order) && Boolean(errors.order)}
                />
                <Box sx={{ gridColumn: "span 4", margin: '5px auto', }}>
                  {(fileArray || []).map((url, i) => (
                    <img key={i} src={url} alt="..." width='200px' height='200px' />
                  ))}
                </Box>

                <Box sx={{ gridColumn: "span 4", }} className='imageBtn-container'>
                  <input type="file" id='image' ref={imageRef} hidden name='picture' onChange={(e) => { setFieldValue('picture', e.target.files[0]); uploadMultipleFiles(e) }} />
                  <button className='button-56' type='button' onClick={() => { imageRef.current.click() }}>Upload Image</button>
                </Box>

                <div className='btn-container'>
                  <button type='submit' className='blue-btn Create-Update' >{UpdateTime ? 'Update' : 'Create'}</button>
                  <button type='reset' className='reset-btn' onClick={() => { setFieldValue('picture', null); setFileArray([]); setUpdateTime(false); resetForm() }}>Reset</button>
                </div>

              </Box>


            </form>
          )}

        </Formik>
      </section>
      <section className='right-side'>
        <CarouselTable rld={rld} />
      </section>
    </Container >
  )
}

export default CarouselSettings


const Container = styled(Box)`
display: grid;
grid-template-columns: 1fr 4fr;
justify-content: center;
grid-column-gap: 20px;

.left-side {
    display: grid;
    grid-template-columns: 1fr;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 30px;
    min-height: fit-content;
    .btn-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 10px;
      }

    .Create-Update {
        width: 80%;
        margin: 5px 0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;    
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        justify-self: flex-end;

        background-image: linear-gradient(to right, rgb(74, 225, 37), rgb(115, 235, 68), rgb(4, 254, 137), rgb(63, 237, 92));
      }
      .reset-btn{
        width: 80%;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        margin: 5px 0;
        border :#9b9b9b solid 1px ;
        color: dark;
        cursor: pointer;
        transition:  transform in 0.2s;
        &:hover {
              transform: scale(1.01, 1.01);
              border: #111 1px solid;
            }
      }
      .imageBtn-container{

display: grid;
grid-template-columns: 1fr ;
margin-bottom: 10px;
justify-items: center;

.button-56 {
margin: 25px 0;
align-items: center;
background-color: #f6f9fc;
border: 2px solid #9b9b9b;
box-sizing: border-box;
color: #555454;
cursor: pointer;
display: flex;
font-size: 16px;
min-height: 35px;
justify-content: center;
line-height: 24px;
width: 85%;
position: relative;
text-align: center;
text-decoration: none;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
}
.button-56:after {
    background-color: #c0bebe;
    content: "";
    display: block;
    min-height: 35px;
    left: 0;
    width: 100%;
    position: absolute;
    top: -2px;
    transform: translate(6px, 6px);
    transition: transform .2s ease-out;
    z-index: -1;
}

.button-56:hover:after {
    transform: translate(0, 0);
}

.button-56:active {
    outline: 0;
}

.button-56:hover {
    outline: 0;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e,#38ef7d);
    border-image-slice: 1;
}

@media (min-width: 768px) {
    .button-56 {
    padding: 0 40px;
    }
}
}
  }





.right-side {
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 3%;
  position: relative;
  min-height: 95vh;
  max-height: 95vh;
  padding : 10px;

}

`