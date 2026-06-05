import { useState } from "react";
import StepItem from "./StepItem"

export default function StepEditor({
        onAddStep,
        steps,
        onRemoveStep,
        onMoveStepUp,
        onMoveStepDown,
    }){
    const [step, setStep] = useState("");

    function handleAddStep(){
        if(!step.trim()) {
            return;
        }

        onAddStep({
            description: step.trim(),
        });

        setStep("");
    }

    return (
        <section>
            <h3>Preparação</h3>

            <div className="stepsList">
                {steps.map((thisStep, index) => (
                    <StepItem
                        key={index}
                        description={thisStep.description}
                        editable={true}
                        onMoveUp={() => onMoveStepUp(index)}
                        onMoveDown={() => onMoveStepDown(index)}
                        onRemove={() => onRemoveStep(index)}
                    />
                ))}
            </div>

            <div className="recipeInput">
                <label htmlFor="stepDescription">Passo: </label>
                <input
                    type="text"
                    id="stepDescription"
                    value={step}
                    onChange={(e) => setStep(e.target.value)}
                    placeholder="Descreve o próximo passo"
                />
            </div>

            <button type="recipeButton" onClick={handleAddStep}>
                Adicionar passo
            </button>
        </section>
    )
}