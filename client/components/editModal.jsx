import ReactDOM from "react-dom"

import {Modal,FormGroup,ControlLabel,FormControl,Button} from 'react-bootstrap'

var log = console.log.bind(this)


export default class EditModal extends React.Component{
  handleUpdateModal(e,field){
    let item = this.props.item||{}
    item[field] = e.target.value
    this.props.handleUpdateModal(item)
  }

  handleSaveModal(){
    let item = this.props.item||{}
    Object.assign(item,{title:this.titleRef.value,
                       detail:this.detailRef.value
                      })
    this.props.handleSaveModal(item)
  }

  render() {
    return (
            <Modal show={this.props.showModal} onHide={this.props.handleHideModal}>
              <Modal.Header closeButton>
                <Modal.Title>{this.props.item.id?"Edit...":"Adding..."}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl type = "text"
                              value = {this.props.item.title}
                           inputRef = {ref => this.titleRef = ref}
                           onChange = {e => this.handleUpdateModal(e,"title")}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Detail</ControlLabel>
                  <FormControl style = {{minHeight: '200px'}}
                      componentClass = "textarea" 
                               value = {this.props.item.detail}
                            inputRef = {ref => this.detailRef = ref}
                            onChange = {e => this.handleUpdateModal(e,"detail")}
                  />
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.handleHideModal}>Close</Button>
                <Button bsStyle="success" onClick={e => this.handleSaveModal(e)}>Save</Button>
              </Modal.Footer>
          </Modal>
    );
  }
};
