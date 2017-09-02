import React from "react"
import ReactDOM from "react-dom"
import {Grid,Row,Col,ListGroup,Checkbox,ListGroupItem,ButtonGroup,Button} from 'react-bootstrap';
import OperateTools from "./components/operateTools.jsx"
import EditModal from "./components/editModal.jsx"

var log = console.log.bind(this)

const GLOBAL_CONST = {
  PRIORITY_STYLE_MAPPING:["danger","warning","info","success"]
}

export default class App extends React.Component{
  constructor(props){
        super(props)
        this.state = {
          showModal: false,
          modalItem: null,
              items: this.daoQuery()
        };
    }
/**
 * Handlers
 */
//Modal
  handleShowModal(id){
    if(!typeof id === 'number'){//编辑时由函数调用，传入id;新增时则由浏览器调用，传入event
      id == null
    }
    this.setState({
      showModal: true,
      modalItem: this.state.items.filter(item => item.id===id)[0]||{}
    })
  }

  handleHideModal(){
    this.setState({
      showModal: false,
      modalItem: null
    })
  }

  handleUpdateModal(item){
    this.setState({
      modalItem: item
    })
  }

  handleSaveModal(item){
    log(item.id)
    let items = this.state.items.slice()
    if(item.id){
      //update
      //TODO if this.daoUpdate
      for (var i in items) {
        if (items[i].id == item.id) {
          items[i] = item
          break
        }
      }
    }else{
      //add
      //TODO if this.daoAdd
      items.push(item)
    }

    this.setState({items})
    this.handleHideModal()
  }
//deleleItem
  handleDelItem(event){

  }

/**
 * CRUD Uitl Functions
 */
//Add
daoAdd(item){
  return true
}
//Delete
daoDel(id){
  return true
}
//Update
daoUpdate(item){
  return true
}
//Query
daoQuery(){
  return [
          {id:"1000", title:"烹羊", detail: "烹羊宰牛且为乐", priority: 0,dealt: false},
          {id:"1001", title:"会须", detail: "会须一饮三百杯", priority: 1,dealt: true},
          {id:"1002", title:"岑夫子", detail: "岑夫子，丹丘生，将进酒，君莫停",priority: 2, dealt: false},
          {id:"1003", title:"五花马", detail: "五花马，千金裘，呼儿将出换美酒",priority: 3, dealt: false},
         ]
}
render(){
  let items = this.state.items.map(function(item){
              let opts = {},detail=item.detail
              if(item.dealt){
                opts['disabled'] = 'disabled'
                detail = <s>{item.detail}</s>
              }else{
                opts['bsStyle'] = GLOBAL_CONST.PRIORITY_STYLE_MAPPING[item.priority]
              }
              return (<ListGroupItem header={item.title} {...opts}>{detail}
                        <OperateTools item={item}
                          handleShowModal={e => this.handleShowModal(e)}/>
                      </ListGroupItem>)
            },this)
  return (
      <Grid>
        <Row className="show-grid">
          <Col sm={12} md={6} mdOffset={3}>
              <h1 className="text-center">TODOList</h1>
              <ListGroup >
                {items}
              </ListGroup>
              <Button bsStyle="success pull-right" onClick={e => this.handleShowModal(e)}>&nbsp;&nbsp;Add&nbsp;&nbsp;</Button>
          </Col>
          </Row>
          <Row className="show-grid">
            <Col sm={12} md={6} mdOffset={3}>
                <EditModal showModal= {this.state.showModal}
                                item= {this.state.modalItem||{}}
                     handleUpdateModal= {e => this.handleUpdateModal(e)}
                     handleHideModal= {e => this.handleHideModal(e)}
                     handleSaveModal= {e => this.handleSaveModal(e)}
                />
          </Col>
          </Row>
        </Grid>
   )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)

