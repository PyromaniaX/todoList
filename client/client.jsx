import React from "react"
import ReactDOM from "react-dom"
import {Grid,Row,Col,ListGroup,Checkbox,ListGroupItem} from 'react-bootstrap';
import OperateTools from "./components/operateTools.jsx"
import EditModal from "./components/editModal.jsx"

var log = console.log.bind(this)

var App = React.createClass({
  render: function () {
    return ( <Well>
        </Well>
    )
  }
})

var App = ( 
  <Grid>
    <Row className="show-grid">
      <Col sm={12} md={6} mdOffset={3}>
          <h1 className="text-center">TODOList</h1>
          <ListGroup >
            <ListGroupItem header="Heading 1" bsStyle="success"> Some body text</ListGroupItem>
            <ListGroupItem header="Heading 2" bsStyle="info">Linked item
              <OperateTools/>
              </ListGroupItem>
            <ListGroupItem header="Heading 3" bsStyle="warning">Danger styling</ListGroupItem>
            <ListGroupItem header="Heading 4" bsStyle="danger" >Danger styling</ListGroupItem>
            <ListGroupItem header="Heading 5" disabled>Danger styling</ListGroupItem>
          </ListGroup>
          <EditModal/>
    </Col>
    </Row>
  </Grid>
    )

ReactDOM.render(
  App,
  document.getElementById('app')
)

