import { useState } from "react";
import StepItem from "./StepItem";
import './StepEditor.css';

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

    function handleAddStepKeyDown(e){
        if (e.key !== "Enter") {
            return;
        }

        e.preventDefault();
        handleAddStep();
    }

    return (
        <section>
            <h3>Preparação</h3>
            <div className="resultMessage"></div>

            <div className="stepsList">
                {steps.map((thisStep, index) => (
                    <StepItem
                        key={index}
                        index={index}
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
                    onKeyDown={handleAddStepKeyDown}
                    placeholder="Descreve o próximo passo"
                />
            </div>

            <button
                type="button"
                className="stepButton"
                onClick={handleAddStep}
            >
                Adicionar passo
            </button>
        </section>
    )
}