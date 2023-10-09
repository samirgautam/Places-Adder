import React from "react";

import Input from "../../shared/components/FormElements/Input";
import './Newplace.css';

const NewPlace = () => {
    return <form className="place-form">
        <Input type = "text" label = "Title" element = "element" />
    </form>;
};

export default NewPlace;