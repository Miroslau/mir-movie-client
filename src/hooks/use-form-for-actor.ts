import actorType, {createActor} from "../types/actor-type";
import React, {useCallback, useEffect, useState} from "react";
import moment, {isMoment} from "moment";

const useFormForActor = (
    callback: any,
    validateErrors: any,
    callBackFunction: any,
    actor?: actorType | createActor | null
) => {
    const [actorModel, setActorModel] = useState({
        firstName: "",
        secondName: "",
        Birth: moment(),
        Nationality: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (isMoment(event)) {
            setActorModel(prevState => ({
                ...prevState,
                Birth: event,
            }))
        } else {
            const {name, value} = event.target;
            setActorModel({...actorModel, [name]: value});
        }
    }, [actorModel]);

    const handleClear = () => {
        setActorModel({
            firstName: "",
            secondName: "",
            Birth: moment(),
            Nationality: "",
        });
        callBackFunction();
    };

    const handleSubmit = useCallback(() => {
        setErrors(validateErrors(actorModel));
        setIsSubmitting(true);
    }, [actorModel]);

    const clearError = () => {
        setErrors({});
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                callback(actorModel);
            }
        },
        [errors],
    );

    return {
        handleChange, handleSubmit, actorModel, errors, clearError, handleClear
    };
}

export default useFormForActor;