export default categoryUtil = {
    CATEGORIES: [
        {
            name: 'ScienceAndTechnology',
            icon: 'md-flask'
        },
        {
            name: 'Business',
            icon: 'md-cash'
        },
        {
            name: 'Entertainment',
            icon: 'md-chatbubbles'
        },
        {
            name: 'Sports',
            icon: 'md-football'
        },
        {
            name: 'Politics',
            icon: 'md-ribbon'
        },
        {
            name: 'World',
            icon: 'md-globe'
        },
        {
            name: 'Brazil',
            icon: 'md-flag'
        }
    ],

    translate(name) {
        const categories = {
            'ScienceAndTechnology': 'Ciência e Tecnologia',
            'Business': 'Negócios',
            'Entertainment': 'Entretenimento',
            'Sports': 'Esportes',
            'Politics': 'Política',
            'World': 'Mundo',
            'Brazil': 'Brasil'
        }
        return categories[name] || name
    }
}