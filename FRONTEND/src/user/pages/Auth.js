import React, {useState, useContext} from "react";


import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
    const[isLoginMode , setIsLoginMode] = useState(true);
    
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if(!isLoginMode) {
        setFormData({
            ...formState.inputs,
            name:undefined
        }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    }
    else {
        setFormData({
            ...formState.inputs,
            name: {
                value: '',
                isValid: false
            }
        },false); 
    }
    setIsLoginMode(prevMode => !prevMode)
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if(isLoginMode) {
    } else {
      try {
        const response = await fetch('http://localhost/5000/api/users/signup',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            name : formState.inputs.name.value,
            email : formState.inputs.email.value,
            password : formState.inputs.password.value
          })
      });

      const responseData = response.json();
      console.log(responseData);

      } catch(err) {
        console.log(err);
      }
     
    }

    


    auth.login()
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}> 
      {!isLoginMode && (
        <Input 
        element='input'
        id="name"
        label="Your Name"
        type="text"
        validators = {[VALIDATOR_REQUIRE]}
        errorText = "Please enter a name"
        onInput = {inputHandler}
        />
      )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please Enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="password" 
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter a valid password, atleast 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'Log In': 'Sign Up'}
        </Button>
      </form>
      <Button inverse onClick = {switchModeHandler}>Switch to {isLoginMode ? 'Sign Up' : 'Log In'} </Button>
    </Card>
  );
};

export default Auth;
