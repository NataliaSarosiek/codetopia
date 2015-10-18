var React = require('React');
var $ = require('../js/jquery.min.js');
var _ = require('lodash');
var Alert = require('react-bootstrap').Alert;
var Panel = require('react-bootstrap').Panel;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Image = require('react-bootstrap').Image;
var Label = require('react-bootstrap').Label;
var Input = require('react-bootstrap').Input;
var Modal = require('react-bootstrap').Modal;






var styles = {

  image: {
    width: 40,
    height: 40,
  },

  dimmed: {
    opacity: 0.5,
  },

  checkbox: {
    display: "inline",
  },

  panelRight: {
    textAlign: "right",
    lineHeight: "40px",
    verticalAlign: "middle",
  },

  panelRightier: {
    textAlign: "right",
    verticalAlign: "middle",
  },

  name: {
    marginLeft: 15,
  },

};


var App = React.createClass({

  getInitialState: function(){
    return {items : {}, showModal: false,};
  },

  close() {
    this.setState({ showModal: false });
  },

  componentDidMount: function(){
      var self = this;
      $.ajax({
        method: "GET",
        url: "/programmers",
        contentType: "json",
        success: function(data){
          self.setState({items:data.results});
        },
      });
  },

  handleChange: function(event){
    var name = event.target.value;

    var newState = _.clone(this.state);
    newState.items[name].arrived = !newState.items[name].arrived;
    this.setState(newState);

    this.askBoss(this.state.items);

  },

  askBoss: function(items){

    var allowance = true;

    _.map(items, function(item, index){

      !item.arrived ? allowance = false : null;

    });

    allowance ? this.throwParty() : null;

  },

  throwParty: function(){
    this.setState({ showModal: true });
  },

  changeLabel: function(rsvp){
    if (rsvp == "yes") return "primary";
    if (rsvp == "no") return "danger";
    if (rsvp == "maybe") return "default";
  },


  renderPeople: function(){

      var self = this;
      var image = "";
      var name = "";
      var rsvp = "";
      var arrived = false;

      var label = "";

        return _.map( this.state.items, function(item, index){

            image = item.image;
            name = item.name;
            rsvp = item.rsvp;
            arrived = item.arrived;

            label = self.changeLabel(rsvp);

            return (
            <Panel style={arrived ? styles.dimmed : null }>
              <Grid>
                <Row>
                  <Col md={3}>
                    <Image src={image} alt={name} style={styles.image} circle/>
                    <span style={styles.name}>{name}</span>
                  </Col>
                  <Col md={1} mdOffset={6} style={styles.panelRight}>
                    <Label bsStyle={label}>RSVP: {rsvp}</Label>
                  </Col>
                  <Col md={1} style={styles.panelRightier}>
                    <Input type="checkbox" label="Arrived" onChange={self.handleChange} value={index} style={styles.checkbox}/>
                  </Col>
                </Row>
              </Grid>
            </Panel>
          );
        });

    },

   render: function(){

     return (
       <div>
         <div>
           <Modal show={this.state.showModal} onHide={this.close}>
           <Modal.Body>
              <strong>Time to party!</strong>
           </Modal.Body>
           </Modal>
         </div>

         <div>
            {this.renderPeople()}
         </div>
       </div>

     );
   }
 });
module.exports = App;

React.render(
  <App/>,
  document.getElementById('app')
);
