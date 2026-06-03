export default function IngredientItem({ qnt, measure, ingredient }) {

    return (
        <li>
            <p>{ qnt } { measure } - { ingredient }</p>
        </li>
    )
}