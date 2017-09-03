export default class OperateTools extends React.Component {
  render() {
    let item = this.props.item,
        btnEdit = {
          style:{}
        },
        btnComplete = {
          className:"glyphicon-ok"
        }
    if(item.dealt){
      btnEdit.style = {"visibility":"hidden"}
      btnComplete.className = "glyphicon-repeat"
    }
    return (
          <ul className = "operateTools">
            <li className = "glyphicon glyphicon-pencil" 
                    style = {btnEdit.style} 
                  onClick = {this.props.handleShowModal}/>
            <li className = {"glyphicon "+btnComplete.className}
                  onClick = {this.props.handleDealtItem}/>
            <li className = "glyphicon glyphicon-trash"
                  onClick = {this.props.handleDelItem}/>
          </ul>
    );
  }
}


