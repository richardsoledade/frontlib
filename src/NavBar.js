import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="http://localhost:3000/aluguel#home">Library Database</Navbar.Brand>

            <Nav.Link
              href="https://www.jcavitreinamentos.com.br/cursos-programacao?gclid=CjwKCAiAuOieBhAIEiwAgjCvcg6MskGzZYf_f2mICk5EakZcf0JCTIwDR0TKgmORpzFu5EcJFQbh6hoC2JgQAvD_BwE"
              target="_blank"
            >
              JCAVI
            </Nav.Link>
            <Nav.Link href="https://github.com/richardsoledade" target="_blank">
              GitHub
            </Nav.Link>
            <Nav.Link
              href="https://www.behance.net/richardsoledade"
              target="_blank"
            >
              Behance
            </Nav.Link>
      


        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            
            <NavDropdown title="Cadastrar" id="basic-nav-dropdown">
              <NavDropdown.Item href="livro">Livro</NavDropdown.Item>
              <NavDropdown.Item href="cliente">Cliente</NavDropdown.Item>
              <NavDropdown.Item href="aluguel">Aluguel</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="hst">Histórico</Nav.Link>
            <Nav.Link href="faturamento">Faturamentos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;