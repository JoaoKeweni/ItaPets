document.addEventListener('DOMContentLoaded', () => {
    // 1. Filtro de Busca em Tempo Real
    const inputBusca = document.querySelector('input[type="search"]');
    const produtos = document.querySelectorAll('article');

    if (inputBusca) {
        inputBusca.addEventListener('input', () => {
            const termo = inputBusca.value.toLowerCase();
            produtos.forEach(produto => {
                const titulo = produto.querySelector('h3').innerText.toLowerCase();
                if (titulo.includes(termo)) {
                    produto.style.display = 'block';
                } else {
                    produto.style.display = 'none';
                }
            });
        });
    }

    // 2. Contador de Carrinho Dinâmico
    const botoesAdicionar = document.querySelectorAll('article button');
    // Tenta encontrar o contador tanto no header principal quanto na estrutura do contato
    const contador = document.querySelector('header a[title="Ver carrinho de compras"] span, .contador-carrinho');

    if (contador) {
        let contagem = parseInt(contador.innerText) || 0;

        botoesAdicionar.forEach(botao => {
            botao.addEventListener('click', () => {
                contagem++;
                contador.innerText = contagem;

                // Feedback visual temporário no botão
                const textoOriginal = botao.innerText;
                botao.innerText = "Adicionado! ✓";
                botao.style.backgroundColor = "#4CAF50";
                botao.style.color = "white";

                setTimeout(() => {
                    botao.innerText = textoOriginal;
                    botao.style.backgroundColor = "";
                    botao.style.color = "";
                }, 1000);
            });
        });
    }

    // 3. Botão "Voltar ao Topo"
    const btnTopo = document.createElement('button');
    btnTopo.innerHTML = '⬆';
    btnTopo.id = 'btn-voltar-topo';
    // Estilos inline para garantir funcionamento imediato, mas idealmente iria para o CSS
    btnTopo.style.cssText = `
        position: fixed; 
        bottom: 20px; 
        right: 20px; 
        display: none; 
        padding: 15px; 
        border: none;
        border-radius: 50%;
        background-color: #386affff; /* Cor de destaque do site (exemplo) */
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(45, 45, 45, 0.3);
        z-index: 1000;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(btnTopo);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnTopo.style.display = 'block';
        } else {
            btnTopo.style.display = 'none';
        }
    });

    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Máscara de Telefone (Página de Contato)
    const inputTelefone = document.getElementById('telefone');

    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

            if (valor.length > 11) valor = valor.slice(0, 11);

            if (valor.length > 2) {
                valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
            }

            if (valor.length > 9) {
                valor = `${valor.slice(0, 9)}-${valor.slice(9)}`;
            }

            e.target.value = valor;
        });
    }
});
