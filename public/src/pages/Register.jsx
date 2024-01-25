import React from "react";
import styled from "styled-components";
function Register() {
    const handleSubmit =(event)=>{
        event.preventDefault();
        alert("form");
    };
  return  <>
  <FormContainer>
<form onSubmit={(event)=>handleSubmit(event)}></form>
    </FormContainer> </>;
  
}
const FormContainer = styled.div``;  
export default Register;
