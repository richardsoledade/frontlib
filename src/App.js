import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Modal,
  Nav,
  Navbar,
  Table,
} from "react-bootstrap";
import api from "./service/api";
import moment from "moment";

function App() {
  //state Livro e cliente / Ids
  const [livros, setLivros] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState();
  const [livroId, setLivroId] = useState();

  // state show Modal cadastro
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Cadastro via modal
  async function cadastrarAluguel() {
    console.log({ clienteId: clienteId, livroId: livroId });
    await api
      .post("/aluguel", {
        clienteId: parseInt(clienteId),
        livroId: parseInt(livroId),
      })
      .then((response) => {
        getAluguels();
      });
    setShow(false);
  }
  // state alguel
  const [aluguels, setAlguels] = useState([]);

  async function getAluguels() {
    await api
      .get("/aluguel")
      .then((response) => {
        setAlguels(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  }

  //effect listagem
  useEffect(() => {
    getAluguels();
    getClientes();
    getLivros();
  }, []);

  // const [aluguelId, setAluguelId] = useState("")

  async function excluirAluguel() {
    await api
      .delete(`/aluguel/:id`)
      .then(() => {
        getAluguels();
        alert("aluguel excluido");
      })
      .catch((e) => {
        alert("falha na exclusao");
      });
  }

  // puxar cliente listagem
  async function getClientes() {
    await api.get("/cliente").then((response) => {
      setClientes(response.data);
    });
  }

  // puxar livro pra listagem
  async function getLivros() {
    await api.get("/livros").then((response) => {
      setLivros(response.data);
    });
  }

  return (
    <div className="container">
      <hr />

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

        <DropdownButton id="dropdown-basic-button" title="Livro" size="sm">
          <Form.Select
            onChange={(e) => {
              setLivroId(e.target.value);
            }}
            value={livroId}
            aria-label="Default select example"
          >
            {livros.map((l) => {
              return <option value={l.id}>{l.nome}</option>;
            })}
          </Form.Select>
        </DropdownButton>

        <Button variant="primary gap-2" size="sm" onClick={cadastrarAluguel}>
          Cadastrar aluguel
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Livro</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Retorno</th>
            <th>Diária</th>
            <th>Valor Final</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {aluguels.map((a) => {
            return (
              <tr>
                <td>{a.Livro.nome}</td>
                <td>{a.Cliente.nome}</td>
                <td>{moment(a.data).format("DD/MM/YYYY")}</td>
                <td>
                  {a.dataDevolucao &&
                    moment(a.dataDevolucao).format("DD/MM/YYYY")}
                </td>
                <td>R$ {a.Livro.valorDiaria}</td>
                <td>R$ {a.valorArrecadado}</td>
                <td>
                  
                  <Button size="sm" onClick={() => excluirAluguel(a.aluguel.id)}>
                    x
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

          <Form.Select
            onChange={(e) => {
              setLivroId(e.target.value);
            }}
            value={livroId}
            aria-label="Default select example"
          >
            {livros.map((l) => {
              return <option value={l.id}>{l.nome}</option>;
            })}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={cadastrarAluguel}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
