export default class OperateTools extends React.Component {
    render() {
        let ulStyle = {
          listStyle : "none",
           position : "absolute",
                top : "12px",
              right : "12px"
        },
        liStyle = {
          marginLeft : "12px"
        }

        return (
              <ul style = {ulStyle}>
                <li style = {liStyle} className="glyphicon glyphicon-ok"/>
                <li style = {liStyle} className="glyphicon glyphicon-repeat"/>
                <li style = {liStyle} className="glyphicon glyphicon-pencil"/>
                <li style = {liStyle} className="glyphicon glyphicon-trash"/>
              </ul>
        );
    }
}


