import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
function Case(props) {
  console.log(props.data);
  const handleClick=()=>{
    
  }
  return (
    <div>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.data.case_id}</Card.Title>
        <Card.Text>
          {props.data.caseDescription}
        </Card.Text>
        <Button variant="primary" onClick={handleClick()}>Chat</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Case