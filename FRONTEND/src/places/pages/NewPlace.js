import React from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import "./placeForm.css";
import Button from "../../shared/components/FormElements/Button";

import { useForm } from "../../shared/hooks/form-hook";


const NewPlace = () => {
  const [formState , inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid : false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid : false
      }
    }, false  
  );
  

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
   
    <form className="place-form" onSubmit = {placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid text"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid descriptions (at least 5 characters)"
        onInput={inputHandler}
      />  
        <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={inputHandler}
      />
     
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE 
        </Button> 
    </form>
  );
};

export default NewPlace;
