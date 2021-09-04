import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Row, Col, FormControl, Alert, Image, FloatingLabel, Form, ButtonGroup, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editStyle } from '../Actions/styleActions';
import Loader from '../Components/Loader';
import {STYLE_EDIT_RESET} from '../Constants/styleConstants'
import {countryList} from '../utils/CountryList'

// -------------import all list--------------------//
import {listAllSeason} from '../Actions/seasonActions'
import {listBrand} from '../Actions/brandActions'
import {listAllFabric} from '../Actions/fabricActions'
import {listAllStory} from '../Actions/storyActions'
import {listAllColor} from '../Actions/colorActions'
import {listAllCategory} from '../Actions/categoryActions'
import {listAllVendor} from '../Actions/vendorActions'




//---------------static data------------------------//
const garmentLengthList = ['Above Knee','Below Knee','Below Waist Length','Full Length','Hip Length','Mid Calf','Tunic Length']
const pantLengthList = ['Ankle Pant','Bermuda','Capri','Clamidgger','Full Length']
const fitCategoryList = ['Fitted','Oversized','Relaxed']
const sleeveLengthList = ['3/4 Sleeve','Bracelet Sleeve','Elbow Sleeve','Extended Shoulder','Full Length Sleeve','Short Sleeve','Sleeveless']


const StyleEditModal = ({style}) => {
    
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true) 
    const [name, setName] = useState(style.name)
    const [code, setCode] = useState(style.code)
    const [brand, setBrand] = useState(style.brand ? style.brand._id : '')
    const [mainFabric, setMainFabric] = useState(style.mainFabric ? style.mainFabric._id : '')
    const [subFabric1, setSubFabric1] = useState(style.subFabric1 ? style.subFabric1._id : '')
    const [subFabric2, setSubFabric2] = useState(style.subFabric2 ? style.subFabric2._id : '')
    const [category, setCategory] = useState(style.category ? style.category._id : '')
    const [fitCategory, setFitCategory] = useState(style.fitCategory ? style.fitCategory : '')
    const [sleeveLength, setSleeveLength] = useState(style.sleeveLength ? style.sleeveLength : '')
    const [garmentLength, setgarmentLength] = useState(style.garmentLength ? style.garmentLength : '')
    const [pantLength, setPantLength] = useState(style.pantLength ? style.pantLength : '')
    const [hsp, setHsp] = useState(style.hsp ? style.hsp : 0)
    const [pantInseam, setPantInseam] = useState(style.pantInseam ? style.pantInseam : 0)
    const [shortDescription, setShortDescription] = useState(style.shortDescription ? style.shortDescription : '')
    const [longDescription, setLongDescription] = useState(style.longDescription ? style.longDescription : '')
    const [vendor, setVendor] = useState(style.vendor ? style.vendor._id : '')
    const [weight, setWeight] = useState(style.weight ? style.weight : 0)
    const [coo, setCoo] = useState(style.coo ? style.coo : 0)
    const [storyNumber, setStoryNumber] = useState(style.storyNumber ? style.storyNumber : 0)
    const [storySortNumber, setStorySortNumber] = useState(style.storySortNumber ? style.storySortNumber : 0)
    const [uswRegular, setUswRegular] = useState(style.uswRegular ? style.uswRegular : 0)
    const [uswPlus, setUswPlus] = useState(style.uswPlus ? style.uswPlus : 0)
    const [cawRegular, setCawRegular] = useState(style.cawRegular ? style.cawRegular : 0)
    const [cawPlus, setCawPlus] = useState(style.cawPlus ? style.cawPlus : 0)
    const [usaRegular, setUsaRegular] = useState(style.usaRegular ? style.usaRegular : 0)
    const [usaPlus, setUsaPlus] = useState(style.usaPlus ? style.usaPlus : 0)
    const [caaRegular, setCaaRegular] = useState(style.caaRegular ? style.caaRegular : 0)
    const [caaPlus, setCaaPlus] = useState(style.caaPlus ? style.caaPlus : 0)
    const [priceNote, setPriceNote] = useState(style.priceNote ? style.priceNote : '')
    const [newImage, setNewImage] = useState('')
    const [corporate, setCorporate] = useState(style.corporate)
    const [newSize, setNewSize] = useState(style.sizes.length !== 0 ? [...style.sizes] : [])
    const [newSeason, setNewSeason] = useState(style.seasons.length !== 0 ? [...style.seasons] : [])
    const [newStory, setNewStory] = useState(style.stories.length !== 0 ? [...style.stories] : [])
    const [newColor, setNewColor] = useState(style.colors.length !== 0 ? [...style.colors] : [])
    
    const {loading: loadingEdit, error: errorEdit, success} = useSelector(state=>state.styleEdit)

    // --------------loading and error for list all datas-----------------//
    const {loading: loadingSeason, error: errorSeason, seasons} = useSelector(state => state.seasonListAll)
    const {loading: loadingBrand, error: errorBrand, brands} = useSelector(state => state.brandList)
    const {loading: loadingFabric, error: errorFabric, fabrics} = useSelector(state => state.fabricListAll)
    const {loading: loadingStory, error: errorStory, stories} = useSelector(state => state.storyListAll)
    const {loading: loadingColor, error: errorColor, colors} = useSelector(state => state.colorListAll)
    const {loading: loadingCategory, error: errorCategory, categories} = useSelector(state => state.categoryListAll)
    const {loading: loadingVendor, error: errorVendor, vendors} = useSelector(state => state.vendorListAll)
  
    const handleClose = () => {
        setName('')
        setCode('')
        setBrand('')
        setMainFabric('')
        setSubFabric1('')
        setSubFabric2('')
        setCategory('')
        setFitCategory('')
        setSleeveLength('')
        setgarmentLength('')
        setPantLength('')
        setHsp('')
        setPantInseam('')
        setShortDescription('')
        setLongDescription('')
        setVendor('')
        setWeight('')
        setCoo('')
        setStoryNumber('')
        setStorySortNumber('')
        setUswRegular('')
        setUswPlus('')
        setCawRegular('')
        setCawPlus('')
        setUsaRegular('')
        setUsaPlus('')
        setCaaRegular('')
        setCaaPlus('')
        setPriceNote('')
        setNewImage('')
        setCorporate(false)
        setNewSize([])
        setNewSeason([])
        setNewStory([])
        setNewColor([])
        dispatch({type: STYLE_EDIT_RESET})
        setShow(false)
    }

    useEffect(()=>{
        if(show){
            setName(style.name)
            setCode(style.code)
            setBrand(style.brand ? style.brand._id : '')
            setMainFabric(style.mainFabric ? style.mainFabric._id : '')
            setSubFabric1(style.subFabric1 ? style.subFabric1._id : '')
            setSubFabric2(style.subFabric2 ? style.subFabric2._id : '')
            setCategory(style.category ? style.category._id : '')
            setFitCategory(style.fitCategory ? style.fitCategory : '')
            setSleeveLength(style.sleeveLength ? style.sleeveLength : '')
            setgarmentLength(style.garmentLength ? style.garmentLength : '')
            setPantLength(style.pantLength ? style.pantLength : '')
            setHsp(style.hsp ? style.hsp : 0)
            setPantInseam(style.pantInseam ? style.pantInseam : 0)
            setShortDescription(style.shortDescription ? style.shortDescription : '')
            setLongDescription(style.longDescription ? style.longDescription : '')
            setVendor(style.vendor ? style.vendor._id : '')
            setWeight(style.weight ? style.weight : 0)
            setCoo(style.coo)
            setStoryNumber(style.storyNumber ? style.storyNumber : 0)
            setStorySortNumber(style.storySortNumber ? style.storySortNumber : 0)
            setUswRegular(style.uswRegular ? style.uswRegular : 0)
            setUswPlus(style.uswPlus ? style.uswPlus : 0)
            setCawRegular(style.cawRegular ? style.cawRegular : 0)
            setCawPlus(style.cawPlus ? style.cawPlus : 0)
            setUsaRegular(style.usaRegular ? style.usaRegular : 0)
            setUsaPlus(style.usaPlus ? style.usaPlus : 0)
            setCaaRegular(style.caaRegular ? style.caaRegular : 0)
            setCaaPlus(style.caaPlus ? style.caaPlus : 0)
            setPriceNote(style.priceNote ? style.priceNote : '')
            setNewImage('')
            setCorporate(style.corporate)
            setNewSize(style.sizes.length !== 0 ? [...style.sizes] : [])
            setNewSeason(style.seasons.length !== 0 ? [...style.seasons] : [])
            setNewStory(style.stories.length !== 0 ? [...style.stories] : [])
            setNewColor(style.colors.length !== 0 ? [...style.colors] : [])                      
            dispatch(listAllSeason()) 
            dispatch(listBrand())
            dispatch(listAllFabric())
            dispatch(listAllStory())
            dispatch(listAllColor())
            dispatch(listAllCategory())
            dispatch(listAllVendor())
        }
        if(success){
            setName('')
            setCode('')
            setBrand('')
            setMainFabric('')
            setSubFabric1('')
            setSubFabric2('')
            setCategory('')
            setFitCategory('')
            setSleeveLength('')
            setgarmentLength('')
            setPantLength('')
            setHsp('')
            setPantInseam('')
            setShortDescription('')
            setLongDescription('')
            setVendor('')
            setWeight('')
            setCoo('')
            setStoryNumber('')
            setStorySortNumber('')
            setUswRegular('')
            setUswPlus('')
            setCawRegular('')
            setCawPlus('')
            setUsaRegular('')
            setUsaPlus('')
            setCaaRegular('')
            setCaaPlus('')
            setPriceNote('')
            setNewImage('')
            setCorporate(false)
            setNewSize([])
            setNewSeason([])
            setNewStory([])
            setNewColor([])
            dispatch({type: STYLE_EDIT_RESET})
            setShow(false)
        }
    },[show, dispatch, success, style])


    const handleSizeCheck = (e) => {
        const exist = newSize.indexOf(e.target.value)
        if (exist === -1) {
            newSize.push(e.target.value)
        } else {
            newSize.splice(newSize.indexOf(e.target.value), 1)
        }
        setNewSize([...newSize])
    }

    const selectHandle = async (e, name) => {
        switch(name){
            case "color": 
                const colorSelected = newColor.map(c => c._id).indexOf(e.target.value)        
                if (colorSelected === -1) {
                    const co = await colors.find(c => c._id === e.target.value)
                    newColor.push(co)
                }
                setNewColor([...newColor])
                break;
            case "season": 
                const seasonSelected = newSeason.map(se => se._id).indexOf(e.target.value)        
                if (seasonSelected === -1) {
                    const sea = await seasons.find(s => s._id === e.target.value)
                    newSeason.push(sea)
                }
                setNewSeason([...newSeason])
                break;
            case "story": 
                const storySelected = newStory.map(st => st._id).indexOf(e.target.value)        
                if (storySelected === -1) {
                    const sto = await stories.find(s => s._id === e.target.value)
                    newStory.push(sto)
                }
                setNewStory([...newStory])
                break;
            default: return
        }
    }

    const removeHandle = async (id, name) => {
        switch(name){
            case "color": 
                const colorRemain = newColor.filter(c => c._id !== id)
                setNewColor([...colorRemain])
                break;
            case "season":
                const seasonRemain = newSeason.filter(se => se._id !== id)
                setNewSeason([...seasonRemain])
                break;
            case "story":
                const storyRemain = newStory.filter(st => st._id !== id)
                setNewStory([...storyRemain])
                break;
            default: return
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(name === '' || code === '' || brand === '' || mainFabric === ''){
            toast.error("Please complete required fileds.")
        } else {
            const data = new FormData()
            data.append('code', code)
            data.append('name', name)
            data.append('corporate', corporate)
            data.append('brand', brand)
            data.append('mainFabric', mainFabric)
            data.append('subFabric1', subFabric1)
            data.append('subFabric2', subFabric2)
            data.append('category', category)
            data.append('fitCategory', fitCategory)
            data.append('sleeveLength', sleeveLength)
            data.append('garmentLength', garmentLength)
            data.append('pantLength', pantLength)
            data.append('hsp', hsp)
            data.append('pantInseam', pantInseam)
            data.append('shortDescription', shortDescription)
            data.append('longDescription', longDescription)
            data.append('vendor', vendor)
            data.append('weight', weight)
            data.append('coo', coo)
            data.append('storyNumber', storyNumber)
            data.append('storySortNumber', storySortNumber)
            data.append('uswRegular', uswRegular)
            data.append('uswPlus', uswPlus)
            data.append('cawRegular', cawRegular)
            data.append('cawPlus', cawPlus)
            data.append('usaRegular', usaRegular)
            data.append('usaPlus', usaPlus)
            data.append('caaRegular', caaRegular)
            data.append('caaPlus', caaPlus)
            data.append('priceNote', priceNote)
            if(newImage) {
                data.append('files', newImage)  
            }  else {
                data.append('image', style.image)
            }
            if(newSize.length !== 0) {data.append('sizes', newSize)}  
            if(newSeason.length !== 0) {data.append('seasons', newSeason.map(se=>se._id))}  
            if(newStory.length !== 0) {data.append('stories', newStory.map(st=>st._id))}  
            if(newColor.length !== 0) {data.append('colors', newColor.map(co=>co._id))} 
            //console.log(data)
            dispatch(editStyle(style._id, data))
        }
    }
        


    return (
      <>
        <Button 
            variant="outline-dark" 
            onClick={handleShow} 
            style={{width: '150px'}} 
            className='mx-3 my-2'>
            <i className='bi bi-plus-square'></i>Edit
        </Button>
  
        <Modal fullscreen show={show} onHide={handleClose}>
            <Modal.Header closeButton className='d-flex align-content-start flex-wrap'>
                
                <div>
                    <Button variant="outline-success" className='mx-3' style={{width: '150px'}} onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
                <div>
                    <Button variant="outline-info" className='mx-3' style={{width: '150px'}} onClick={handleClose}>
                        Cancel
                    </Button>                    
                </div>
                <div style={{width: '150px'}} className='m-3'>
                    <h4 className='w-100 text-center'>Edit Style</h4>
                </div>
            </Modal.Header>

            <Modal.Body>

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                {(   
                    loadingEdit ||
                    loadingSeason || 
                    loadingBrand || 
                    loadingFabric || 
                    loadingStory || 
                    loadingColor || 
                    loadingCategory || 
                    loadingVendor) ? <Loader /> :
                
                    errorEdit ? <Alert variant='danger'>{errorEdit}</Alert> :
                    errorSeason ? <Alert variant='danger'>{errorSeason}</Alert> : 
                    errorBrand ? <Alert variant='danger'>{errorBrand}</Alert> : 
                    errorFabric ? <Alert variant='danger'>{errorFabric}</Alert> : 
                    errorStory ? <Alert variant='danger'>{errorStory}</Alert> : 
                    errorColor ? <Alert variant='danger'>{errorColor}</Alert> : 
                    errorCategory ? <Alert variant='danger'>{errorCategory}</Alert> : 
                    errorVendor ? <Alert variant='danger'>{errorVendor}</Alert> : 

                    <>
                        <Row>
                            <Col lg={4}>

                                <FloatingLabel label="Code">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="my-3"
                                        placeholder="Code" 
                                        name="code"
                                        disabled
                                        defaultValue={code}
                                        onChange={e=> setCode(e.target.value)}
                                    />
                                </FloatingLabel>

                                <Form.Group className="mb-3 border rounded py-3 px-3">
                                    <Form.Check
                                    name="corporate"
                                    checked={corporate}
                                    defaultValue={corporate}
                                    onChange={(e)=>setCorporate(!corporate)}
                                    label="Corporate Style"
                                    />
                                </Form.Group>

                                <FloatingLabel label="Name">
                                    <FormControl 
                                        type="text" 
                                        className="my-3"
                                        placeholder="Name" 
                                        name="name"
                                        defaultValue={name}
                                        onChange={e=> setName(e.target.value)}
                                    />
                                </FloatingLabel>

                                <FloatingLabel label="Short Instruction">
                                    <FormControl 
                                        as='textarea' 
                                        style={{ height: '100px' }}
                                        className="my-3"
                                        placeholder="Short Instruction" 
                                        name="shortDescription"
                                        defaultValue={shortDescription}
                                        onChange={e=> setShortDescription(e.target.value)}
                                        />
                                </FloatingLabel>

                                <FloatingLabel label="Long Instruction">
                                    <FormControl 
                                        as='textarea' 
                                        style={{ height: '200px' }}
                                        className="my-3"
                                        placeholder="Long Instruction" 
                                        name="longDescription"
                                        defaultValue={longDescription}
                                        onChange={e=> setLongDescription(e.target.value)}
                                        />
                                </FloatingLabel>   
                                
                                <FloatingLabel controlId="floatingSelect" label="Brand">
                                <Form.Select name="brand" aria-label="Select" onChange={e=> setBrand(e.target.value)} className='mb-3'>  
                                    <option>{style.brand ? style.brand.name : 'Select'}</option>                                      
                                    {brands.map((b, index)=> (                        
                                    <option 
                                        key={index}  
                                        value={b._id}                                      
                                        defaultValue={b._id}                            
                                        >{b.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Category">
                                <Form.Select name="category" aria-label="Select" onChange={e=> setCategory(e.target.value)} className='mb-3'> 
                                    <option>{style.category ? `${style.category.code} - ${style.category.name}` : 'Select'}</option>    
                                    {categories.map((cat, index)=> (                        
                                    <option 
                                        key={index}  
                                        value={cat._id}                                      
                                        defaultValue={cat._id}                            
                                        >{cat.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>
                                
                                <FloatingLabel controlId="floatingSelect" label="Vendor">
                                <Form.Select name="vendor" aria-label="Select" onChange={e=> setVendor(e.target.value)} className='mb-3'> 
                                    <option>{style.vendor ? style.vendor.name : 'Select'}</option>    
                                    {vendors.map((van, index)=> (                        
                                    <option 
                                        key={index}  
                                        value={van._id}                                      
                                        defaultValue={van._id}                            
                                        >{van.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Country of Origin">
                                <Form.Select name="coo" aria-label="Select" onChange={e=> setCoo(e.target.value)} className='mb-3'> 
                                    <option>{coo ? coo : 'Select'}</option>    
                                    {countryList.map((coun, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        defaultValue={coun}                            
                                        >{coun}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Main Fabric">
                                <Form.Select name="mainFabric" aria-label="Select" onChange={e=> setMainFabric(e.target.value)} className='mb-3'> 
                                    <option>{style.mainFabric ? `${style.mainFabric.code} - ${style.mainFabric.name}` : 'Select'}</option>    
                                    {fabrics.map((fab, index)=> (                        
                                    <option 
                                        key={index}
                                        value={fab._id}                                        
                                        defaultValue={fab._id}                            
                                        >{fab.code} - {fab.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Sub Fabric 1">
                                <Form.Select name="subFabric1" aria-label="Select" onChange={e=> setSubFabric1(e.target.value)} className='mb-3'> 
                                    <option>{style.subFabric1 ? `${style.subFabric1.code} - ${style.subFabric1.name}` : 'Select'}</option>    
                                    {fabrics.map((fab, index)=> (                        
                                    <option 
                                        key={index}   
                                        value={fab._id}                                     
                                        defaultValue={fab._id}                            
                                        >{fab.code} - {fab.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Sub Fabric 2">
                                <Form.Select name="subFabric2" aria-label="Select" onChange={e=> setSubFabric2(e.target.value)} className='mb-3'> 
                                    <option>{style.subFabric2 ? `${style.subFabric2.code} - ${style.subFabric2.name}` : 'Select'}</option>    
                                    {fabrics.map((fab, index)=> (                        
                                    <option 
                                        key={index} 
                                        value={fab._id}                                       
                                        defaultValue={fab._id}                            
                                        >{fab.code} - {fab.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>
                            </Col>

 {/* -------------------------------------------------------frist column end here -------------------------------------------------------------- */}
                            <Col lg={4} className='pt-3'>

                                <FloatingLabel controlId="floatingSelect" label="Fit Category">
                                <Form.Select name="fitCategory" aria-label="Select" onChange={e=> setFitCategory(e.target.value)} className='mb-3'> 
                                    <option>{style.fitCategory ? style.fitCategory : 'Select'}</option>    
                                    {fitCategoryList.map((fit, index)=> (                        
                                    <option 
                                        key={index}  
                                        value={fit}                                      
                                        defaultValue={fit}                            
                                        >{fit}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Sleeve Length">
                                <Form.Select name="sleeveLength" aria-label="Select" onChange={e=> setSleeveLength(e.target.value)} className='mb-3'> 
                                    <option>{style.sleeveLength ? style.sleeveLength : 'Select'}</option>    
                                    {sleeveLengthList.map((sl, index)=> (                        
                                    <option 
                                        key={index}    
                                        value={sl}                                    
                                        defaultValue={sl}                            
                                        >{sl}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Garment Length">
                                <Form.Select name="garmentLength" aria-label="Select" onChange={e=> setgarmentLength(e.target.value)} className='mb-3'> 
                                    <option>{style.garmentLength ? style.garmentLength : 'Select'}</option>    
                                    {garmentLengthList.map((gl, index)=> (                        
                                    <option 
                                        key={index} 
                                        value={gl}                                       
                                        defaultValue={gl}                            
                                        >{gl}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Pant Length">
                                <Form.Select name="pantLength" aria-label="Select" onChange={e=> setPantLength(e.target.value)} className='mb-3'> 
                                    <option>{style.pantLength ? style.pantLength : 'Select'}</option>    
                                    {pantLengthList.map((pl, index)=> (                        
                                    <option 
                                        key={index}   
                                        value={pl}                                     
                                        defaultValue={pl}                            
                                        >{pl}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <Row>
                                    <Col>
                                        <FloatingLabel label="HSP (Inch)">
                                        <FormControl 
                                            type="text" 
                                            onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                            className="mb-3"
                                            placeholder="HSP" 
                                            name="hsp"
                                            defaultValue={hsp}
                                            onChange={e=> setHsp(e.target.value)}
                                        />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel label="Pant Inseam">
                                        <FormControl 
                                            type="text" 
                                            onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                            className="mb-3"
                                            placeholder="Pant Inseam" 
                                            name="pantInseam"
                                            defaultValue={pantInseam}
                                            onChange={e=> setPantInseam(e.target.value)}
                                        />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                <FloatingLabel label="Weight (kg)">
                                <FormControl 
                                    type="text" 
                                    onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                    className="mb-3"
                                    placeholder="Weight (kg)" 
                                    name="weight"
                                    defaultValue={weight}
                                    onChange={e=> setWeight(e.target.value)}
                                />
                                </FloatingLabel>

                                    
                                <div className='border rounded p-2 mb-3'>
                                <p className='text-muted my-1 p-0'>Available Sizes</p>
                                <ButtonGroup role='group' aria-label="Size Checkboxes" className='d-flex justify-content-between py-1'>
                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('XS') !== -1 && true} className="btn-check" id="XS" value="XS" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="XS">XS</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('S') !== -1 && true} className="btn-check" id="S" value="S" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="S" >S</Form.Check.Label>
                                    
                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('M') !== -1 && true} className="btn-check" id="M" value="M" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="M">M</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('L') !== -1 && true} className="btn-check" id="L" value="L" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="L">L</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('XL') !== -1 && true} className="btn-check" id="XL" value="XL" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="XL">XL</Form.Check.Label>
                                </ButtonGroup>

                                <ButtonGroup role='group' aria-label="Size Checkboxes" className='d-flex justify-content-between py-1'>
                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('PXS') !== -1 && true} className="btn-check" id="PXS" value="PXS" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PXS">PXS</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('PS') !== -1 && true} className="btn-check" id="PS" value="PS" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PS" >PS</Form.Check.Label>
                                    
                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('PM') !== -1 && true} className="btn-check" id="PM" value="PM" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PM">PM</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('PL') !== -1 && true} className="btn-check" id="PL" value="PL" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PL">PL</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('PXL') !== -1 && true} className="btn-check" id="PXL" value="PXL" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PXL">PXL</Form.Check.Label>
                                </ButtonGroup>

                                <ButtonGroup role='group' aria-label="Size Checkboxes" className='d-flex justify-content-between py-1'>
                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('1X') !== -1 && true} className="btn-check" id="1X" value="1X" onChange={handleSizeCheck} />
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="1X">1X</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('2X') !== -1 && true} className="btn-check" id="2X" value="2X" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="2X" >2X</Form.Check.Label>
                                    
                                    <Form.Check.Input type='checkbox' defaultChecked={style.sizes.indexOf('3X') !== -1 && true} className="btn-check" id="3X" value="3X" onChange={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="3X">3X</Form.Check.Label>
                                </ButtonGroup>
                            </div>
                            
                            <Row>
                                <Col>
                                    <FloatingLabel label="Story Number">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="Story Number" 
                                        name="storyNumber"
                                        defaultValue={storyNumber}
                                        onChange={e=> setStoryNumber(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel label="Story Sort Number">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="Story Sort Number" 
                                        name="storySortNumber"
                                        defaultValue={storySortNumber}
                                        onChange={e=> setStorySortNumber(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FloatingLabel label="US WholeSale Regular">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="US WholeSale Regular" 
                                        name="uswRegular"
                                        defaultValue={uswRegular}
                                        onChange={e=> setUswRegular(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel label="US WholeSale Plus">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="US WholeSale Plus" 
                                        name="uswPlus"
                                        defaultValue={uswPlus}
                                        onChange={e=> setUswPlus(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FloatingLabel label="CA WholeSale Regular">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="CA WholeSale Regular" 
                                        name="cawRegular"
                                        defaultValue={cawRegular}
                                        onChange={e=> setCawRegular(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel label="CA WholeSale Plus">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="CA WholeSale Plus" 
                                        name="cawPlus"
                                        defaultValue={cawPlus}
                                        onChange={e=> setCawPlus(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FloatingLabel label="US Amazon Regular">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="US Amazon Regular" 
                                        name="usaRegular"
                                        defaultValue={usaRegular}
                                        onChange={e=> setUsaRegular(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel label="US Amazon Plus">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="US Amazon Plus" 
                                        name="usaPlus"
                                        defaultValue={usaPlus}
                                        onChange={e=> setUsaPlus(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FloatingLabel label="CA Amazon Regular">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="CA Amazon Regular" 
                                        name="caaRegular"
                                        defaultValue={caaRegular}
                                        onChange={e=> setCaaRegular(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel label="CA Amazon Plus">
                                    <FormControl 
                                        type="text" 
                                        onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault()}}} 
                                        className="mb-3"
                                        placeholder="CA Amazon Plus" 
                                        name="caaPlus"
                                        defaultValue={caaPlus}
                                        onChange={e=> setCaaPlus(e.target.value)}
                                    />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <FloatingLabel label="Price Note">
                                <FormControl 
                                    as='textarea' 
                                    style={{ height: '100px' }}
                                    className="mb-3"
                                    placeholder="Price Note" 
                                    name="priceNote"
                                    defaultValue={priceNote}
                                    onChange={e=> setPriceNote(e.target.value)}
                                    />
                            </FloatingLabel>


                            </Col>


{/* -------------------------------------------------------second column end here -------------------------------------------------------------- */}
                            <Col lg={4}>

                                <div className='border rounded p-2 my-3'>
                                    <p className='text-muted my-1 p-0'>Select Available Colors</p>                                        
                                        <FloatingLabel controlId="floatingSelect" label="Available Colors">
                                        <Form.Select aria-label="Select" onChange={(e)=>selectHandle(e, "color")} className='mb-3'> 
                                            <option>Select</option>    
                                            {colors.map((col, index)=> (                        
                                            <option 
                                                key={index}
                                                value={col._id}                                       
                                                defaultValue={col._id}                          
                                                >{col.code}-{col.name}
                                            </option>
                                            ))}
                                        </Form.Select>
                                        </FloatingLabel>
                                        <div>                                               
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                    <th className='mid'>Code</th>
                                                    <th className='mid'>Name</th>
                                                    <th className='mid'>Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {newColor.length !== 0 && newColor.map((c,index)=>(
                                                        <tr key={index}>
                                                            <td className='mid'>{c.code}</td>
                                                            <td className='mid'>{c.name}</td>
                                                            <td className='mid'>
                                                                <Button 
                                                                variant='outline-dark' 
                                                                className='m-0 p-0'
                                                                onClick={()=>removeHandle(c._id, "color")}
                                                                >
                                                                <i className='bi bi-trash m-0 py-0 px-2'></i>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>                                           
                                        </div>
                                </div>

                                <div className='border rounded p-2 my-3'>
                                    <p className='text-muted my-1 p-0'>Select Season</p>                                        
                                        <FloatingLabel controlId="floatingSelect" label="Available Seasons">
                                        <Form.Select aria-label="Select" onChange={(e)=>selectHandle(e, "season")} className='mb-3'> 
                                            <option>Select</option>    
                                            {seasons.map((sea, index)=> (                        
                                            <option 
                                                key={index}
                                                value={sea._id}                                        
                                                defaultValue={sea._id}                          
                                                >{sea.code}-{sea.name}
                                            </option>
                                            ))}
                                        </Form.Select>
                                        </FloatingLabel>
                                        <div>                                               
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                    <th className='mid'>Code</th>
                                                    <th className='mid'>Name</th>
                                                    <th className='mid'>Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {newSeason.length !== 0 && newSeason.map((ss,index)=>(
                                                        <tr key={index}>
                                                            <td className='mid'>{ss.code}</td>
                                                            <td className='mid'>{ss.name}</td>
                                                            <td className='mid'>
                                                                <Button 
                                                                variant='outline-dark' 
                                                                className='m-0 p-0'
                                                                onClick={()=>removeHandle(ss._id, "season")}
                                                                >
                                                                <i className='bi bi-trash m-0 py-0 px-2'></i>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>                                           
                                        </div>
                                </div>


                                <div className='border rounded p-2 my-3'>
                                    <p className='text-muted my-1 p-0'>Select Story</p>                                        
                                        <FloatingLabel controlId="floatingSelect" label="Available Stories">
                                        <Form.Select aria-label="Select" onChange={(e)=>selectHandle(e, "story")} className='mb-3'> 
                                            <option>Select</option>    
                                            {stories.map((sto, index)=> (                        
                                            <option 
                                                key={index} 
                                                value={sto._id}                                       
                                                defaultValue={sto._id}                          
                                                >{sto.code}-{sto.name}
                                            </option>
                                            ))}
                                        </Form.Select>
                                        </FloatingLabel>
                                        <div>                                               
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                    <th className='mid'>Code</th>
                                                    <th className='mid'>Name</th>
                                                    <th className='mid'>Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {newStory.length !== 0 && newStory.map((st,index)=>(
                                                        <tr key={index}>
                                                            <td className='mid'>{st.code}</td>
                                                            <td className='mid'>{st.name}</td>
                                                            <td className='mid'>
                                                                <Button 
                                                                variant='outline-dark' 
                                                                className='m-0 p-0'
                                                                onClick={()=>removeHandle(st._id, "story")}
                                                                >
                                                                <i className='bi bi-trash m-0 py-0 px-2'></i>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>                                           
                                        </div>
                                </div>

                                <Form.Group controlId="formFileLg" className="mb-3 border rounded p-2">
                                    <div className='d-flex justify-content-between mb-2'>
                                        <Form.Label className='text-muted'>Choose Image - JPEG, JPG, PNG, GIF</Form.Label>
                                        {newImage && 
                                            <Button 
                                            variant='outline-danger' 
                                            size='sm' 
                                            className='m-0 px-2'
                                            onClick={()=>setNewImage('')}
                                            >
                                            Remove
                                        </Button>
                                        }                                        
                                    </div>
                                    <FormControl 
                                        type='file'
                                        size='lg'
                                        className="mb-1"
                                        name="image"
                                        accept='.jpg,.jpeg,.png,.gif'
                                        onChange={e => setNewImage(e.target.files[0])}
                                        />
                                    <div className=''>
                                        {newImage ? <Image src={URL.createObjectURL(newImage)} className='shadow d-block mx-auto' style={{width: '200px'}} />
                                            : <Image src={style && style.image} className='shadow d-block mx-auto' style={{width: '200px'}} />
                                        }
                                    </div>
                                </Form.Group>
                                
                            </Col>
{/* -------------------------------------------------------third column end here -------------------------------------------------------------- */}                          
                        </Row>

                    </>

                
                }




            </Modal.Body>
        </Modal>
      </>
    );
}

export default StyleEditModal
