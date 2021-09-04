import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Button, Modal, Row, Col, ButtonGroup, Table, Alert} from 'react-bootstrap';
import { deleteStyle } from '../Actions/styleActions';
import DeleteConfirmModalButton from './DeleteConfirmModalButton';
import StyleEditModal from './StyleEditModal';
import Loader from '../Components/Loader';

const StyleViewModal = ({style}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
      setShow(false)
    }

    const {loading, error, success} = useSelector(state => state.styleDelete)

    useEffect(()=>{
      if(success){
        setShow(false)
      }
    },[success])
    
    return (
      <>
        <Button 
            variant="outline-dark" 
            onClick={handleShow}  
            className='m-0 p-0'>
            <i className='bi bi-arrows-fullscreen m-0 px-4' style={{fontSize: '1rem'}}></i>
        </Button>        
  
        <Modal fullscreen show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <div className='d-flex align-content-start flex-wrap'>
                    <div>
                      <Button variant="outline-info" className='mx-3 my-2' style={{width: '150px'}} onClick={handleClose}>
                          Close
                      </Button>   
                    </div>                     
                    <div>
                      <StyleEditModal style={style} />  
                    </div>   
                    <div>
                      <DeleteConfirmModalButton deleteFunction={deleteStyle} id={style._id} width={'150px'} variant='danger' />  
                    </div>    
                    <div className='py-2 px-3'>
                      <h4>Style Detail</h4>
                    </div>     
                </div>
                
            </Modal.Header>

            <Modal.Body>
                    <>
                      {loading ? <Loader /> :
                      error ? <Alert varinat='danger'>{error}</Alert> :
                      
                        <Row>
                            <Col lg={4}>
                                <div className='bg-light shadow border-rounded mb-3'>
                                  <p className='mb-0 px-2 reportItem'>CODE</p>
                                  <h5 className='p-2'>{style.code}</h5>
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <p className='mb-0 px-2 reportItem'>NAME</p>
                                  <h5 className='p-2'>{style.name}</h5>
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <p className='mb-0 px-2 reportItem'>CORPORATE</p>
                                  <h5 className='p-2'>{style.corporate ? "Yes" : "No"}</h5>
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <p className='mb-0 px-2 reportItem'>SHORT DESCRIPTION</p>
                                  <h5 className='p-2 text-justify'>{style.shortDescription ? style.shortDescription : 
                                  <small className='text-muted'>No description to show</small>
                                  }</h5>
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <p className='mb-0 px-2 reportItem'>LONG DESCRIPTION</p>
                                  <h5 className='p-2 text-justify'>{style.longDescription ? style.longDescription : 
                                  <small className='text-muted'>No description to show</small>
                                  }</h5>
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <p className='mb-0 px-2 reportItem'>BRAND</p>
                                  <h5 className='p-2'>{style.brand && style.brand.name}</h5>
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <Row>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>CATEGORY</p>
                                      <h5 className='p-2 mb-0'>{style.category && style.category.name}</h5>
                                    </Col>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>MAIN CATEGORY</p>
                                      <h5 className='p-2 mb-0'>{style.category && style.category.mainCategory}</h5>
                                    </Col>
                                  </Row>                                  
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <p className='mb-0 px-2 reportItem'>VENDOR</p>
                                  <h5 className='p-2'>{style.vendor && style.vendor.name}</h5>
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <p className='mb-0 px-2 reportItem'>COO</p>
                                  <h5 className='p-2'>{style.coo && style.coo}</h5>
                                </div>

                                <div className='bg-light shadow mb-3 pb-2'>
                                  <p className='mb-0 px-2 reportItem'>MAIN FABRIC</p>
                                  <h5 className='px-2 pb-0 pt-2'>{style.mainFabric && style.mainFabric.code} - {style.mainFabric &&  style.mainFabric.name}</h5>
                                  <p className='m-0 px-2 py-0 text-muted'><small>{style.mainFabric && style.mainFabric.content}</small></p>
                                </div>

                                <div className='bg-light shadow mb-3 pb-2'>
                                  <p className='mb-0 px-2 reportItem'>SUB FABRIC 1</p>
                                  <h5 className='px-2 pb-0 pt-2'>{style.subFabric1 && style.subFabric1.code} - {style.subFabric1 &&  style.subFabric1.name}</h5>
                                  <p className='m-0 px-2 py-0 text-muted'><small>{style.subFabric1 && style.subFabric1.content}</small></p>
                                </div>

                                <div className='bg-light shadow mb-3 pb-2'>
                                  <p className='mb-0 px-2 reportItem'>SUB FABRIC 2</p>
                                  <h5 className='px-2 pb-0 pt-2'>{style.subFabric2 && style.subFabric2.code} - {style.subFabric2 &&  style.subFabric2.name}</h5>
                                  <p className='m-0 px-2 py-0 text-muted'><small>{style.subFabric2 && style.subFabric2.content}</small></p>
                                </div>
                                
                            </Col>

 {/* -------------------------------------------------------frist column end here -------------------------------------------------------------- */}
                            <Col lg={4}>
                              <div className='bg-light shadow mb-3'>
                                <p className='mb-0 px-2 reportItem'>FIT CATEGORY</p>
                                <h5 className='p-2'>{style.fitCategory && style.fitCategory}</h5>
                              </div>

                              <div className='bg-light shadow mb-3'>
                                <p className='mb-0 px-2 reportItem'>SLEEVE LENGTH</p>
                                <h5 className='p-2'>{style.sleeveLength && style.sleeveLength}</h5>
                              </div>

                              <div className='bg-light shadow mb-3'>
                                <p className='mb-0 px-2 reportItem'>GARMENT LENGTH</p>
                                <h5 className='p-2'>{style.garmentLength && style.garmentLength}</h5>
                              </div>

                              <div className='bg-light shadow mb-3'>
                                <p className='mb-0 px-2 reportItem'>PANT LENGTH</p>
                                <h5 className='p-2'>{style.pantLength && style.pantLength}</h5>
                              </div>

                              <div className='bg-light shadow mb-3'>
                                  <Row>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>HSP</p>
                                      <h5 className='p-2 mb-0'>{style.hsp && style.hsp}</h5>
                                    </Col>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>PANT INSEAM</p>
                                      <h5 className='p-2 mb-0'>{style.pantInseam && style.pantInseam}</h5>
                                    </Col>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>WEIGHT</p>
                                      <h5 className='p-2 mb-0'>{style.weight && style.weight}</h5>
                                    </Col>
                                  </Row>                                  
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <p className='mb-0 px-2 reportItem'>AVAILABLE SIZES</p>
                                  <div className='overflow-auto'>
                                  <ButtonGroup aria-label="AVAILABLE SIZES" className='py-2'>
                                  {style.sizes.length === 13 ? <h5 className='p-2 mb-0'>Full Size</h5> : style.sizes.map((size, index)=>(
                                    <Button variant="outline-dark" key={index}>{size}</Button>
                                  ))}                                  
                                </ButtonGroup>
                                </div>
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <Row>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>STORY NUMBER</p>
                                      <h5 className='p-2 mb-0'>{style.storyNumber && style.storyNumber}</h5>
                                    </Col>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>STORY SORT NUMBER</p>
                                      <h5 className='p-2 mb-0'>{style.storySortNumber && style.storySortNumber}</h5>
                                    </Col>
                                  </Row>                                  
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <Row>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>US WHOLESALE REGULAR</p>
                                      <h5 className='p-2 mb-0'>{style.uswRegular && style.uswRegular}</h5>
                                    </Col>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>US WHOLESALE PLUS</p>
                                      <h5 className='p-2 mb-0'>{style.uswPlus && style.uswPlus}</h5>
                                    </Col>
                                  </Row>                                  
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <Row>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>CA WHOLESALE REGULAR</p>
                                      <h5 className='p-2 mb-0'>{style.cawRegular && style.cawRegular}</h5>
                                    </Col>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>CA WHOLESALE PLUS</p>
                                      <h5 className='p-2 mb-0'>{style.cawPlus && style.cawPlus}</h5>
                                    </Col>
                                  </Row>                                  
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <Row>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>US AMAZON REGULAR</p>
                                      <h5 className='p-2 mb-0'>{style.cawRegular && style.cawRegular}</h5>
                                    </Col>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>US AMAZON PLUS</p>
                                      <h5 className='p-2 mb-0'>{style.cawPlus && style.cawPlus}</h5>
                                    </Col>
                                  </Row>                                  
                                </div>

                                <div className='bg-light shadow mb-3'>
                                  <Row>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>CA AMAZON REGULAR</p>
                                      <h5 className='p-2 mb-0'>{style.caaRegular && style.caaRegular}</h5>
                                    </Col>
                                    <Col>
                                      <p className='mb-0 px-2 reportItem'>CA AMAZON PLUS</p>
                                      <h5 className='p-2 mb-0'>{style.caaPlus && style.caaPlus}</h5>
                                    </Col>
                                  </Row>                                  
                                </div>

                            </Col>


{/* -------------------------------------------------------second column end here -------------------------------------------------------------- */}
                            <Col lg={4}>
                              <div className='bg-light shadow mb-3'>
                              <p className='mb-0 px-2 reportItem'>IMAGE</p>
                                <div style={{height: '400px'}}>
                                  {style.image ? 
                                    <img src={style.image}
                                    alt={style.name}
                                    className='mx-auto d-block'
                                    style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}}
                                   /> :
                                   <Alert variant='info'>No image to show.</Alert>
                                  }                                  
                                </div>
                              </div>
                              
                              <div className='bg-light shadow mb-3'>
                              <p className='mb-0 px-2 reportItem'>AVAILABLE COLOR LIST</p>
                                <Table striped bordered hover size="sm">
                                  <thead>
                                      <tr>
                                      <th className='mid'>Code</th>
                                      <th className='mid'>Name</th>
                                      <th className='mid'>Map</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {style.colors.map((c,index)=>(
                                          <tr key={index}>
                                              <td className='mid'>{c.code}</td>
                                              <td className='mid'>{c.name}</td>
                                              <td className='mid'>{c.map}</td>
                                          </tr>
                                      ))}
                                  </tbody>
                                </Table>                                           
                              </div>

                              <div className='bg-light shadow mb-3'>
                              <p className='mb-0 px-2 reportItem'>AVAILABLE SEASON LIST</p>
                                <Table striped bordered hover size="sm">
                                  <thead>
                                      <tr>
                                      <th className='mid'>Code</th>
                                      <th className='mid'>Name</th>
                                      <th className='mid'>Start</th>
                                      <th className='mid'>End</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {style.seasons.map((se,index)=>(
                                          <tr key={index}>
                                              <td className='mid'>{se.code}</td>
                                              <td className='mid'>{se.name}</td>
                                              <td className='mid'><Moment parse="YYYY-MM-DD" format="DD MMM YYYY">{se.start}</Moment></td>
                                              <td className='mid'><Moment parse="YYYY-MM-DD" format="DD MMM YYYY">{se.end}</Moment></td>
                                          </tr>
                                      ))}
                                  </tbody>
                                </Table>                                           
                              </div>

                              <div className='bg-light shadow mb-3'>
                              <p className='mb-0 px-2 reportItem'>AVAILABLE STORY LIST</p>
                                <Table striped bordered hover size="sm">
                                  <thead>
                                      <tr>
                                      <th className='mid'>Code</th>
                                      <th className='mid'>Name</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {style.stories.map((st,index)=>(
                                          <tr key={index}>
                                              <td className='mid'>{st.code}</td>
                                              <td className='mid'>{st.name}</td>
                                          </tr>
                                      ))}
                                  </tbody>
                                </Table>                                           
                              </div>
                            </Col>
{/* -------------------------------------------------------third column end here -------------------------------------------------------------- */}                          
                        </Row>
                      }
                    </>
            </Modal.Body>

            <Modal.Footer className='m-0 p-0'>
              <div className='d-flex justify-content-evenly fs-6 w-100'>
                {/* <p className='p-2 text-uppercase'>Created By: {style.user && style.user.name}</p> */}
                <p className='p-2 text-uppercase'>Created: <Moment format="DD MMM YYYY, h:mm a">{style.createdAt}</Moment></p>
                <p className='p-2 text-uppercase'>Modified: <Moment format="DD MMM YYYY, h:mm a">{style.updatedAt}</Moment></p>
              </div>
            </Modal.Footer>

        </Modal>
      </>
    );
}

export default StyleViewModal
