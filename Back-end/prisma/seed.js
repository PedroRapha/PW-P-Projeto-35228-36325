require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

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
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'alho',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'tomate',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'cenoura',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'batata',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'batata-doce',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'abobrinha',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'berinjela',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'pimentão',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'alface',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'espinafre',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'brócolis',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'couve-flor',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'pepino',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },
            {
                name: 'cogumelo',
                isApproved: true,
                categoryId: ingrCategoriesMap['legumes e verduras']
            },

            {
                name: 'banana',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'maçã',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'laranja',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'limão',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'morango',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'uva',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'abacate',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'manga',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutas']
            },
            {
                name: 'ananás',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutas']
            },

            {
                name: 'feijão preto',
                isApproved: true,
                categoryId: ingrCategoriesMap['leguminosas']
            },
            {
                name: 'feijão branco',
                isApproved: true,
                categoryId: ingrCategoriesMap['leguminosas']
            },
            {
                name: 'lentilha',
                isApproved: true,
                categoryId: ingrCategoriesMap['leguminosas']
            },
            {
                name: 'grão-de-bico',
                isApproved: true,
                categoryId: ingrCategoriesMap['leguminosas']
            },
            {
                name: 'ervilha',
                isApproved: true,
                categoryId: ingrCategoriesMap['leguminosas']
            },

            {
                name: 'arroz',
                isApproved: true,
                categoryId: ingrCategoriesMap['grãos e cereais']
            },
            {
                name: 'aveia',
                isApproved: true,
                categoryId: ingrCategoriesMap['grãos e cereais']
            },
            {
                name: 'quinoa',
                isApproved: true,
                categoryId: ingrCategoriesMap['grãos e cereais']
            },
            {
                name: 'milho',
                isApproved: true,
                categoryId: ingrCategoriesMap['grãos e cereais']
            },

            {
                name: 'farinha de trigo',
                isApproved: true,
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'farinha de milho',
                isApproved: true,
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'macarrão',
                isApproved: true,
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'espaguete',
                isApproved: true,
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'massa folhada',
                isApproved: true,
                categoryId: ingrCategoriesMap['farinhas e massas']
            },
            {
                name: 'pão ralado',
                isApproved: true,
                categoryId: ingrCategoriesMap['farinhas e massas']
            },

            {
                name: 'frango',
                isApproved: true,
                categoryId: ingrCategoriesMap['carnes']
            },
            {
                name: 'carne bovina',
                isApproved: true,
                categoryId: ingrCategoriesMap['carnes']
            },
            {
                name: 'carne suína',
                isApproved: true,
                categoryId: ingrCategoriesMap['carnes']
            },
            {
                name: 'bacon',
                isApproved: true,
                categoryId: ingrCategoriesMap['carnes']
            },
            {
                name: 'presunto',
                isApproved: true,
                categoryId: ingrCategoriesMap['carnes']
            },

            {
                name: 'atum',
                isApproved: true,
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },
            {
                name: 'salmão',
                isApproved: true,
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },
            {
                name: 'bacalhau',
                isApproved: true,
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },
            {
                name: 'camarão',
                isApproved: true,
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },
            {
                name: 'mexilhão',
                isApproved: true,
                categoryId: ingrCategoriesMap['peixes e frutos do mar']
            },

            {
                name: 'ovo de galinha',
                isApproved: true,
                categoryId: ingrCategoriesMap['ovos']
            },

            {
                name: 'leite',
                isApproved: true,
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'manteiga',
                isApproved: true,
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'queijo parmesão',
                isApproved: true,
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'queijo muçarela',
                isApproved: true,
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'creme de leite',
                isApproved: true,
                categoryId: ingrCategoriesMap['laticínios']
            },
            {
                name: 'iogurte',
                isApproved: true,
                categoryId: ingrCategoriesMap['laticínios']
            },

            {
                name: 'sal',
                isApproved: true,
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'pimenta-do-reino',
                isApproved: true,
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'paprica',
                isApproved: true,
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'cominho',
                isApproved: true,
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'canela',
                isApproved: true,
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },
            {
                name: 'noz-moscada',
                isApproved: true,
                categoryId: ingrCategoriesMap['temperos e especiarias']
            },

            {
                name: 'salsa',
                isApproved: true,
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },
            {
                name: 'coentro',
                isApproved: true,
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },
            {
                name: 'manjericão',
                isApproved: true,
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },
            {
                name: 'orégano',
                isApproved: true,
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },
            {
                name: 'alecrim',
                isApproved: true,
                categoryId: ingrCategoriesMap['ervas aromáticas']
            },

            {
                name: 'ketchup',
                isApproved: true,
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },
            {
                name: 'mostarda',
                isApproved: true,
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },
            {
                name: 'maionese',
                isApproved: true,
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },
            {
                name: 'molho de tomate',
                isApproved: true,
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },
            {
                name: 'molho shoyu',
                isApproved: true,
                categoryId: ingrCategoriesMap['molhos e condimentos']
            },

            {
                name: 'azeite',
                isApproved: true,
                categoryId: ingrCategoriesMap['óleos e gorduras']
            },
            {
                name: 'óleo vegetal',
                isApproved: true,
                categoryId: ingrCategoriesMap['óleos e gorduras']
            },
            {
                name: 'óleo de coco',
                isApproved: true,
                categoryId: ingrCategoriesMap['óleos e gorduras']
            },

            {
                name: 'açúcar',
                isApproved: true,
                categoryId: ingrCategoriesMap['açúcares e doces']
            },
            {
                name: 'mel',
                isApproved: true,
                categoryId: ingrCategoriesMap['açúcares e doces']
            },
            {
                name: 'chocolate',
                isApproved: true,
                categoryId: ingrCategoriesMap['açúcares e doces']
            },
            {
                name: 'cacau em pó',
                isApproved: true,
                categoryId: ingrCategoriesMap['açúcares e doces']
            },

            {
                name: 'água',
                isApproved: true,
                categoryId: ingrCategoriesMap['bebidas']
            },
            {
                name: 'vinho branco',
                isApproved: true,
                categoryId: ingrCategoriesMap['bebidas']
            },
            {
                name: 'vinho tinto',
                isApproved: true,
                categoryId: ingrCategoriesMap['bebidas']
            },
            {
                name: 'café',
                isApproved: true,
                categoryId: ingrCategoriesMap['bebidas']
            },

            {
                name: 'amêndoa',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },
            {
                name: 'noz',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },
            {
                name: 'castanha',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },
            {
                name: 'chia',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },
            {
                name: 'linhaça',
                isApproved: true,
                categoryId: ingrCategoriesMap['frutos secos e sementes']
            },

            {
                name: 'salsicha',
                isApproved: true,
                categoryId: ingrCategoriesMap['produtos processados']
            },
            {
                name: 'caldo de galinha',
                isApproved: true,
                categoryId: ingrCategoriesMap['produtos processados']
            },
            {
                isApproved: true,
                name: 'atum enlatado',
                categoryId: ingrCategoriesMap['produtos processados']
            },

            {
                name: 'gelatina',
                isApproved: true,
                categoryId: ingrCategoriesMap['outros']
            }
        ],
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

    console.log("Seed executado com sucesso");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });