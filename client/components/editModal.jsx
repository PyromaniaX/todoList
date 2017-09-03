import ReactDOM from "react-dom"

import {Modal,FormGroup,ControlLabel,FormControl,ToggleButtonGroup,ToggleButton,Button} from 'react-bootstrap'

var log = console.log.bind(this)

const GLOBAL_CONST = {
  PRIORITY_TEXT_MAPPING:[//[bsStyle,text]
                          ["success","Success"],
                          ["info"   ,"Normal "],
                          ["warning","Warning"],
                          ["danger" ,"Danger "]
                        ]
}

export default class EditModal extends React.Component{
  handleUpdateModal(e,field){
    let item = this.props.item||{}
    switch(field){
      case "priority":
        this.priority = e
        item[field] = e
      break
      default:
        item[field] = e.target.value
    }
    this.props.handleUpdateModal(item)
  }

  render() {
    let item = this.props.item,
        title = item.id?"Edit...":"Adding...",
        toggleButtons =  GLOBAL_CONST.PRIORITY_TEXT_MAPPING.map(function(map,i){
          let opts = {}
          if(i === item.priority){
            opts["bsStyle"] = map[0]
          }
          return <ToggleButton value={i} {...opts}>{map[1]}</ToggleButton>
        })
    return (
            <Modal show={this.props.showModal} onHide={this.props.handleHideModal}>
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl type = "text"
                              value = {item.title}
                           inputRef = {ref => this.titleRef = ref}
                           onChange = {e => this.handleUpdateModal(e,"title")}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Detail</ControlLabel>
                  <FormControl style = {{minHeight: '200px'}}
                      componentClass = "textarea" 
                               value = {item.detail}
                            inputRef = {ref => this.detailRef = ref}
                            onChange = {e => this.handleUpdateModal(e,"detail")}
                  />
                </FormGroup>
                <label className="control-label" style={{display:"block"}}>Priority</label>
                <ToggleButtonGroup type = "radio"
                                   name = "priority"
                           value = {item.priority}
                               onChange = {e => this.handleUpdateModal(e,"priority")}
                                   >
                  {toggleButtons}
                </ToggleButtonGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.handleHideModal}>Close</Button>
                <Button bsStyle="success" onClick={this.props.handleSaveModal}>Save</Button>
              </Modal.Footer>
          </Modal>
    );
  }
};
