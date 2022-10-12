class Despesa {
  constructor(ano, mes, dia, tipo, desc, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.desc = desc
    this.valor = valor
  }

  validarDados() {
    for (let i in this) {
      if (this[i] === undefined || this[i] === '' || this[i] === null) {
        return false
      }
    }
    return true
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem('id')

    if (id === null) {
      localStorage.setItem('id', 0)
    }
  }

  getProximoId() {
    let proxId = localStorage.getItem('id')
    return parseInt(proxId) + 1
  }

  gravar(d) {
    let id = this.getProximoId()
    localStorage.setItem(id, JSON.stringify(d))
    localStorage.setItem('id', id)
  }

  recuperarTodosRegistros() {
    let despesas = Array()
    let id = localStorage.getItem('id')
    // recuperar as despesas cadastradas
    for (let i = 1; i <= id; i++) {
      // recuperar a despesa
      let despesa = JSON.parse(localStorage.getItem(i))

      if (despesa === null) {
        continue
      }
      despesas.push(despesa)
    }
    return despesas
  }

  pesquisar(despesa) {
    let despesasFiltradas = Array()
    despesasFiltradas = this.recuperarTodosRegistros()

    if (despesa.ano != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
    }
    if (despesa.mes != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
    }
    if (despesa.dia != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
    }
    if (despesa.tipo != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
    }
    if (despesa.desc != '') {
      console.log('desp')
      console.log(despesasFiltradas.filter(d => d.desc == despesa.desc))
    }
    // if (despesa.valor != '') {
    //   despesasFiltradas = despesasFiltradas.filter(
    //     d => d.valor == despesa.valor
    //   )
    // }
    console.log(despesasFiltradas)
  }
}

let bd = new Bd() // Classe Bd armazena os dados da lista em um local storage

function cadastrarDespesa() {
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let desc = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    desc.value,
    valor.value
  )

  if (despesa.validarDados()) {
    bd.gravar(despesa)
    estiloSuccess()
    $('#modalRegistraDespesa').modal('show')
    limparCampos()
  } else {
    estiloError()
    $('#modalRegistraDespesa').modal('show')
  }
}

function estiloSuccess() {
  document.getElementById('modalTitulo').innerHTML = 'Registrado com sucesso'
  document.getElementById('modalTituloDiv').className =
    'modal-header text-success'
  document.getElementById('modalConteudo').innerHTML =
    'Despesa foi cadastrada com sucesso!'
  document.getElementById('modalBtn').innerHTML = 'Voltar'
  document.getElementById('modalBtn').className = 'btn btn-success'
}

function estiloError() {
  document.getElementById('modalTitulo').innerHTML =
    'Erro na inclusão do registro'
  document.getElementById('modalTituloDiv').className =
    'modal-header text-danger'
  document.getElementById('modalConteudo').innerHTML =
    'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
  document.getElementById('modalBtn').innerHTML = 'Voltar e corrigir'
  document.getElementById('modalBtn').className = 'btn btn-danger'
}

function limparCampos() {
  let v = ['ano', 'mes', 'dia', 'tipo', 'descricao', 'valor']
  for (i in v) {
    document.getElementById(v[i]).value = ''
  }
}

function carregaListaDespesas() {
  let despesas = Array()
  despesas = bd.recuperarTodosRegistros()

  //selecionando o elemento tbody da tabela
  let listaDespesas = document.getElementById('listaDespesas')
  despesas.forEach(function (d) {
    //criar linhas e colunas
    let linha = listaDespesas.insertRow()

    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

    switch (d.tipo) {
      case '1':
        d.tipo = 'Alimentação'
        break
      case '2':
        d.tipo = 'Educação'
        break
      case '3':
        d.tipo = 'Lazer'
        break
      case '4':
        d.tipo = 'Saúde'
        break
      case '5':
        d.tipo = 'Transporte'
        break
    }

    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.desc
    linha.insertCell(3).innerHTML = d.valor
  })
}

function pesquisarDespesa() {
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let desc = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value

  let despesa = new Despesa(ano, mes, dia, tipo, desc, valor)

  bd.pesquisar(despesa)
}
