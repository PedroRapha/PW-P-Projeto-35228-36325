require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { skip } = require("@prisma/client/runtime/client");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.ingredientsInTheRecipe.deleteMany();
    await prisma.recipe.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.ingrCategory.deleteMany();
    await prisma.recipeCategory.deleteMany();
    await prisma.difficulty.deleteMany();
    await prisma.measure.deleteMany();


    const difficulties = await prisma.difficulty.createMany({
        data: [
            { name: 'fácil'},
            { name: 'médio'},
            { name: 'difícil'}
        ],
        skipDuplicates: true,
    });

    const measures = await prisma.measure.createMany({
        data: [
            { name: 'grama(s)', abbreviation: 'g.'},
            { name: 'quilo(s)', abbreviation: 'kg.'},
            { name: 'mililitro(s)', abbreviation: 'ml.'},
            { name: 'litro(s)', abbreviation: 'l.'},
            { name: 'unidade', abbreviation: 'un.'},
            { name: 'colher de chá', abbreviation: 'col.chá'},
            { name: 'colher de sopa', abbreviation: 'col.sopa'},
            { name: 'chávena', abbreviation: 'cháv.'},
            { name: 'pitada', abbreviation: 'pit.'},
            { name: 'dente', abbreviation: 'dnt.'},
            { name: 'fatia', abbreviation: 'ft.'},
            { name: 'lata', abbreviation: 'lat.'},
            { name: 'pacote', abbreviation: 'pct.'},
            { name: 'copo', abbreviation: 'cp.'},
            { name: 'ramo', abbreviation: 'rm.'},
            { name: 'folha', abbreviation: 'flh.'},
            { name: 'quanto baste', abbreviation: 'q.b.'}
        ],
        skipDuplicates: true,
    });

    const ingrCategories = await prisma.ingrCategory.createManyAndReturn({
        data: [
            { name: 'legumes e verduras' },
            { name: 'frutas' },
            { name: 'leguminosas' },
            { name: 'grãos e cereais' },
            { name: 'farinhas e massas' },
            { name: 'carnes' },
            { name: 'peixes e frutos do mar' },
            { name: 'ovos' },
            { name: 'laticínios' },
            { name: 'temperos e especiarias' },
            { name: 'ervas aromáticas' },
            { name: 'molhos e condimentos' },
            { name: 'óleos e gorduras' },
            { name: 'açúcares e doces' },
            { name: 'bebidas' },
            { name: 'frutos secos e sementes' },
            { name: 'produtos processados' },
            { name: 'outros' }
        ]
    });

    //esta lógica precisa mudar se a gente decidir parar de deletar os dados antes de adicionar tudo de novo
    const ingrCategoriesMap = Object.fromEntries(
        ingrCategories.map((category) => [category.name, category.id])
    );

    const ingredientes = await prisma.ingredient.createMany({
        data: [
            {
                name: 'cebola',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'alho',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'tomate',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'cenoura',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'batata',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'batata-doce',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'abobrinha',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'berinjela',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'pimentão',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'alface',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'espinafre',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'brócolis',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'couve-flor',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'pepino',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'cogumelo',
                categoryId: ingrCategoriesMap['legumes e verduras']
            },

            {
                name: 'banana',
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'maçã',
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'laranja',
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'limão',
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'morango',
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'uva',
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'abacate',
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'manga',
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'ananás',
                categoryId: ingrCategoriesMap['frutas']
            },

            {
                name: 'feijão preto',
                categoryId: ingrCategoriesMap['leguminosas']
            },
            {
                name: 'feijão branco',
                categoryId: ingrCategoriesMap['leguminosas']
            },
            {
                name: 'lentilha',
                categoryId: ingrCategoriesMap['leguminosas']
            },
            {
                name: 'grão-de-bico',
                categoryId: ingrCategoriesMap['leguminosas']
            },
            {
                name: 'ervilha',
                categoryId: ingrCategoriesMap['leguminosas']
            },

            {
                name: 'arroz',
                categoryId: ingrCategoriesMap['grãos e cereais']
            },
            {
                name: 'aveia',
                categoryId: ingrCategoriesMap['grãos e cereais']
            },
            {
                name: 'quinoa',
                categoryId: ingrCategoriesMap['grãos e cereais']
            },
            {
                name: 'milho',
                categoryId: ingrCategoriesMap['grãos e cereais']
            },

            {
                name: 'farinha de trigo',
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'farinha de milho',
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'macarrão',
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'espaguete',
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'massa folhada',
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'pão ralado',
                categoryId: ingrCategoriesMap['farinhas e massas']
            },

            {
                name: 'frango',
                categoryId: ingrCategoriesMap['carnes']
            },
            {
                name: 'carne bovina',
                categoryId: ingrCategoriesMap['carnes']
            },
            {
                name: 'carne suína',
                categoryId: ingrCategoriesMap['carnes']
            },
            {
                name: 'bacon',
                categoryId: ingrCategoriesMap['carnes']
            },
            {
                name: 'presunto',
                categoryId: ingrCategoriesMap['carnes']
            },

            {
                name: 'atum',
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },
            {
                name: 'salmão',
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },
            {
                name: 'bacalhau',
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },
            {
                name: 'camarão',
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },
            {
                name: 'mexilhão',
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },

            {
                name: 'ovo',
                categoryId: ingrCategoriesMap['ovos']
            },

            {
                name: 'leite',
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'manteiga',
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'queijo parmesão',
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'queijo muçarela',
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'creme de leite',
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'iogurte',
                categoryId: ingrCategoriesMap['laticínios']
            },

            {
                name: 'sal',
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'pimenta-do-reino',
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'paprica',
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'cominho',
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'canela',
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'noz-moscada',
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },

            {
                name: 'salsa',
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },
            {
                name: 'coentro',
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },
            {
                name: 'manjericão',
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },
            {
                name: 'orégano',
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },
            {
                name: 'alecrim',
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },

            {
                name: 'ketchup',
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },
            {
                name: 'mostarda',
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },
            {
                name: 'maionese',
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },
            {
                name: 'molho de tomate',
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },
            {
                name: 'molho shoyu',
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },

            {
                name: 'azeite',
                categoryId: ingrCategoriesMap['óleos e gorduras']
            },
            {
                name: 'óleo vegetal',
                categoryId: ingrCategoriesMap['óleos e gorduras']
            },
            {
                name: 'óleo de coco',
                categoryId: ingrCategoriesMap['óleos e gorduras']
            },

            {
                name: 'açúcar',
                categoryId: ingrCategoriesMap['açúcares e doces']
            },
            {
                name: 'mel',
                categoryId: ingrCategoriesMap['açúcares e doces']
            },
            {
                name: 'chocolate',
                categoryId: ingrCategoriesMap['açúcares e doces']
            },
            {
                name: 'cacau em pó',
                categoryId: ingrCategoriesMap['açúcares e doces']
            },

            {
                name: 'água',
                categoryId: ingrCategoriesMap['bebidas']
            },
            {
                name: 'vinho branco',
                categoryId: ingrCategoriesMap['bebidas']
            },
            {
                name: 'vinho tinto',
                categoryId: ingrCategoriesMap['bebidas']
            },
            {
                name: 'café',
                categoryId: ingrCategoriesMap['bebidas']
            },

            {
                name: 'amêndoa',
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },
            {
                name: 'noz',
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },
            {
                name: 'castanha',
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },
            {
                name: 'chia',
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },
            {
                name: 'linhaça',
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },

            {
                name: 'salsicha',
                categoryId: ingrCategoriesMap['produtos processados']
            },
            {
                name: 'caldo de galinha',
                categoryId: ingrCategoriesMap['produtos processados']
            },
            {
                name: 'atum enlatado',
                categoryId: ingrCategoriesMap['produtos processados']
            },

            {
                name: 'gelatina',
                categoryId: ingrCategoriesMap['outros']
            }
        ],
        skipDuplicates: true,
    });

    const recipeCategories = await prisma.recipeCategory.createMany({
        data: [
            { name: 'entradas' },
            { name: 'saladas' },
            { name: 'sopas' },
            { name: 'pratos principais' },
            { name: 'massas' },
            { name: 'arroz e risotos' },
            { name: 'carnes' },
            { name: 'peixes e frutos do mar' },
            { name: 'vegetarianas' },
            { name: 'veganas' },
            { name: 'acompanhamentos' },
            { name: 'molhos' },
            { name: 'lanches e sanduíches' },
            { name: 'pequeno-almoço' },
            { name: 'sobremesas' },
            { name: 'bolos e tortas' },
            { name: 'pães e massas' },
            { name: 'bebidas' },
            { name: 'cocktails' },
            { name: 'outros' }
        ],
        skipDuplicates: true,
    });
}