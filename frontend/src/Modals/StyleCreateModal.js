import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Row, Col, FormControl, Alert, Image, FloatingLabel, Form, ButtonGroup, Table, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createStyle, getCode } from '../Actions/styleActions';
import Loader from '../Components/Loader';
import {STYLE_CREATE_RESET, STYLE_CODE_RESET} from '../Constants/styleConstants'
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


const StyleCreateModal = () => {
    const dispatch = useDispatch()
    const [warning, setWarning] = useState(false)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [code, setCode] = useState('')
    const [values, setValues] = useState({
        name: '',
        brand: '',
        mainFabric: '',
        subFabric1: '',
        subFabric2: '',
        category: '',
        fitCategory: '',
        sleeveLength: '',
        garmentLength: '',
        pantLength: '',
        hsp: '',
        pantInseam: '',
        shortDescription: '',
        longDescription: '',
        vendor: '',
        weight: '',
        coo: '',  
        storyNumber: '',
        storySortNumber: '',
        uswRegular: '',
        uswPlus: '',
        cawRegular: '',
        cawPlus: '',
        usaRegular: '',
        usaPlus: '',
        caaRegular: '',
        caaPlus: '',
        priceNote: '',
    })
    const [image, setImage] = useState('')
    const [corporate, setCorporate] = useState(false)
    const [newSize, setNewSize] = useState([])
    const [newSeason, setNewSeason] = useState([])
    const [newStory, setNewStory] = useState([])
    const [newColor, setNewColor] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
      }


    const {loading, error, success} = useSelector(state=>state.styleCreate)
    const {loading: loadingCode, error: errorCode, codeFromServer} = useSelector(state=>state.styleCode)
    
    // --------------loading and error for list all datas-----------------//
    const {loading: loadingSeason, error: errorSeason, seasons} = useSelector(state => state.seasonListAll)
    const {loading: loadingBrand, error: errorBrand, brands} = useSelector(state => state.brandList)
    const {loading: loadingFabric, error: errorFabric, fabrics} = useSelector(state => state.fabricListAll)
    const {loading: loadingStory, error: errorStory, stories} = useSelector(state => state.storyListAll)
    const {loading: loadingColor, error: errorColor, colors} = useSelector(state => state.colorListAll)
    const {loading: loadingCategory, error: errorCategory, categories} = useSelector(state => state.categoryListAll)
    const {loading: loadingVendor, error: errorVendor, vendors} = useSelector(state => state.vendorListAll)
  
    const handleClose = () => {
        setValues({
            name: '',
            brand: '',
            mainFabric: '',
            subFabric1: '',
            subFabric2: '',
            category: '',
            fitCategory: '',
            sleeveLength: '',
            garmentLength: '',
            pantLength: '',
            hsp: '',
            pantInseam: '',
            shortDescription: '',
            longDescription: '',
            vendor: '',
            weight: '',
            coo: '',  
            storyNumber: '',
            storySortNumber: '',
            uswRegular: '',
            uswPlus: '',
            cawRegular: '',
            cawPlus: '',
            usaRegular: '',
            usaPlus: '',
            caaRegular: '',
            caaPlus: '',
            priceNote: '',
        })
        setCode('')
        setImage('')
        setCorporate(false)
        setNewSize([])
        setNewSeason([])
        setNewStory([])
        setNewColor([])
        dispatch({type: STYLE_CREATE_RESET})
        dispatch({type: STYLE_CODE_RESET})
        setShow(false)
    }

    useEffect(()=>{
        if(codeFromServer){
            setCode(codeFromServer)
        }
    },[codeFromServer])

    useEffect(()=>{
        setWarning(false)        
        if(show){
            dispatch(listAllSeason()) 
            dispatch(listBrand())
            dispatch(listAllFabric())
            dispatch(listAllStory())
            dispatch(listAllColor())
            dispatch(listAllCategory())
            dispatch(listAllVendor())
        }
        if(success){
            setValues({
                name: '',
                brand: '',
                mainFabric: '',
                subFabric1: '',
                subFabric2: '',
                category: '',
                fitCategory: '',
                sleeveLength: '',
                garmentLength: '',
                pantLength: '',
                hsp: '',
                pantInseam: '',
                shortDescription: '',
                longDescription: '',
                vendor: '',
                weight: '',
                coo: '',  
                storyNumber: '',
                storySortNumber: '',
                uswRegular: '',
                uswPlus: '',
                cawRegular: '',
                cawPlus: '',
                usaRegular: '',
                usaPlus: '',
                caaRegular: '',
                caaPlus: '',
                priceNote: '',
            })
            setCode('')
            setImage('')
            setCorporate(false)
            setNewSize([])
            setNewSeason([])
            setNewStory([])
            setNewColor([])
            dispatch({type: STYLE_CREATE_RESET})
            dispatch({type: STYLE_CODE_RESET})
            setWarning(false)
            setShow(false)
        }
    },[show, dispatch, success])


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
        if(code === '' || values.name === '' || values.brand === '' || values.mainFabric === ''){
            setWarning(true)
            toast.error("Please complete required fileds.")
        } else {
            const data = new FormData()
            Object.keys(values).forEach(key=> data.append(key, values[key]))
            data.append('code', code)
            data.append('corporate', corporate)
            data.append('files', image)    
            if(newSize.length !== 0) {data.append('sizes', newSize)}  
            if(newSeason.length !== 0) {data.append('seasons', newSeason.map(se=>se._id))}  
            if(newStory.length !== 0) {data.append('stories', newStory.map(st=>st._id))}  
            if(newColor.length !== 0) {data.append('colors', newColor.map(co=>co._id))} 
            setWarning(false)
            dispatch(createStyle(data))
        }
    }
        


    return (
      <>
        <Button 
            variant="outline-dark" 
            onClick={handleShow} 
            style={{width: '150px'}} 
            className='mx-2'>
            <i className='bi bi-plus-square'></i>New
        </Button>
  
        <Modal fullscreen show={show} onHide={handleClose}>
            <Modal.Header closeButton className='d-flex'>
                <div className='ml-auto d-flex'>
                    <Button variant="outline-success" className='mx-3' style={{width: '150px'}} onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button variant="outline-info" className='mx-3' style={{width: '150px'}} onClick={handleClose}>
                        Cancel
                    </Button>                    
                </div>
                <div className='ms-auto'>
                    <h4 className='w-100 m-auto'>Create New Style</h4>
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

                {(  loading || 
                    loadingSeason || 
                    loadingBrand || 
                    loadingFabric || 
                    loadingStory || 
                    loadingColor || 
                    loadingCategory || 
                    loadingVendor) ? <Loader /> :
                
                    error ? <Alert variant='danger'>{error}</Alert> : 
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
                                        className={`mb-1 mt-3 ${warning && `border-danger`}`}
                                        placeholder="Code" 
                                        name="code"
                                        disabled={codeFromServer}
                                        defaultValue={code}
                                        onChange={(e)=>setCode(e.target.value)}
                                    />
                                </FloatingLabel>
                                {loadingCode && <Spinner animation="border" />}
                                {errorCode && <Alert variant='danger'>{errorCode}</Alert>}
                                <Button variant='success' size='sm' className='mb-3' 
                                    onClick={()=> {
                                        dispatch(getCode())
                                    }}>
                                    Get code from server
                                </Button>

                                <Form.Group className="mb-3 border rounded py-3 px-3">
                                    <Form.Check
                                    name="corporate"
                                    value={corporate}
                                    onChange={(e)=>setCorporate(!corporate)}
                                    label="Corporate Style"
                                    />
                                </Form.Group>

                                <FloatingLabel label="Name">
                                    <FormControl 
                                        type="text" 
                                        className={`my-3 ${warning && `border-danger`}`}
                                        placeholder="Name" 
                                        name="name"
                                        value={values.name}
                                        onChange={handleInputChange}
                                    />
                                </FloatingLabel>

                                <FloatingLabel label="Short Instruction">
                                    <FormControl 
                                        as='textarea' 
                                        style={{ height: '100px' }}
                                        className="my-3"
                                        placeholder="Short Instruction" 
                                        name="shortDescription"
                                        value={values.shortDescription}
                                        onChange={handleInputChange}
                                        />
                                </FloatingLabel>

                                <FloatingLabel label="Long Instruction">
                                    <FormControl 
                                        as='textarea' 
                                        style={{ height: '200px' }}
                                        className="my-3"
                                        placeholder="Long Instruction" 
                                        name="longDescription"
                                        value={values.longDescription}
                                        onChange={handleInputChange}
                                        />
                                </FloatingLabel>   
                                
                                <FloatingLabel controlId="floatingSelect" label="Brand">
                                <Form.Select name="brand" aria-label="Select" onChange={handleInputChange} className={`mb-3 ${warning && `border border-danger`}`}>  
                                    <option>Select</option>                                      
                                    {brands.map((b, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={b._id}                            
                                        >{b.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Category">
                                <Form.Select name="category" aria-label="Select" onChange={handleInputChange} className='mb-3'> 
                                    <option>Select</option>    
                                    {categories.map((cat, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={cat._id}                            
                                        >{cat.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>
                                
                                <FloatingLabel controlId="floatingSelect" label="Vendor">
                                <Form.Select name="vendor" aria-label="Select" onChange={handleInputChange} className='mb-3'> 
                                    <option>Select</option>    
                                    {vendors.map((van, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={van._id}                            
                                        >{van.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Country of Origin">
                                <Form.Select name="coo" aria-label="Select" onChange={handleInputChange} className='mb-3'> 
                                    <option>Select</option>    
                                    {countryList.map((coun, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={coun}                            
                                        >{coun}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Main Fabric">
                                <Form.Select name="mainFabric" aria-label="Select" onChange={handleInputChange} className={`mb-3 ${warning && `border border-danger`}`}> 
                                    <option>Select</option>    
                                    {fabrics.map((fab, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={fab._id}                            
                                        >{fab.code} - {fab.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Sub Fabric 1">
                                <Form.Select name="subFabric1" aria-label="Select" onChange={handleInputChange} className='mb-3'> 
                                    <option>Select</option>    
                                    {fabrics.map((fab, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={fab._id}                            
                                        >{fab.code} - {fab.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Sub Fabric 2">
                                <Form.Select name="subFabric2" aria-label="Select" onChange={handleInputChange} className='mb-3'> 
                                    <option>Select</option>    
                                    {fabrics.map((fab, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={fab._id}                            
                                        >{fab.code} - {fab.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>
                            </Col>

 {/* -------------------------------------------------------frist column end here -------------------------------------------------------------- */}
                            <Col lg={4} className='pt-3'>

                                <FloatingLabel controlId="floatingSelect" label="Fit Category">
                                <Form.Select name="fitCategory" aria-label="Select" onChange={handleInputChange} className='mb-3'> 
                                    <option>Select</option>    
                                    {fitCategoryList.map((fit, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={fit}                            
                                        >{fit}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Sleeve Length">
                                <Form.Select name="sleeveLength" aria-label="Select" onChange={handleInputChange} className='mb-3'> 
                                    <option>Select</option>    
                                    {sleeveLengthList.map((sl, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={sl}                            
                                        >{sl}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Garment Length">
                                <Form.Select name="garmentLength" aria-label="Select" onChange={handleInputChange} className='mb-3'> 
                                    <option>Select</option>    
                                    {garmentLengthList.map((gl, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={gl}                            
                                        >{gl}
                                    </option>
                                    ))}
                                </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingSelect" label="Pant Length">
                                <Form.Select name="pantLength" aria-label="Select" onChange={handleInputChange} className='mb-3'> 
                                    <option>Select</option>    
                                    {pantLengthList.map((pl, index)=> (                        
                                    <option 
                                        key={index}                                        
                                        value={pl}                            
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
                                            value={values.hsp}
                                            onChange={handleInputChange}
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
                                            value={values.pantInseam}
                                            onChange={handleInputChange}
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
                                    value={values.weight}
                                    onChange={handleInputChange}
                                />
                                </FloatingLabel>

                                    
                                <div className='border rounded p-2 mb-3'>
                                <p className='text-muted my-1 p-0'>Select Available Sizes</p>
                                <ButtonGroup role='group' aria-label="Size Checkboxes" className='d-flex justify-content-between py-1'>
                                    <Form.Check.Input type='checkbox' className="btn-check" id="XS" value="XS" onClick={handleSizeCheck}  
                                        />
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="XS">XS</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' className="btn-check" id="S" value="S" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="S" >S</Form.Check.Label>
                                    
                                    <Form.Check.Input type='checkbox' className="btn-check" id="M" value="M" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="M">M</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' className="btn-check" id="L" value="L" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="L">L</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' className="btn-check" id="XL" value="XL" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark missy" htmlFor="XL">XL</Form.Check.Label>
                                </ButtonGroup>

                                <ButtonGroup role='group' aria-label="Size Checkboxes" className='d-flex justify-content-between py-1'>
                                    <Form.Check.Input type='checkbox' className="btn-check" id="PXS" value="PXS" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PXS">PXS</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' className="btn-check" id="PS" value="PS" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PS" >PS</Form.Check.Label>
                                    
                                    <Form.Check.Input type='checkbox' className="btn-check" id="PM" value="PM" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PM">PM</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' className="btn-check" id="PL" value="PL" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PL">PL</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' className="btn-check" id="PXL" value="PXL" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="PXL">PXL</Form.Check.Label>
                                </ButtonGroup>

                                <ButtonGroup role='group' aria-label="Size Checkboxes" className='d-flex justify-content-between py-1'>
                                    <Form.Check.Input type='checkbox' className="btn-check" id="1X" value="1X" onClick={handleSizeCheck} />
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="1X">1X</Form.Check.Label>

                                    <Form.Check.Input type='checkbox' className="btn-check" id="2X" value="2X" onClick={handleSizeCheck}/>
                                    <Form.Check.Label className="btn btn-outline-dark" htmlFor="2X" >2X</Form.Check.Label>
                                    
                                    <Form.Check.Input type='checkbox' className="btn-check" id="3X" value="3X" onClick={handleSizeCheck}/>
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
                                        value={values.storyNumber}
                                        onChange={handleInputChange}
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
                                        value={values.storySortNumber}
                                        onChange={handleInputChange}
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
                                        value={values.uswRegular}
                                        onChange={handleInputChange}
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
                                        value={values.uswPlus}
                                        onChange={handleInputChange}
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
                                        value={values.cawRegular}
                                        onChange={handleInputChange}
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
                                        value={values.cawPlus}
                                        onChange={handleInputChange}
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
                                        value={values.usaRegular}
                                        onChange={handleInputChange}
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
                                        value={values.usaPlus}
                                        onChange={handleInputChange}
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
                                        value={values.caaRegular}
                                        onChange={handleInputChange}
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
                                        value={values.caaPlus}
                                        onChange={handleInputChange}
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
                                    value={values.priceNote}
                                    onChange={handleInputChange}
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
                                                    {newColor.map((c,index)=>(
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
                                                    {newSeason.map((ss,index)=>(
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
                                                    {newStory.map((st,index)=>(
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
                                    <Form.Label>Choose Image</Form.Label>
                                    <FormControl 
                                        type='file'
                                        size='lg'
                                        className="mb-3"
                                        name="image"
                                        accept='.jpg,.jpeg,.png,.gif'
                                        onChange={e => setImage(e.target.files[0])}
                                        />
                                    {image && <Image src={URL.createObjectURL(image)} className='shadow' style={{width: '200px'}} />}
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

export default StyleCreateModal
