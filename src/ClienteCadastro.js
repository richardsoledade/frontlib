import { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import api from "./service/api";

function ClienteCadastro() {
  const [clienteNome, setClienteNome] = useState([]);
  const [cpf, setCpf] = useState([]);

  async function cadastrarCliente() {
    await api
      .post("/cliente", {
        nome: clienteNome,
        cpf: cpf,
      })
      .then((response) => {
        getClientes();
      });
  }
  // effect listagem
  useEffect(() => {
    getClientes();
  }, []);
     
  const [clientes, setClientes] = useState([]);

  // puxar livro pra listagem
  async function getClientes() {
    await api
    .get("/cliente")
    .then((response) => {
      setClientes(response.data);
    })
    .catch((e) => {
      alert(e);
    });
  }


  return (
    <div className="container">
      <h1>Cadastrar Cliente</h1>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Nome</InputGroup.Text>
        <Form.Control
          placeholder="Inserir nome do cliente"
          aria-label="nome "
          onChange={(e) => {
            setClienteNome(e.target.value);
          }}
          value={clienteNome}
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>CPF</InputGroup.Text>
        <Form.Control
          aria-label="Amount (to the nearest dollar)"
          placeholder="Inserir CPF"
          onChange={(e) => {
            setCpf(e.target.value);
          }}
          value={cpf}
          type="number"
        />
      </InputGroup>

      <Button variant="primary" onClick={cadastrarCliente}>
            Cadastrar
          </Button>

      {/* ============ LIVRO TABLE ==================== */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>N° CPF </th>
            <th> id reg</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((a) => {
            return (
              <tr>
                <td>{a.nome}</td>
                <td>{a.cpf}</td>
                <td>{a.id}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ClienteCadastro;
