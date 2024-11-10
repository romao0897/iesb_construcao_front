'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useEffect } from 'react'

export default function FuncionarioFormPage(props) {
  const router = useRouter()
  const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || []

  const id = props.searchParams.id
  const funcionarioEditado = funcionarios.find(item => item.id == id)

  function salvar(dados) {
    if (funcionarioEditado) {
      Object.assign(funcionarioEditado, dados)
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    } else {
      dados.id = v4()
      funcionarios.push(dados)
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    }
    alert("Funcionário salvo com sucesso!")
    router.push("/Funcionarios")
  }

  const initialValues = {
    nome: '',
    sexo: '',
    cargo: '',
    salario: '',
    departamento: '',
    dataContratacao: '',
    telefone: '',
    email: ''
  }

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    sexo: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo obrigatório"),
    salario: Yup.number().required("Campo obrigatório").positive("Salário deve ser positivo"),
    departamento: Yup.string().required("Campo obrigatório"),
    dataContratacao: Yup.date().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório").matches(/^\d+$/, "Telefone inválido"),
    email: Yup.string().required("Campo obrigatório").email("Email inválido")
  })

  return (
    <Pagina titulo={"Cadastro de Funcionário"}>
      <Formik
        initialValues={funcionarioEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control
                    name='nome'
                    type='text'
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nome && !errors.nome}
                    isInvalid={touched.nome && errors.nome}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Sexo:</Form.Label>
                  <Form.Select
                    name='sexo'
                    value={values.sexo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.sexo && !errors.sexo}
                    isInvalid={touched.sexo && errors.sexo}
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.sexo}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Cargo:</Form.Label>
                  <Form.Control
                    name='cargo'
                    type='text'
                    value={values.cargo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cargo && !errors.cargo}
                    isInvalid={touched.cargo && errors.cargo}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.cargo}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Salário:</Form.Label>
                  <Form.Control
                    name='salario'
                    type='number'
                    value={values.salario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.salario && !errors.salario}
                    isInvalid={touched.salario && errors.salario}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.salario}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Departamento:</Form.Label>
                  <Form.Control
                    name='departamento'
                    type='text'
                    value={values.departamento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.departamento && !errors.departamento}
                    isInvalid={touched.departamento && errors.departamento}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.departamento}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Data de Contratação:</Form.Label>
                  <Form.Control
                    name='dataContratacao'
                    type='date'
                    value={values.dataContratacao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataContratacao && !errors.dataContratacao}
                    isInvalid={touched.dataContratacao && errors.dataContratacao}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.dataContratacao}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Telefone:</Form.Label>
                  <Form.Control
                    name='telefone'
                    type='text'
                    value={values.telefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.telefone && !errors.telefone}
                    isInvalid={touched.telefone && errors.telefone}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className='text-end'>
                <Button className='me-2' href='/Funcionarios'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>
    </Pagina>
  )
}
