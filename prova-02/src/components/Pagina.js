'use client'

import { Container, Nav, Navbar } from "react-bootstrap"
import { FaHome, FaUserFriends, FaBoxOpen, FaTruck, FaUserTie, FaClipboardList } from 'react-icons/fa'

export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar expand="lg" style={{ backgroundColor: "#1c1c1e", padding: "0.8rem 1rem" }} variant="dark">
        <Container>
          <Navbar.Brand href="/" className="text-warning d-flex align-items-center">
            <FaHome className="me-2" size={24} /> Material de Construção
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/Clientes" className="mx-3 text-light d-flex align-items-center">
                <FaUserFriends className="me-1" /> Clientes
              </Nav.Link>
              <Nav.Link href="/Produtos" className="mx-3 text-light d-flex align-items-center">
                <FaBoxOpen className="me-1" /> Produtos
              </Nav.Link>
              <Nav.Link href="/Fornecedores" className="mx-3 text-light d-flex align-items-center">
                <FaTruck className="me-1" /> Fornecedores
              </Nav.Link>
              <Nav.Link href="/Funcionarios" className="mx-3 text-light d-flex align-items-center">
                <FaUserTie className="me-1" /> Funcionários
              </Nav.Link>
              <Nav.Link href="/" className="mx-3 text-light d-flex align-items-center">
                <FaClipboardList className="me-1" /> Pedidos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Barra de Título */}
      <div className="bg-warning text-center text-dark py-3">
        <h1 className="mb-0">{titulo}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className="mt-4">
        {children}
      </Container>
    </>
  )
}
