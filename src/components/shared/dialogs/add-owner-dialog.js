import {Button, Dialog, DialogContent, Stack, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import React from "react";

const AddOwnerDialog = ({open, handleClose, handleOwnerAdd}) => {

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: yup.object({}).shape({
            address: yup.string().required('Address required')
        }),
        onSubmit: async (values, formikHelpers) => {
            handleOwnerAdd(values.address)
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
                    <Stack direction="column" spacing={3}>
                        <Typography variant="body2" sx={{color: 'text.primary'}}>
                            Enter admin address
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth={true}
                            size="small"
                            placeholder="Owner address"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            required={true}
                            label="Owner address"
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
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddOwnerDialog;
