export default class OperateTools extends React.Component {
  handleShowModal(){
        this.props.handleShowModal(this.props.item.id)
    }

  render() {
      return (
            <ul className = "operateTools">
              <li className={"glyphicon "+(this.props.item.dealt?"glyphicon-repeat":"glyphicon-ok")}/>
              <li className="glyphicon glyphicon-pencil" onClick={e => this.handleShowModal(e)}/>
              <li className="glyphicon glyphicon-trash"/>
            </ul>
      );
  }
}


