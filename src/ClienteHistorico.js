import moment from "moment";
import { useEffect, useState } from "react";
import {
  Button,
  DropdownButton,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import api from "./service/api";

function ClienteHst() {
  const [clienteId, setClienteId] = useState();
  const [aluguels, setAlguels] = useState([]);
  const [clientes, setClientes] = useState([]);
  
  // effect listagem
  useEffect(() => {
    getClientes()
  }, []);

 
  async function getHst() {
    await api
      .get(`/aluguel/hst/${clienteId}`)
      .then((response) => {
        setAlguels(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  }

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
      <h1>Histórico do Cliente</h1>

      <div className="botoes">
        <DropdownButton id="dropdown-basic-button" title="Cliente" size="sm">
          <Form.Select
            onChange={(e) => {
              setClienteId(e.target.value);
            }}
            value={clienteId}
            aria-label="Default select example"
          >
            {clientes.map((c) => {
              return <option value={c.id}>{c.nome}</option>;
            })}
          </Form.Select>
        </DropdownButton>

           <Button variant="primary" size="sm" onClick={getHst}>
            Pesquisar
          </Button>

      </div>

      {/* ============ LIVRO TABLE ==================== */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Livro</th>
            <th>Retirada</th>
            <th>Devolução</th>
           
          </tr>
        </thead>
        <tbody>
          {aluguels.map((a) => {
            return (
              <tr>
                <td>{a.Livro.nome}</td>
                <td>{moment(a.data).format("DD/MM/YYYY")}</td>
                <td>{a.dataDevolucao ? moment(a.dataDevolucao).format("DD/MM/YYYY") : "Pendente"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ClienteHst;
