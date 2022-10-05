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

    //recuperar todas as despesas no local storage
    for (let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i))
      if (despesa === null) {
        continue
      }
      despesas.push(despesa)
    }

    return despesas
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

    document.getElementById('modalTitulo').innerHTML = 'Registrado com sucesso'
    document.getElementById('modalTituloDiv').className =
      'modal-header text-success'
    document.getElementById('modalConteudo').innerHTML =
      'Despesa foi cadastrada com sucesso!'
    document.getElementById('modalBtn').innerHTML = 'Voltar'
    document.getElementById('modalBtn').className = 'btn btn-success'

    $('#modalRegistraDespesa').modal('show')
  } else {
    document.getElementById('modalTitulo').innerHTML =
      'Erro na inclusão do registro'
    document.getElementById('modalTituloDiv').className =
      'modal-header text-danger'
    document.getElementById('modalConteudo').innerHTML =
      'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
    document.getElementById('modalBtn').innerHTML = 'Voltar e corrigir'
    document.getElementById('modalBtn').className = 'btn btn-danger'
    $('#modalRegistraDespesa').modal('show')
  }
}

function carregaListaDespesas() {
  let despesas = Array()
  despesas = bd.recuperarTodosRegistros()

  let listaDespesas = document.getElementById('listaDespesas')

  despesas.forEach(function (d) {
    console.log(d)
    let linha = listaDespesas.insertRow()
    linha.incertCell(0).innerHTML = d.dia
    linha.incertCell(1)
    linha.incertCell(2)
    linha.incertCell(3)
  })
}
