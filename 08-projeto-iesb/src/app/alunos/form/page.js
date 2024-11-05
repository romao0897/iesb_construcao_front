'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useState } from 'react'

export default function AlunoFormPage(props) {

  const router = useRouter()

  // Recupera faculdades e cursos do localStorage
  const faculdades = JSON.parse(localStorage.getItem('faculdades')) || []
  const [cursosFiltrados, setCursosFiltrados] = useState([])
  const cursos = JSON.parse(localStorage.getItem('cursos')) || []
  const alunos = JSON.parse(localStorage.getItem('alunos')) || []

  // Recupera o id para edição (se houver)
  const id = props.searchParams?.id
  const alunoEditado = alunos.find(item => item.id === id)

  // Filtra os cursos quando uma faculdade é selecionada
  function handleFaculdadeChange(event) {
    const faculdadeSelecionada = event.target.value
    setCursosFiltrados(cursos.filter(curso => curso.faculdade === faculdadeSelecionada))
  }

  // Função para salvar os dados do form
  function salvar(dados) {
    if (alunoEditado) {
      Object.assign(alunoEditado, dados)
      localStorage.setItem('alunos', JSON.stringify(alunos))
    } else {
      dados.id = v4()
      alunos.push(dados)
      localStorage.setItem('alunos', JSON.stringify(alunos))
    }

    alert("Aluno cadastrado com sucesso!")
    router.push("/alunos")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    faculdade: '',
    curso: '',
    periodo: '',
    matricula: '',
    foto: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    sobrenome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    faculdade: Yup.string().required("Campo obrigatório"),
    curso: Yup.string().required("Campo obrigatório"),
    periodo: Yup.string().required("Campo obrigatório"),
    matricula: Yup.string().required("Campo obrigatório"),
    foto: Yup.string().url("URL da foto inválida").required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Aluno"}>
      <Formik
        initialValues={alunoEditado || initialValues}
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
                <Form.Label>Sobrenome:</Form.Label>
                <Form.Control
                  name='sobrenome'
                  type='text'
                  value={values.sobrenome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.sobrenome && !errors.sobrenome}
                  isInvalid={touched.sobrenome && errors.sobrenome}
                />
                <Form.Control.Feedback type='invalid'>{errors.sobrenome}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Outros campos: Email, Data de Nascimento, Telefone */}
            <Row className='mb-2'>
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

              <Form.Group as={Col}>
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control
                  name='dataNascimento'
                  type='date'
                  value={values.dataNascimento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataNascimento && !errors.dataNascimento}
                  isInvalid={touched.dataNascimento && errors.dataNascimento}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Telefone e Matrícula */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  name='telefone'
                  type='text'
                  mask={"(99)99999-9999"}
                  placeholder='(99)99999-9999'
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Matrícula:</Form.Label>
                <Form.Control
                  name='matricula'
                  type='text'
                  value={values.matricula}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.matricula && !errors.matricula}
                  isInvalid={touched.matricula && errors.matricula}
                />
                <Form.Control.Feedback type='invalid'>{errors.matricula}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Faculdade e Curso */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Faculdade:</Form.Label>
                <Form.Select
                  name='faculdade'
                  value={values.faculdade}
                  onChange={(event) => {
                    handleChange(event)
                    handleFaculdadeChange(event)
                  }}
                  onBlur={handleBlur}
                  isValid={touched.faculdade && !errors.faculdade}
                  isInvalid={touched.faculdade && errors.faculdade}
                >
                  <option value=''>Selecione</option>
                  {faculdades.map(faculdade => <option key={faculdade.nome} value={faculdade.nome}>{faculdade.nome}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.faculdade}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Curso:</Form.Label>
                <Form.Select
                  name='curso'
                  value={values.curso}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.curso && !errors.curso}
                  isInvalid={touched.curso && errors.curso}
                >
                  <option value=''>Selecione</option>
                  {cursosFiltrados.map(curso => <option key={curso.nome} value={curso.nome}>{curso.nome}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.curso}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Foto */}
            <Form.Group className='mb-2'>
              <Form.Label>Foto (URL):</Form.Label>
              <Form.Control
                name='foto'
                type='text'
                value={values.foto}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.foto && !errors.foto}
                isInvalid={touched.foto && errors.foto}
              />
              <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
              {values.foto && !errors.foto && (
                <img src={values.foto} alt="Foto do aluno" style={{ maxWidth: '200px', marginTop: '10px' }} />
              )}
            </Form.Group>

            {/* Botões */}
            <Form.Group className='text-end'>
              <Button className='me-2' href='/alunos'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>
          
          </Form>
          )
        }
      }

      </Formik>
    </Pagina>
  )
}