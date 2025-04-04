const missionDay = [
    {
        tarefa: 'repetições', 
        img: 'https://media2.giphy.com/media/akAkj2L5pgA5a/giphy.gif?cid=6c09b9520h3i4mnh59j9yt8elprnchv0sc1xkljsosn8yy78&ep=v1_gifs_search&rid=giphy.gif&ct=g',
        qtd: 15, plus: 5, 
        xp: 13, pontos: 10, 
        for: 1.5, def: 1.3, vel: 0, int: 0, con: 0, log: 0, pow: 0, hax: 0.00001,
        gloria: 'Glorificar a Deus com a nossa saúde. "Nosso corpo é templo do Espirito Santo".',
        ok: 'n'
    },
    {
        tarefa: 'm Corrida', 
        img: 'https://giffiles.alphacoders.com/170/170190.gif',
        qtd: 0, plus: 150,
        xp: 16, pontos: 15, 
        for: 0.8, def: 0.5, vel: 1, int: 0.3, con: 0, log: 0, pow: 0, hax: 0.00001,
        gloria: 'Glorificar a Deus com a nossa saúde. "Nosso corpo é templo do Espirito Santo".',
        ok: 'n'
    },
    {
        tarefa: 'pag. Livro', 
        img: 'https://leitorcabuloso.com.br/wp-content/uploads/2016/01/anime-gif-orange-takano-ichigo-Favim.com-4621608.gif',
        qtd: 0, plus: 1,
        xp: 8, pontos: 10, 
        for: 0, def: 0, vel: 0, int: 1, con: 0, log: 1, pow: 0, hax: 0.00001,
        gloria: 'Deus quer filhos que tenham conhecimento e estejam atentos.',
        ok: 'n'
    },
    {
        tarefa: 'cap. biblia', 
        img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQxzxpblgxf3dbBZREzh8Lgax4QXKF2_CycKBFs5In7YFURmREsWL8F7LumI-hsnKzybsV_UJQSrfSS8ZW-Ax3Z6PR1pAfytL3hQClj_2SXEzx-K3b0QlsYgeZSLac3IPy12Vr1V1fCiY/s1600/back-to-reading.gif',
        qtd: 0, plus: 0.5,
        xp: 12, pontos: 8, 
        for: 0, def: 0, vel: 0, int: 1.5, con: 0, log: 0, pow: 1, hax: 0.00001,
        gloria: 'Deus quer que tenhamos conhecimento de quem Ele é. "Meu povo perece por falta de conhecimento", "E conhecereis a verdade e ela vos libertará", "Santifica-os na verdade, a tua palavra é a verdade".',
        ok: 'n'
    },
    {
        tarefa: 'min oração',
        img: 'https://cdn.pixabay.com/animation/2024/01/20/20/53/20-53-36-668_512.gif',
        qtd: 1, plus: 2, 
        xp: 8, pontos: 5, 
        for: 0, def: 0, vel: 0, int: 0, con: 0, log: 0, pow: 2, hax: 0.00001,
        gloria: 'Deus quer relacionamento com seus filhos. "Orai sem cessar", "Vigiai e orai".',
        ok: 'n'
    },
    {
        tarefa: "min devocional", 
        img: 'https://i.pinimg.com/originals/da/53/5b/da535bd1985ef824e21a502b7c52edaa.gif',
        qtd: 8, plus: 2,
        xp: 12, pontos: 2, 
        for: 0, def: 0, vel: 0, int: 1, con: 0, log: 0.2, pow: 6, hax: 0.0001,
        gloria: 'Deus quer filhos inteligentes.',
        ok: 'n'
    },
    {
        tarefa: 'min de estudo', 
        img: 'https://media.tenor.com/_h_1fcwEkHYAAAAM/studying-windy.gif',
        qtd: 6, plus: 4,
        xp: 18, pontos: 16, 
        for: 0, def: 0, vel: 0, int: 4, con: 0, log: 0, pow: 0, hax: 0.00001,
        gloria: 'Deus quer filhos inteligentes.',
        ok: 'n'
    },
    {
        tarefa: 'h sem dopamina', 
        img: 'https://media.tenor.com/uNUAC_3wLlAAAAAM/brk.gif',
        qtd: 0.87, plus: 0.13,
        xp: 8, pontos: 12, 
        for: 0, def: 0, vel: 0, int: 0.2, con: 4, log: 0, pow: 0.5, hax: 0.00001,
        gloria: 'Deus quer filhos inteligentes.',
        ok: 'n'
    },
    {
        tarefa: "l d'agua", 
        img: 'https://i.pinimg.com/originals/6e/a4/58/6ea4583b98eeb2cb969c168f888fe297.gif',
        qtd: 1, plus: .1,
        xp: 6, pontos: 5, 
        for: 0, def: 1, vel: 0, int: 0, con: 0, log: 0.5, pow: 0, hax: 0,
        gloria: 'Deus quer filhos inteligentes.',
        ok: 'n'
    },
    {
        tarefa: "h Dormir", 
        img: 'https://giffiles.alphacoders.com/142/142468.gif',
        qtd: 25.3, plus: -0.3,
        xp: 12, pontos: 8, 
        for: 1, def: 1, vel: 0, int: 1, con: 0, log: 0.5, pow: 0, hax: 0.0001,
        gloria: 'Deus quer filhos inteligentes.',
        ok: 'n'
    },
    {
        tarefa: "h Acordar", 
        img: 'https://media1.giphy.com/media/3o7aCQtmuE6a5VybLi/giphy.gif?cid=6c09b952klomz3if53chagsn5nlr8en21od4iaz5xeay71bp&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g',
        qtd: 11.5, plus: -0.5,
        xp: 3, pontos: 2, 
        for: 1, def: 1, vel: 0, int: 1, con: 0, log: 0.5, pow: 0, hax: 0.0001,
        gloria: 'Deus quer filhos inteligentes.',
        ok: 'n'
    },
]

export default missionDay;