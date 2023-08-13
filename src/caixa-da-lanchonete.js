class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        this.cardapio = [
            {
                codigo: "cafe",
                descricao: "Café",
                valor: 3.00
            },
            {
                codigo: "chantily",
                descricao: "Chantily (extra do Café)",
                valor: 1.50
            },
            {
                codigo: "suco",
                descricao: "Suco Natural",
                valor: 6.20
            },
            {
                codigo: "sanduiche",
                descricao: "Sanduiche",
                valor: 6.50
            },
            {
                codigo: "queijo",
                descricao: "Queijo (extra do Sanduíche)",
                valor: 2.00
            },
            {
                codigo: "salgado",
                descricao: "Salgado",
                valor: 7.25
            },
            {
                codigo: "combo1",
                descricao: "1 Suco e 1 Sanduiche",
                valor: 9.50
            },
            {
                codigo: "combo2",
                descricao: "1 Café e 1 Sanduiche",
                valor: 7.50
            },
        ]

        let total = 0;

        if (metodoDePagamento !== 'debito' && metodoDePagamento !== 'credito' && metodoDePagamento !== 'dinheiro') {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        // verifação das informações de cada item no cardápio
        for (const itemInfo of itens) {
            const [itemCodigo, quantidade] = itemInfo.split(',');
            const item = this.cardapio.find((menuItem) => menuItem.codigo === itemCodigo)

            if (!item) {
                return 'Item inválido!';
            }
            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            // condições dos extras
            if (itemCodigo === 'chantily' && !itens.some(it => it.includes('cafe'))) {
                return 'Item extra não pode ser pedido sem o principal';
            }
            if (itemCodigo === 'queijo' && !itens.some(it => it.includes('sanduiche'))) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            total += item.valor * quantidade;

        }

        // descontos e acrescimos
        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;

    }
}

export { CaixaDaLanchonete };
