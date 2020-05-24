## Cadastrando Usuários

#### enviar POST para '/user'
  {
    'name': 'string com nome completo'
    'type': 'Física' ou 'Jurídica'
    'document': 'string com cpf ou cnpj' // ainda não possui validação
    'class': 'Cliente' ou 'Fornecedor'
    'email': 'email válido'
    'password': 'string com a senha' // ainda não possui validação
    'phone': 'telefone deve ser único'
    'birthday': 'YYYY/MM/DD',
    'address': {
      'street': 'Logradouro',
      'district': 'Bairro',
      'number': numero,
      'state': 'Estado',
      'city': 'Cidade',
      'cep': 'CEP',
      'latitude': 'latitude',
      'longitude': 'longitude'
    }
  }

## Cadastrando Produtos

### deve cadastrar unidade de venda, tipo de produtos, categoria e subcategoria antes.

#### categoria - POST para "/prod-category"
  {
    "name": "Nome da categoria",
    "user_id": id do usuario responsável,
  }

#### subcategoria - POST para "/prod-subcategory"
  {
    "name": "Nome da categoria",
    "user_id": id do usuario responsável,
    "category_id": id da categoria a qual essa subcategoria pertence,
  }

#### unidade de venda - POST para "/prod-unity"
  {
    "name": "Nome" // exemplo: UN, - KG - M
    "description": "Descrição" // exemplo: Unidade, Quilos, Metros
  }

#### tipo de produto - POST para "/prod-type"
  {
    "name": "Nome" // exemplo: Produto p/ Revenda, Matéria Prima, etc
  }

#### produtos - POST para "/product"
  {
    "name": "Nome do produtos",
    "prod_category_id": id da categoria,
    "prod_subcategory_id": id da subcategoria,
    "description": "descrição",
    "unity_sale_id": id da unidade de venda,
    "sale_value": valor de venda, // exemplo: 4.5, 10.98
    "img": "url da imagem",
    "type": id do tipo de produto,
    "weight": peso,
    "status_availability": 'Disponível' ou 'Indisponível',
    "user_id": id do usuário responsável
  }


## Adicionando produto ao carrinho de compras
##### é obrigatório estar devidamente autenticado

### deve cadastrar tipo de venda e status de venda antes do usuário realizar pedidos

#### enviar POST para '/sale-type'

  {
    "name": 'Online' ou 'Presencial' // geralmente será online
  }

#### enviar POST para '/sale-status'

  {
    "name": 'Pendente', 'Cancelada' ou 'Finalizada' // cadastrar os três status básicos
  }

#### enviar POST para '/sale-item' para adicionar ao carrinho
##### sempre deve adicionar itens no carrinho e só depois finalizar a compra

  {
    "product_id": id do produto a ser adicionado,
    "product_qtd": quantidade,
    "total": valor total (aplicando possíveis descontos),
    "subtotal": valor original do produto,
    "sale_type_id": id do tipo de venda, // online, presencial (verificar o id antes)
    "user_id": id do usuário que fornece o produto para compra,
    "comment": "algum comentário sobre a compra"
  }

#### enviar PUT para '/sale' para finalizar compra

  {
    "total": 50, // valor total da compra
    "sale_status_id": id do status de finalizada
  }

#### enviar PUT para '/sale' para marcar como "entregue"

  {
    "sale_status_id": id do status de entregue
  }

### Para visualizar os produtos de um vendedor
#### enviar GET para "/user/id" passando o id do usuário no final da url, assim: /user/1

### Para visualizar os próprios dados pessoais
#### enviar GET para "/my-profille"
