import React from "react"
import ReactDOM from "react-dom"
import {Grid,Row,Col,ListGroup,Checkbox,ListGroupItem,ButtonGroup,Button} from 'react-bootstrap';
import OperateTools from "./components/operateTools.jsx"
import EditModal from "./components/editModal.jsx"

var log = console.log.bind(this)

const GLOBAL_CONST = {
  PRIORITY_STYLE_MAPPING:["success","info","warning","danger"],
  DEFAULT_PRIORITY:1//新增时默认优先级
}

export default class App extends React.Component{
  constructor(props){
        super(props)
        this.state = {
          showModal: false,
          modalItem: null,
              items: []
        };
        this.daoQuery()
    }
/**
 * Handlers
 */
//Modal
  handleShowModal(event,id){
    this.setState({
      showModal: true,
      modalItem: this.state.items.filter(item => item.id===id)[0]||
                 {priority: GLOBAL_CONST.DEFAULT_PRIORITY,dealt: false}//若为新增则为默认优先级，未处理
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

  handleSaveModal(){
    let item = this.state.modalItem
    if(!item.title||!item.detail){
      //TODO msgTiptop
      alert("not null")
      return 
    }
    if(item.id){
      this.daoUpdate(item)
    }else{
      this.daoAdd(item)
    }
  }
//deleleItem
  handleDelItem(event,id){
    this.daoDel(id)
  }
  handleDealtItem(event,id){
    //TODO this.daoUpdate
    let items = this.state.items.slice(),item = null
    for (var i in items) {
        if (items[i].id == id) {
          item = items[i]
          item.dealt = !item.dealt
          items[i] = item
          break
        }
      }
    this.daoUpdate(item)
  }

/**
 * CRUD Uitl Functions
 */
//Add
daoAdd(item){
  const callback = function(data){
    if(!data.success)return
    let items = this.state.items.slice()
    item.id = data.id
    items.push(item)
    log(item)
    this.setState({items})
    this.handleHideModal()
  }.bind(this)
  fetch("todoList",
       {method : "POST",
       headers : {"Content-Type":"application/json"},
          body : JSON.stringify(item)
       })
    .then(response => response.json())
    .then(callback)
    .catch(e => console.log("Error!",e))
}
//Delete
daoDel(id){
  const callback = function(data){
    if(!data.success)return
    let items = this.state.items.filter(item => item.id!=id)
    this.setState({items})
  }.bind(this)
  fetch("todoList/"+id,
       {method : "DELETE"})
    .then(response => response.json())
                   .then(callback)
                   .catch(e => console.log("Error!",e))
}
//Update
daoUpdate(item){
  const callback = function(data){
    if(!data.success)return
    let items = this.state.items.slice()
    for (var i in items) {
      if (items[i].id == item.id) {
        items[i] = item
        break
      }
    }
    log(item)
    this.setState({items})
    this.handleHideModal()
  }.bind(this)
  fetch("todoList/"+item.id,
       {method : "PUT",
       headers : {"Content-Type":"application/json"},
          body : JSON.stringify(item)
       })
    .then(response => response.json())
    .then(callback)
    .catch(e => console.log("Error!",e))
}
//Query
daoQuery(){
  const callback = function(data){
    if(!data.success)return
    this.setState({items:data.items})
  }.bind(this)
  fetch("todoList").then(response => response.json())
                   .then(callback)
                   .catch(e => console.log("Error!",e))
}
render(){
  let items = this.state.items.sort((m,n) => //以完成情况、优先级、id加权排序
                                    100*(m.dealt-n.dealt)-10*(m.priority-n.priority)-(m.id-n.id))
                              .map(function(item){
                                    let opts = {},detail=item.detail
                                    if(item.dealt){
                                      opts['disabled'] = 'disabled'
                                      detail = <s>{item.detail}</s>
                                    }else{
                                      opts['bsStyle'] = GLOBAL_CONST.PRIORITY_STYLE_MAPPING[item.priority]
                                    }
                                    return (<ListGroupItem header={item.title} {...opts}>{detail}
                                              <OperateTools item = {item}
                                                  handleDelItem = {e => this.handleDelItem(e,item.id)} 
                                                handleDealtItem = {e => this.handleDealtItem(e,item.id)} 
                                                handleShowModal = {e => this.handleShowModal(e,item.id)}
                                              />
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

