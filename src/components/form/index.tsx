import { Button, FormControl, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useModalStore } from "../../store/modal";
import { useUserStore } from '../../store/user';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
    id: z.preprocess((val) => Number(val), z.number()),
    type: z.string().optional(),
    firstName: z.string().min(3, 'Nome é obrigatório'),
    lastName: z.string().min(3, 'Sobrenome é obrigatório'),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const Form = () => {
    const { modalType, idUser, firstName, lastName, toggleModal, clearForm } = useModalStore();
    const { editUser, addUser } = useUserStore();
    const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    });


    const EditUserForm = (id: string, firstName: string, lastName: string) => {
        editUser(id, firstName, lastName);
        toggleModal();
        clearForm();
        clearErrors();
    };


    const AddUserForm = (firstName: string, lastName: string) => {
        addUser(firstName, lastName);
        toggleModal();
        clearForm();
        clearErrors();
    };


    const onSubmit = (data: FormSchemaType) => {
        if (data.type === 'Edit') {
            EditUserForm(data.id, data.firstName, data.lastName);
        } else {
            AddUserForm(data.firstName, data.lastName);
        }
        
    };

    useEffect(() => {
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('id', idUser);
        setValue('type', modalType);
    }, [firstName, lastName, idUser, modalType, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('id')} />
            <input type="hidden" {...register('type')} />

            <FormControl sx={{ width: '100%', marginBottom: '15px' }}>
                <TextField
                    variant="outlined"
                    label="Nome"
                    {...register('firstName')}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    slotProps={{
                        htmlInput: {
                            "data-testid": "FirstName",
                        },
                    }}
                />
            </FormControl>

            <FormControl sx={{ width: '100%', marginBottom: '15px' }}>
                <TextField
                    variant="outlined"
                    label="Sobrenome"
                    {...register('lastName')}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    slotProps={{
                        htmlInput: {
                            "data-testid": "LastName",
                        },
                    }}
                />
            </FormControl>

            <Button type="submit" variant="contained" color="primary">Enviar</Button>
        </form>
    );
};

export default Form;
