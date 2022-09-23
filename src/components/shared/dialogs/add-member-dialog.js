import {Button, Dialog, DialogContent, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import React from "react";

const AddMemberDialog = ({open, handleClose, handleMemberAdd}) => {

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: yup.object({}).shape({
            address: yup.string().required('Address required')
        }),
        onSubmit: async (values, formikHelpers) => {
            handleMemberAdd(values.address)
            formikHelpers.resetForm();
        },
        initialValues: {
            address: ''
        }
    });


    return (
        <Dialog maxWidth="lg" open={open} onClose={handleClose}>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant="body2" sx={{mb: 2, color: 'text.primary'}}>
                        Enter member address
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth={true}
                        size="small"
                        placeholder="Member address"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        required={true}
                        label="Member address"
                        name="address"
                        error={Boolean(formik.touched.address && formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                    <Button
                        onClick={formik.handleSubmit}
                        disableElevation={true}
                        fullWidth={true}
                        type="submit"
                        color="secondary"
                        variant="contained" size="large"
                        sx={{textTransform: 'none'}}>
                        Add
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddMemberDialog;
