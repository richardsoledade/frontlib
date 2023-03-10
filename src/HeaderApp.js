import React from "react";
import { InputGroup, Form, Navbar, Nav, Container } from "react-bootstrap";

export const HeaderApp = (props) => {
  return (
    <div>
     
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Clientes"
          value={props.pesquisa}
          onChange={(e) => {
            props.setClientes(e.target.value);
          }}
        />
      </InputGroup>
    </div>
  );
};
